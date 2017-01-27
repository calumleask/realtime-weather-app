import { combineReducers } from "redux";

import { searchBar } from "~/searchbar/reducers/SearchBarReducer";
import { timeline } from "~/time/reducers/TimelineReducer";
import { time } from "~/time/reducers/TimeReducer";
import { weather } from "~/weather/reducers/WeatherReducer";

const rootReducer = combineReducers({
	searchBar,
	timeline,
	time,
	weather
});

export default rootReducer;