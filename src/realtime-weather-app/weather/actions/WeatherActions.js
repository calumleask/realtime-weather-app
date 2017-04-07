import { dispatch } from "~/stores/Store";

import localTime from "~/time/LocalTime";
import locationService from "~/weather/LocationService";
import mapController from "~/map/MapController";

import { UPDATE_ACTIVE_WEATHER } from "~/weather/actions/WeatherActionTypes";

export const notifyActiveWeatherUpdate = (locationId, activeWeather) => {
	const mapWeather = activeWeather.getMapWeather();
	mapController.setWeather(mapWeather);
	dispatch({
		type: UPDATE_ACTIVE_WEATHER,
		payload: {
			activeWeather: {
				country: localTime.getCountry(),
				data: activeWeather.getData(),
				description: activeWeather.getDescription(),
				location: locationService.getName(locationId).toUpperCase(),
				mapWeather: mapWeather
			}
		}
	});
};