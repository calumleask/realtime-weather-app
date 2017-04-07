import mathHelpers from "~/math/helpers/MathHelpers";
import timeHelpers from "~/time/helpers/TimeHelpers";

const threeHours = 3 * 60 * 60 * 1000;
let baseTime = 0;
let readableBaseTime = 0;

const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

export const calculateBaseTime = (time, offset) => {
    baseTime = mathHelpers.roundToNearest(time, threeHours);
    readableBaseTime = mathHelpers.roundToNearest(timeHelpers.addOffset(time, offset), threeHours);
    return readableBaseTime;
};

export const getTimeAtIndex = (index) => {
    return baseTime + index * threeHours;
};

export const getReadableTimeAtIndex = (index) => {
    return readableBaseTime + index * threeHours;
};

export const getTimeStringAtIndex = (index) => {
    const readableHoursAtIndex = new Date(getReadableTimeAtIndex(index)).getUTCHours();
    return checkTime(readableHoursAtIndex) + ":00";
};