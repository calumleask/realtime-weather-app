import Weather from "~/weather/Weather";

import mathHelpers from "~/math/helpers/MathHelpers";

const roundTimeToNearestForecastTimeInterval = (time) => {
    const threeHours = 3 * 60 * 60 * 1000;
    return mathHelpers.roundToNearest(time, threeHours);
};

export default class Forecast {

    constructor() {
        this._currentWeather = new Weather();
        this._weather = {};
    }

    hasForecast() {
        return Object.keys(this._weather).length > 0;
    }

    getCurrentWeather() {
        return this._currentWeather;
    }

    setCurrentWeather(weather) {
        this._currentWeather = weather;
    }

    getWeatherAtTime(time) {
        const nearestForecastTime = roundTimeToNearestForecastTimeInterval(time);
        return this._weather[nearestForecastTime] || new Weather();
    }

    setWeatherAtTime(weather, time) {
        const nearestForecastTime = roundTimeToNearestForecastTimeInterval(time);
        this._weather[nearestForecastTime] = weather;
    }
}