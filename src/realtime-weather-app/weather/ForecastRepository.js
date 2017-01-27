import Forecast from "~/weather/Forecast";
import Weather from "~/weather/Weather";

export default class ForecastRepository {

    constructor() {
        this._forecasts = {};
    }

    get(id) {
        return this._forecasts[id] || new Forecast();
    }

    hasForecastAtLocation(id) {
        return this._forecasts[id] && this._forecasts[id].hasForecast();
    }

    getCurrentWeatherAtLocation(locationId) {
        const forecast = this.get(locationId);
        return forecast.getCurrentWeather();
    }

    getWeatherAtLocationAndTime(locationId, time) {
        const forecast = this.get(locationId);
        return time ? forecast.getWeatherAtTime(time) : forecast.getCurrentWeather();
    }

    updateCurrentWeatherAtLocation(id, weather) {
        if (!this._forecasts[id]) {
            this._forecasts[id] = new Forecast();
        }
        this._forecasts[id].setCurrentWeather(weather);
    }

    updateForecastAtLocationFromArray(id, weatherArray) {
        if (!this._forecasts[id]) {
            this._forecasts[id] = new Forecast();
        }
        weatherArray.forEach((weather) => {
            const time = weather.time;
            this._forecasts[id].setWeatherAtTime(new Weather(weather.code, {
                temperature: weather.temperature,
                maxTemperature: weather.maxTemperature,
                minTemperature: weather.minTemperature,
                humidity: weather.humidity,
                cloudCover: weather.cloudCover,
                windSpeed: weather.windSpeed
            }), time);
        });
    }
}