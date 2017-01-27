import ES6Promise from "es6-promise";
ES6Promise.polyfill();
import fetch from "isomorphic-fetch";

class LocationSearchService {

    constructor() {
        this._apiKey = "INSERT_MAPZEN_API_KEY_HERE";
        this._urlRoot = "https://search.mapzen.com/v1/";
    }

    performAutocomplete(text) {
        const urlString = this._urlRoot + "autocomplete?api_key=" + this._apiKey + "&text=" + text;
        return fetch(urlString);
    }
}

const locationSearchService = new LocationSearchService;
export default locationSearchService;
