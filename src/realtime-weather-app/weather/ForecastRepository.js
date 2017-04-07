import Forecast from "~/weather/Forecast";
import Weather from "~/weather/Weather";

export default class ForecastRepository {

    constructor() {
        this._forecasts = {};
    }

    get(id) {
        return this._forecasts[id] || new Forecast();
    }

    hasForecastAtLocation(locationId) {
        return this._forecasts[locationId] && this._forecasts[locationId].hasForecast();
    }

    getCurrentWeatherAtLocation(locationId) {
        const forecast = this.get(locationId);
        return forecast.getCurrentWeather();
    }

    getWeatherAtLocationAndTime(locationId, time) {
        const forecast = this.get(locationId);
        return time ? forecast.getWeatherAtTime(time) : forecast.getCurrentWeather();
    }

    setCurrentWeatherAtLocation(locationId, weather) {
        if (!this._forecasts[locationId]) {
            this._forecasts[locationId] = new Forecast();
        }
        this._forecasts[locationId].setCurrentWeather(weather);
    }

    setForecastAtLocationFromArray(locationId, weatherArray) {
        if (!this._forecasts[locationId]) {
            this._forecasts[locationId] = new Forecast();
        }
        weatherArray.forEach((weather) => {
            const time = weather.time;
            this._forecasts[locationId].setWeatherAtTime(new Weather(weather.code, {
                temperature: weather.temperature,
                maxTemperature: weather.maxTemperature,
                minTemperature: weather.minTemperature,
                humidity: weather.humidity,
                cloudCover: weather.cloudCover,
                windSpeed: weather.windSpeed
            }), time);
        });
    }

    updateCurrentWeatherAtAllLocations(time) {
        for (let locationId in this._forecasts) {
            const forecast = this._forecasts[locationId];
            const newCurrentWeather = forecast.getWeatherAtTime(time);
            forecast.setCurrentWeather(newCurrentWeather);
        }
    }
}