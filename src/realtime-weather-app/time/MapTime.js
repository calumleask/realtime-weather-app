import SunTimes from "~/time/SunTimes";

import clock from "~/time/Clock";
import localTime from "~/time/LocalTime";
import mapController from "~/map/MapController";
import mapWeather from "~/weather/MapWeather";
import { notifyTimeOfDayChange } from "~/time/actions/TimeActions";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class MapTime {

    constructor() {
        this._observingLocaLtime = true;
        this._observedTime = 0;
        this._shouldUpdateSunTimes = false;
        this._sunTimes = new SunTimes();
        this._timeOfDay = "day";

        this._onSecond = this._onSecond.bind(this);
        this._queueSunTimesUpdate = this._queueSunTimesUpdate.bind(this);
        this._updateSunTimes = this._updateSunTimes.bind(this);
        this._updateTimeOfDay = this._updateTimeOfDay.bind(this);
    }

    initialize() {
        this.observeLocalTime();
        clock.on("second", this._onSecond);
        localTime.on("timezonechange", this._updateSunTimes);
        mapController.registerOnLocationChangeCallback(this._updateSunTimes);
        mapController.registerOnPanCallback(this._queueSunTimesUpdate);
    }

    observeLocalTime() {
        this._observingLocaLtime = true;
        this._observedTime = localTime.getTime();
        localTime.on("day", this._updateSunTimes);
        clock.on("minute", this._updateTimeOfDay);
        this._updateSunTimes();
        this._updateTimeOfDay();
        mapWeather.observeCurrentWeather();
    }

    observeFixedTime(time, readableTime) {
        this._observingLocaLtime = false;
        clock.off("day", this._updateSunTimes);
        clock.off("minute", this._updateTimeOfDay);
        this._observeFixedTime(readableTime);
        this._updateSunTimes();
        this._updateTimeOfDay();
        mapWeather.observeWeatherAtTime(time);
    }

    getDateString() {
        const date = new Date(this._observedTime);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    getDayString() {
        const day = new Date(this._observedTime).getDay();
        return days[day];
    }

    getSunrise() {
        return this._sunTimes.getSunrise();
    }

    getSunset() {
        return this._sunTimes.getSunset();
    }

    _onSecond() {
        // Update observed time
        if (this._observingLocaLtime) {
            this._observedTime = localTime.getTime();
        }

        if (this._shouldUpdateSunTimes) {
            this._updateSunTimes();
            this._shouldUpdateSunTimes = false;
        }
    }

    _queueSunTimesUpdate() {
        this._shouldUpdateSunTimes = true;
    }

    _observeFixedTime(time) {
        if (time === this._observedTime) return;
        this._observedTime = time;
    }

    _updateSunTimes() {
        const latLng = mapController.getCenter();
        const sunrise = this._sunTimes.getSunrise();
        const sunset = this._sunTimes.getSunset();
        this._sunTimes = new SunTimes(latLng, new Date(this._observedTime), localTime.getOffsets().dst);

        if (sunrise === this._sunTimes.getSunrise() && sunset === this._sunTimes.getSunset()) return;
        this._updateTimeOfDay();
    }

    _updateTimeOfDay() {
        const thirtyMins = 30 * 60 * 1000;
        let timeOfDay = "night";
        if (this._observedTime > this._sunTimes.getSunsetTime() + thirtyMins)         timeOfDay = "night";
        else if (this._observedTime >= this._sunTimes.getSunsetTime())                timeOfDay = "dusk";
        else if (this._observedTime >= this._sunTimes.getSunriseTime() + thirtyMins)  timeOfDay = "day";
        else if (this._observedTime >= this._sunTimes.getSunriseTime())               timeOfDay = "dawn";
        if (timeOfDay === this._timeOfDay) return;
        this._timeOfDay = timeOfDay;
        notifyTimeOfDayChange(this._timeOfDay);
    }
}

const mapTime = new MapTime;
export default mapTime;