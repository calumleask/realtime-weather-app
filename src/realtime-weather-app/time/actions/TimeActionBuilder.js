import { UPDATE_LOCAL_TIME, UPDATE_TIME_OF_DAY, SET_ACTIVE_TIMELINE_INDEX, UPDATE_TIMELINE_BASE_TIME, UPDATE_DST_OFFSET } from "~/time/actions/TimeActionTypes";

export const buildUpdateLocalTimeAction = (localTime) => ({
	type: UPDATE_LOCAL_TIME,
	payload: {
		localTime: localTime
	}
});

export const buildUpdateTimeOfDayAction = (timeOfDay) => ({
	type: UPDATE_TIME_OF_DAY,
	payload: {
		timeOfDay: timeOfDay
	}
});

export const buildSetActiveTimelineIndexAction = (index) => ({
	type: SET_ACTIVE_TIMELINE_INDEX,
	payload: {
		index: index
	}
});

export const buildUpdateTimelineBaseTimeAction = (baseTime) => ({
	type: UPDATE_TIMELINE_BASE_TIME,
	payload: {
		baseTime: baseTime
	}
});

export const buildUpdateDstOffsetAction = (dstOffset) => ({
	type: UPDATE_DST_OFFSET,
	payload: {
		dstOffset: dstOffset
	}

});