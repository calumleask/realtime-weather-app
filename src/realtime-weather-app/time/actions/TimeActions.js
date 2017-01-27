import store, { dispatch } from "~/stores/Store";

import TimeZoneService from "~/time/TimeZoneService";

import localTime from "~/time/Clock";
import mapController from "~/map/MapController";
import mapTime from "~/time/MapTime";
import { buildUpdateLocalTimeAction, buildUpdateTimeOfDayAction, buildSetActiveTimelineIndexAction, buildUpdateTimelineBaseTimeAction } from "~/time/actions/TimeActionBuilder";
import { getTimeAtIndex, calculateBaseTime } from "~/time/helpers/TimelineHelpers";

export const getTimeZone = () => {
    const latLng = mapController.getCenter();

    TimeZoneService.getTimeZoneAtLatLng(latLng)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const utcOffset = result.rawOffset;
        const country = result.countryName;
        const prevUtcOffset = localTime.getUtcOffset();
        localTime.setUtcOffset(utcOffset);
        localTime.setCountry(country);

        if (utcOffset !== prevUtcOffset) {
            dispatch(buildSetActiveTimelineIndexAction(0));
        }
    })
    .catch(error => {
        console.log("Could not get time zone at: " + latLng.lat + ", " + latLng.lng + "\nError: " + error);
    });
};

export const setActiveTimelineIndex = (index) => {
	return (dispatch) => {
        if (index > 0) {
            const timeAtTimelineIndex = getTimeAtIndex(index);
            mapTime.observeFixedTime(timeAtTimelineIndex);
        }
        else {
            mapTime.observeLocalTime();
        }
        dispatch(buildSetActiveTimelineIndexAction(index));
	};
};

export const notifyTimelineBaseTimeChange = (baseTime) => {
    dispatch(buildUpdateTimelineBaseTimeAction(baseTime));
};

export const notifyLocalTimeChange = (localTime) => {
    dispatch(buildUpdateLocalTimeAction(localTime));

    const prevTimelineBaseTime = store.getState().timeline.baseTime;
    const currentTimelineBaseTime = calculateBaseTime(localTime);
    if (currentTimelineBaseTime !== prevTimelineBaseTime) {
        notifyTimelineBaseTimeChange(currentTimelineBaseTime);
    }
};

export const notifyTimeOfDayChange = (timeOfDay) => {
    mapController.setTimeOfDay(timeOfDay);
    dispatch(buildUpdateTimeOfDayAction(timeOfDay));
};

localTime.on("second", notifyLocalTimeChange);
localTime.on("timezonechange", notifyLocalTimeChange);