import Weather from "~/weather/Weather";

import locationService from "~/weather/LocationService";
import mapController from "~/map/MapController";
import weatherService from "~/weather/WeatherService";
import { notifyActiveWeatherUpdate } from "~/weather/actions/WeatherActions";

const getDistanceSqrBetweenLatLngs = (a, b) => {
	const latDistSqr = Math.pow((b.lat - a.lat), 2);
	const lngDistSqr = Math.pow((b.lng - a.lng), 2);
	return latDistSqr + lngDistSqr;
};

class MapWeather {

    constructor() {
        this._observedWeather = new Weather();
        this._observedForecastTime = 0;
        this._nearestLocationId = null;
    }

    initialize() {
		mapController.registerOnPanCallback(this.updateNearestLocation.bind(this));
    }
    
    updateNearestLocation() {
        const cameraLatLng = mapController.getCenter();
        let nearestLocationId = this._nearestLocationId;
        let shortestDistanceSqr = null;
        locationService.getAllIds().forEach((id) => {
            const latLng = locationService.getLatLng(id);
            const distanceSqr = getDistanceSqrBetweenLatLngs(cameraLatLng, latLng);
            if (shortestDistanceSqr === null || distanceSqr < shortestDistanceSqr) {
                shortestDistanceSqr = distanceSqr;
                nearestLocationId = id;
            }
        });

        const prevNearestLocationId = this._nearestLocationId;
        if (nearestLocationId === prevNearestLocationId) return;
        this._nearestLocationId = nearestLocationId;
        this._updateObservedWeather();
    }
    
    observeCurrentWeather() {
        this._observedForecastTime = 0;
        this._updateObservedWeather();
    }
    
    observeWeatherAtTime(time) {
        this._observedForecastTime = time;
        this._updateObservedWeather();
    }

    getWeather() {
        return this._observedWeather;
    }
    
    getNearestLocationId() {
        return this._nearestLocationId;
    }

    _updateObservedWeather() {
        weatherService.fetchWeatherAtLocationAndTime(this._nearestLocationId, this._observedForecastTime, (weather) => {
            if (weather === this._observedWeather) return;
            this._observedWeather = weather;
            notifyActiveWeatherUpdate(this._nearestLocationId, this._observedWeather);
        });
    }
}

const mapWeather = new MapWeather;
export default mapWeather;