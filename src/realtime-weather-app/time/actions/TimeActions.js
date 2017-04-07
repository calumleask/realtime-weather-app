import store, { dispatch } from "~/stores/Store";

import TimeZoneService from "~/time/TimeZoneService";

import clock from "~/time/Clock";
import localTime from "~/time/LocalTime";
import mapController from "~/map/MapController";
import mapTime from "~/time/MapTime";
import weatherService from "~/weather/WeatherService";
import { buildUpdateLocalTimeAction, buildUpdateTimeOfDayAction, buildSetActiveTimelineIndexAction, buildUpdateTimelineBaseTimeAction, buildUpdateDstOffsetAction } from "~/time/actions/TimeActionBuilder";
import { getTimeAtIndex, getReadableTimeAtIndex, calculateBaseTime } from "~/time/helpers/TimelineHelpers";

export const getTimeZone = () => {
    const latLng = mapController.getCenter();

    TimeZoneService.getTimeZoneAtLatLng(latLng)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const utc = result.rawOffset;
        const dst = result.dstOffset;
        const country = result.countryName;
        const prevDst = localTime.getOffsets().dst;
        localTime.setOffsets(utc, dst);
        localTime.setCountry(country);

        if (dst !== prevDst) {
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
            const readableTimeAtIndex = getReadableTimeAtIndex(index);
            mapTime.observeFixedTime(timeAtTimelineIndex, readableTimeAtIndex);
        }
        else {
            mapTime.observeLocalTime();
        }
        dispatch(buildSetActiveTimelineIndexAction(index));
	};
};

const notifyTimelineBaseTimeChange = (baseTime) => {
    weatherService.updateCurrentWeatherTime(baseTime);
    dispatch(buildUpdateTimelineBaseTimeAction(baseTime));
};

export const notifyTimeOfDayChange = (timeOfDay) => {
    mapController.setTimeOfDay(timeOfDay);
    dispatch(buildUpdateTimeOfDayAction(timeOfDay));
};

const onSecond = (event) => {
    dispatch(buildUpdateLocalTimeAction(event.time));

    const prevTimelineBaseTime = store.getState().timeline.baseTime;
    const currentTimelineBaseTime = calculateBaseTime(clock.getTime(), localTime.getOffsets().dst);
    if (currentTimelineBaseTime !== prevTimelineBaseTime) {
        notifyTimelineBaseTimeChange(currentTimelineBaseTime);
        const timelineActiveIndex = store.getState().timeline.activeIndex;
        dispatch(setActiveTimelineIndex(Math.max(0, timelineActiveIndex - 1)));
    }
};

const onTimeZoneChange = (event) => {
    dispatch(buildUpdateDstOffsetAction(event.dst));
};

clock.on("second", onSecond);
localTime.on("timezonechange", onTimeZoneChange);