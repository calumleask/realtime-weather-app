
class TimeHelpers {

    constructor() {
        this._minute = 60000;
        this._hour = 3600000;
    }

    addOffset(time, offset) {
        if (time instanceof Date) {
            return new Date(time.getTime() + (this._hour * offset));
        }
        return time + (this._hour * offset);
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