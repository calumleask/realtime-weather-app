import ES6Promise from "es6-promise";
ES6Promise.polyfill();
import fetch from "isomorphic-fetch";

const config = require("~/config.json");

class TimeZoneService {

    constructor() {
        this._username = config.geonames_username;
        this._urlRoot = "http://api.geonames.org/";
    }

    getTimeZoneAtLatLng(latLng) {
        const urlString = this._urlRoot + "timezoneJSON?username=" + this._username + "&lat=" + latLng.lat + "&lng=" + latLng.lng;
        return fetch(urlString);
    }
}

const timeZoneService = new TimeZoneService;
export default timeZoneService;
