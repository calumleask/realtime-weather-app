import { UPDATE_LOCAL_TIME, UPDATE_TIME_OF_DAY, UPDATE_DST_OFFSET } from "~/time/actions/TimeActionTypes";

const defaultState = {
	localTime: 0,
	dstOffset: 0,
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
		
		case UPDATE_DST_OFFSET:
			return Object.assign({}, state, {
				dstOffset: payload.dstOffset
			});

		default:
			return state;
	}
};