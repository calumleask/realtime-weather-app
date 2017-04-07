import Forecast from "~/weather/Forecast";
import ForecastRepository from "~/weather/ForecastRepository";

import locationService from "~/weather/LocationService";
import mapController from "~/map/MapController";
import mapWeather from "~/weather/MapWeather";
import weatherWebRequestService from "~/weather/WeatherWebRequestService";

class WeatherService {

    constructor() {
        this._forecastRepository = new ForecastRepository();
    }

    getCurrentWeather() {
        const latLng = mapController.getCenter();
        weatherWebRequestService.getLocationsAtLatLng(latLng, 10)
        .then(locationArray => {
            if (!locationArray) return;
            locationArray.forEach((location) => {
                locationService.add(location);
                this._forecastRepository.setCurrentWeatherAtLocation(location.id, location.weather);
            });
            mapWeather.updateNearestLocation();
        });
    }

    updateCurrentWeatherTime(time) {
        this._forecastRepository.updateCurrentWeatherAtAllLocations(time);
    }
    
    fetchWeatherAtLocationAndTime(locationId, time, callback) {
        if (time === 0) {
            callback(this._forecastRepository.getCurrentWeatherAtLocation(locationId));
            return;
        }

        if (this._forecastRepository.hasForecastAtLocation(locationId)) {
            callback(this._forecastRepository.getWeatherAtLocationAndTime(locationId, time));
            return;
        }

        this._fetchForecast(locationId, (forecast) => {
            callback(forecast.getWeatherAtTime(time));
        });
    }

    _fetchForecast(locationId, callback) {
        weatherWebRequestService.getForecastForLocationId(locationId)
        .then(weatherArray => {
            if (!weatherArray) return;
            this._forecastRepository.setForecastAtLocationFromArray(locationId, weatherArray);
            callback(this._forecastRepository.get(locationId));
        })
        .catch(error => {
            callback(new Forecast());
        });
    }
}

const weatherService = new WeatherService;
export default weatherService;