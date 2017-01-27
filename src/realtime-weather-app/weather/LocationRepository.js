
export default class LocationRepository {

    constructor() {
        this._locations = {};
    }

    add(location) {
        const id = location.getId();
        if (this._locations[id]) return;
        this._locations[id] = location;
    }

    exists(id) {
        return this._locations[id] !== undefined;
    }

    get(id) {
        return this._locations[id];
    }

    getAllIds() {
        return Object.keys(this._locations);
    }
}