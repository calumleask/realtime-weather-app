import { UPDATE_TIMELINE_BASE_TIME, SET_ACTIVE_TIMELINE_INDEX } from "~/time/actions/TimeActionTypes";

const defaultState = {
	baseTime: 0,
    activeIndex: 0,
    maxIndex: 8
};

export const timeline = (state = defaultState, action) => {
	switch (action.type) {
		case UPDATE_TIMELINE_BASE_TIME:
			return Object.assign({}, state, {
				baseTime: action.payload.baseTime
			});

		case SET_ACTIVE_TIMELINE_INDEX:
			return Object.assign({}, state, {
				activeIndex: action.payload.index
			});

		default:
			return state;
	}
};