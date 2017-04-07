import EventEmitter from "~/EventEmitter";

import clock from "~/time/Clock";
import timeHelpers from "~/time/helpers/TimeHelpers";

class LocalTime extends EventEmitter {

    constructor() {
        super();
        
        this._time = 0;
        this._day = 0;
        this._hour = 0;
        this._minute = 0;
        this._second = 0;
        this._utcOffset = 0;
        this._dstOffset = 0;
        this._country = "N/A";

        clock.on("minute", this._updateTime.bind(this));
    }

    getTime() {
        return this._time;
    }

    getDigitalString() {
        return timeHelpers.getDigitalString(this._hour, this._minute, clock.getSecond());
    }

    getOffsets() {
        return {
            utc: this._utcOffset,
            dst: this._dstOffset
        };
    }

    setOffsets(utcOffset, dstOffset) {
        if (utcOffset !== this._utcOffset || dstOffset !== this._dstOffset) {
            this._utcOffset = utcOffset;
            this._dstOffset = dstOffset;
            this._emit("timezonechange", { utc: this._utcOffset, dst: this._dstOffset });
            this._updateTime();
        }
    }

    getCountry() {
        return this._country;
    }

    setCountry(country) {
        this._country = country;
    }

    _updateTime() {
        this._time = clock.getTime() + this._dstOffset * 60 * 60 * 1000;
        const date = new Date(this._time);
        this._hour = date.getUTCHours();
        this._minute = date.getUTCMinutes();
        this._second = date.getUTCSeconds();

        const day = date.getUTCDay();
        if (day !== this._day) {
            this._day = day;
            this._emit("day", { time: this._time, day: this._day });
        }
    }
}

const localTime = new LocalTime;
export default localTime;