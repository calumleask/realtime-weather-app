
class TimeHelpers {

    constructor() {
        this._minute = 60000;
        this._hour = 3600000;
    }

    convertTimeToUTC(time, utcOffsetInHours) {
        const utcTime = time.getTime() - (time.getTimezoneOffset() * this._minute);
        return new Date(utcTime + (this._hour * utcOffsetInHours));
    }

    getDigitalString(hours, minutes, seconds) {
        let digitalTimeString = this._ensureFormat(hours) + ":" + this._ensureFormat(minutes);
        if (seconds !== undefined) {
            digitalTimeString += ":" + this._ensureFormat(seconds);
        }
        return digitalTimeString;
    }

    _ensureFormat(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}

const timeHelpers = new TimeHelpers;
export default timeHelpers;