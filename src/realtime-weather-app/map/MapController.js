import "eegeo.js";

const config = require("~/config.json");

const weathers = {
    "default": L.eeGeo.themes.weather.Clear,
    "clear": L.eeGeo.themes.weather.Clear,
    "overcast": L.eeGeo.themes.weather.Overcast,
    "foggy": L.eeGeo.themes.weather.Foggy,
    "rainy": L.eeGeo.themes.weather.Rainy,
    "snowy": L.eeGeo.themes.weather.Snowy
};

const times = {
    "default": L.eeGeo.themes.time.Day,
    "dawn": L.eeGeo.themes.time.Dawn,
    "day": L.eeGeo.themes.time.Day,
    "dusk": L.eeGeo.themes.time.Dusk,
    "night": L.eeGeo.themes.time.Night
};

const startLatLng = [55.948517, -3.199872];

class MapController {

    constructor() {
        this._map = null;
        this._cameraTransitioner = null;
        this._weatherEnabled = true;
        this._timeOfDayEnabled = true;
        this._onLocationChangeCallback = null;
    }

    initialize() {
        let options = {
            center: startLatLng,
            zoom: 15,
            indoorsEnabled: false,
        };

        this._map = L.eeGeo.map("map", config.eegeo_api_key, options);
        this._map.attributionControl.addAttribution("weather provided by <a href='https://openweathermap.org/' target='_blank'>OpenWeatherMap</a>");
    }

    getCenter() {
        if (!this._map) {
            return L.latLng(startLatLng);
        }
        return this._map.getCenter();
    }

    getCurrentZoomLevel() {
        return this._map.getZoom();
    }

    zoomIn() {
        this._map.zoomIn(1);
    }

    zoomOut() {
        this._map.zoomOut(1);
    }

    goToLocation(latLng) {
        const options = {
            durationSeconds: 1.0,
            allowInterruption: false
        };
        this._map.setView(latLng, 15, options);
    }

    registerOnPanCallback(callback) {
        this._map.on("pan", callback);
    }

    registerOnLocationChangeCallback(callback) {
        this._map.on("transitionend", callback);
    }

    enableWeather() {
        this._weatherEnabled = true;
    }

    disableWeather() {
        this.setWeather("default");
        this._weatherEnabled = false;
    }

    setWeather(weather) {
        if (this._weatherEnabled) {
            weather = weathers[weather] || weathers["default"];
            this._map.themes.setWeather(weather);
        }
    }

    enableTimeOfDay() {
        this._timeOfDayEnabled = true;
    }

    disableTimeOfDay() {
        this.setTimeOfDay("default");
        this._timeOfDayEnabled = false;
    }

    setTimeOfDay(timeOfDay) {
        if (this._timeOfDayEnabled) {
            timeOfDay = times[timeOfDay] || times["default"];
            this._map.themes.setTime(timeOfDay);
        }
    }
}

const mapController = new MapController;
export default mapController;