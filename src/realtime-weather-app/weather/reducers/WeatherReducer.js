import { UPDATE_ACTIVE_WEATHER } from "~/weather/actions/WeatherActionTypes";

import Weather from "~/weather/Weather";

const defaultWeather = new Weather();

const defaultState = {
	activeWeather: {
		country: "N/A",
		data: defaultWeather.getData(),
		description: defaultWeather.getDescription(),
		location: "N/A",
		mapWeather: defaultWeather.getMapWeather()
	}
};

export const weather = (state = defaultState, action) => {

	switch (action.type) {
		case UPDATE_ACTIVE_WEATHER: {
			return Object.assign({}, state, {
				activeWeather: action.payload.activeWeather
			});
		}

		default:
			return state;
	}
};