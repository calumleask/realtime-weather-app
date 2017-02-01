import mathHelpers from "~/math/helpers/MathHelpers";

let baseTime = 0;

const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

export const calculateBaseTime = (localTime) => {
    const threeHours = 3 * 60 * 60 * 1000;
    baseTime = mathHelpers.roundToNearest(localTime, threeHours);
    return baseTime;
};

export const getTimeAtIndex = (index) => {
    const threeHours = 3 * 60 * 60 * 1000;
    return baseTime + index * threeHours;
};

export const getTimeStringAtIndex = (index) => {
    const timeAtIndex = getTimeAtIndex(index);
    let hoursAtIndex = new Date(timeAtIndex).getHours();
    return checkTime(hoursAtIndex) + ":00";
};