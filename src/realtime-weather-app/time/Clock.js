import EventEmitter from "~/EventEmitter";

import timeHelpers from "~/time/helpers/TimeHelpers";

class Clock extends EventEmitter {

    constructor() {
        super();

        this._date = null;
        this._time = 0;
        this._day = 0;
        this._hour = 0;
        this._minute = 0;
        this._second = 0;
        this._utcOffset = 0;
        this._country = "N/A";
    }

    start() {
        this._tick();
    }

    getTime() {
        return this._time;
    }

    getDigitalString() {
        return timeHelpers.getDigitalString(this._hour, this._minute, this._second);
    }

    getUtcOffset() {
        return this._utcOffset;
    }

    setUtcOffset(utcOffset) {
        if (utcOffset === this._utcOffset) return;
        this._utcOffset = utcOffset;
        this._date = timeHelpers.convertTimeToUTC(new Date(), this._utcOffset);

        const minute = this._date.getMinutes();
        const notifyMinute = minute !== this._minute;
        this._minute = minute;
        const hour = this._date.getHours();
        const notifyHour = hour !== this._hour;
        this._hour = hour;
        const day = this._date.getDay();
        const notifyDay = day !== this._day;
        this._day = day;
        
        if (notifyMinute) this._emit("minute", this._time);
        if (notifyHour) this._emit("hour", this._time);
        if (notifyDay) this._emit("day", this._time);
        if (notifyMinute) this._emit("timezonechange", this._time);
    }

    getCountry() {
        return this._country;
    }

    setCountry(country) {
        this._country = country;
    }

    _tick() {
        this._update();
        setTimeout(this._tick.bind(this), 500);
    }

    _update() {
        this._date = timeHelpers.convertTimeToUTC(new Date(), this._utcOffset);
        this._time = this._date.getTime();

        const second = this._date.getSeconds();
        const notifySecond = second !== this._second;
        this._second = second;
        const minute = this._date.getMinutes();
        const notifyMinute = minute !== this._minute;
        this._minute = minute;
        const hour = this._date.getHours();
        const notifyHour = hour !== this._hour;
        this._hour = hour;
        const day = this._date.getDay();
        const notifyDay = day !== this._day;
        this._day = day;
        
        if (notifySecond) this._emit("second", this._time);
        if (notifyMinute) this._emit("minute", this._time);
        if (notifyHour) this._emit("hour", this._time);
        if (notifyDay) this._emit("day", this._time);
    }
}

const localTime = new Clock;
export default localTime;