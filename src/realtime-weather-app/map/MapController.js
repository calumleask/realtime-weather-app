import "wrld.js";

const config = require("~/config.json");

const weathers = {
    "default": L.Wrld.themes.weather.Clear,
    "clear": L.Wrld.themes.weather.Clear,
    "overcast": L.Wrld.themes.weather.Overcast,
    "foggy": L.Wrld.themes.weather.Foggy,
    "rainy": L.Wrld.themes.weather.Rainy,
    "snowy": L.Wrld.themes.weather.Snowy
};

const times = {
    "default": L.Wrld.themes.time.Day,
    "dawn": L.Wrld.themes.time.Dawn,
    "day": L.Wrld.themes.time.Day,
    "dusk": L.Wrld.themes.time.Dusk,
    "night": L.Wrld.themes.time.Night
};

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
            center: L.latLng(config.start_location_latitude, config.start_location_longitude),
            zoom: config.start_location_zoom,
            headingDegrees: config.start_location_orientation_degrees,
            indoorsEnabled: false,
        };

        this._map = L.Wrld.map("map", config.wrld_api_key, options);
        this._map.attributionControl.addAttribution("weather provided by <a href='https://openweathermap.org/' target='_blank'>OpenWeatherMap</a>");
    }

    getCenter() {
        if (!this._map) {
            return L.latLng(config.start_location_latitude, config.start_location_longitude);
        }
        return this._map.getCenter();
    }

    getCurrentZoomLevel() {
        if (!this._map) {
            return config.start_location_zoom;
        }
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