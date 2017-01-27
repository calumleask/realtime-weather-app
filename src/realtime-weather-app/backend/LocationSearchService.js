import ES6Promise from "es6-promise";
ES6Promise.polyfill();
import fetch from "isomorphic-fetch";

const config = require("~/config.json");

class LocationSearchService {

    constructor() {
        this._apiKey = config.mapzen_api_key;
        this._urlRoot = "https://search.mapzen.com/v1/";
    }

    performAutocomplete(text) {
        const urlString = this._urlRoot + "autocomplete?api_key=" + this._apiKey + "&text=" + text;
        return fetch(urlString);
    }
}

const locationSearchService = new LocationSearchService;
export default locationSearchService;
