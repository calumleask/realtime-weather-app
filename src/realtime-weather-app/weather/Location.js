
export default class Location {

    constructor(id, latLng, name) {
        this._id = id;
        this._latLng = latLng;
        this._name = name || "N/A";
    }

    getId() {
        return this._id;
    }

    getLatLng() {
        return this._latLng;
    }

    getName() {
        return this._name;
    }
}