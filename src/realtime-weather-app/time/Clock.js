import EventEmitter from "~/EventEmitter";

class Clock extends EventEmitter {

    constructor() {
        super();

        this._date = new Date();
        this._time = 0;
        this._day = 0;
        this._hour = 0;
        this._minute = 0;
        this._second = 0;
    }

    start() {
        this._tick();
    }

    getTime() {
        return this._time;
    }

    getSecond() {
        return this._second;
    }

    _tick() {
        this._update();
        setTimeout(this._tick.bind(this), 500);
    }

    _update() {
        this._date = new Date();
        this._time = this._date.getTime();

        const second = this._date.getUTCSeconds();
        const notifySecond = second !== this._second;
        this._second = second;
        const minute = this._date.getUTCMinutes();
        const notifyMinute = minute !== this._minute;
        this._minute = minute;
        const hour = this._date.getUTCHours();
        const notifyHour = hour !== this._hour;
        this._hour = hour;
        const day = this._date.getUTCDay();
        const notifyDay = day !== this._day;
        this._day = day;
        
        if (notifySecond) this._emit("second", { date: this._date, time: this._time, second: this._second });
        if (notifyMinute) this._emit("minute", { date: this._date, time: this._time, minute: this._minute });
        if (notifyHour) this._emit("hour", { date: this._date, time: this._time, hour: this._hour });
        if (notifyDay) this._emit("day", { date: this._date, time: this._time, day: this._day });
    }
}

const clock = new Clock;
export default clock;