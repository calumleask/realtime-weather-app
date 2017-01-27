import SunCalc from "suncalc";

const ensureFormat = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

const roundToNearest = (value, toNearest) => {
    const remainder = value % toNearest;
    if (remainder <= (toNearest / 2)) { 
        return value - remainder;
    } else {
        return value + toNearest - remainder;
    }
};

const convertTime = (time, offset) => {
    const minute = 60 * 1000;
    const utcTime = roundToNearest(time.getTime() - (time.getTimezoneOffset() * 60000), minute);
    return new Date(utcTime + (3600000 * offset));
};

export default class SunTimes {

    constructor(latLng, date, utcOffset) {
        this._latLng = latLng;
        this._date = date;
        this._utcOffset = utcOffset;
        this._sunriseTime = 0;
        this._sunriseString = "00:00";
        this._sunsetTime = 0;
        this._sunsetString = "00:00";
        
        if (utcOffset !== undefined) {
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
        const noon = new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate(), 12, 0, 0, 0, 0);
        const sunTimes = SunCalc.getTimes(noon, this._latLng.lat, this._latLng.lng);
        
        const sunrise = convertTime(sunTimes.sunrise, this._utcOffset);
        const sunset = convertTime(sunTimes.sunset, this._utcOffset);
        const sunriseTime = sunrise.getTime();
        const sunsetTime = sunset.getTime();

        this._sunriseTime = sunriseTime;
        this._sunsetTime = sunsetTime;
        this._sunriseString = ensureFormat(sunrise.getHours()) + ":" + ensureFormat(sunrise.getMinutes());
        this._sunsetString = ensureFormat(sunset.getHours()) + ":" + ensureFormat(sunset.getMinutes());
    }
}