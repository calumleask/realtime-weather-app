import { combineReducers } from "redux";

import { timeline } from "~/time/reducers/TimelineReducer";
import { time } from "~/time/reducers/TimeReducer";
import { weather } from "~/weather/reducers/WeatherReducer";

const rootReducer = combineReducers({
	timeline,
	time,
	weather
});

export default rootReducer;