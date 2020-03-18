
export default class EventEmitter {

    constructor() {
        this._events = {};
    }

    on(event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        for (let i = 0; i < this._events[event].length; ++i) {
            if (this._events[event][i] === callback) return;
        }
        this._events[event].push(callback);
    }

    off(event, callback) {
        if (!this._events[event]) return;
        for (let i = this._events[event].length; i >= 0; --i) {
            if (this._events[event][i] === callback) {
                this._events[event].splice(i, 1);
                return;
            }
        }
    }

    _emit(event, object) {
        if (!this._events[event]) return;
        this._events[event].forEach((callback) => {
            callback(object);
        });
    }
}