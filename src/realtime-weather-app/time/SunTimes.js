import SunCalc from "suncalc";

import timeHelpers from "~/time/helpers/TimeHelpers";

export default class SunTimes {

    constructor(latLng, date, offset) {
        this._latLng = latLng;
        this._date = date;
        this._offset = offset;
        this._sunriseTime = 0;
        this._sunriseString = "00:00";
        this._sunsetTime = 0;
        this._sunsetString = "00:00";
        
        if (offset !== undefined) {
            this._calculateSunTimes();
        }
    }

    getSunrise() {
        return this._sunriseString;
    }

    getSunset() {
        return this._sunsetString;
    }

    getSunriseTime() {
        return this._sunriseTime;
    }

    getSunsetTime() {
        return this._sunsetTime;
    }

    _calculateSunTimes() {
        const noon = new Date(this._date.getFullYear(), this._date.getUTCMonth(), this._date.getUTCDate(), 12, 0, 0, 0, 0);
        const sunTimes = SunCalc.getTimes(noon, this._latLng.lat, this._latLng.lng);
        
        const sunrise = timeHelpers.addOffset(sunTimes.sunrise, this._offset);
        const sunset = timeHelpers.addOffset(sunTimes.sunset, this._offset);
        const sunriseTime = sunrise.getTime();
        const sunsetTime = sunset.getTime();

        this._sunriseTime = sunriseTime;
        this._sunsetTime = sunsetTime;
        this._sunriseString = timeHelpers.getDigitalString(sunrise.getUTCHours(), sunrise.getUTCMinutes());
        this._sunsetString = timeHelpers.getDigitalString(sunset.getUTCHours(), sunset.getUTCMinutes());
    }
}