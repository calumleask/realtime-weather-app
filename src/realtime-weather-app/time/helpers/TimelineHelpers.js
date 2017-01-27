
let baseTime = 0;

const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

const roundToNearest = (value, toNearest) => {
    const remainder = value % toNearest;
    if (remainder <= (toNearest / 2)) { 
        return value - remainder;
    } else {
        return value + toNearest - remainder;
    }
};

export const calculateBaseTime = (localTime) => {
    const threeHours = 3 * 60 * 60 * 1000;
    baseTime = roundToNearest(localTime, threeHours);
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