import { UPDATE_LOCAL_TIME, UPDATE_TIME_OF_DAY } from "~/time/actions/TimeActionTypes";

const defaultState = {
	localTime: 0,
	timeOfDay: "day"
};

export const time = (state = defaultState, action) => {
	const { payload } = action;

	switch (action.type) {
		case UPDATE_LOCAL_TIME:
			return Object.assign({}, state, {
				localTime: payload.localTime
			});

		case UPDATE_TIME_OF_DAY:
			return Object.assign({}, state, {
				timeOfDay: payload.timeOfDay
			});

		default:
			return state;
	}
};