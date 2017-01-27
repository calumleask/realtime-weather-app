import { getDescriptionFromWeatherCode, getMapWeatherFromWeatherCode } from "~/weather/WeatherTypes";

export default class Weather {

    constructor(code, data) {
        this._code = code || null;
        data = data || {};
        this._data = {
            temperature: data.temperature || 0,
            maxTemperature: data.maxTemperature || 0,
            minTemperature: data.minTemperature || 0,
            humidity: data.humidity || 0,
            cloudCover: data.cloudCover || 0,
            windSpeed: data.windSpeed || 0
        };
    }

    getCode() {
        return this._code;
    }

    getData() {
        return this._data;
    }

    getDescription() {
        return getDescriptionFromWeatherCode(this._code);
    }

    getMapWeather() {
        return getMapWeatherFromWeatherCode(this._code);
    }
}