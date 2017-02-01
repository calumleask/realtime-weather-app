
class MathHelpers {

    roundToNearest(value, toNearest) {
        const remainder = value % toNearest;
        if (remainder <= (toNearest / 2)) { 
            return value - remainder;
        } else {
            return value + toNearest - remainder;
        }
    }
}

const mathHelpers = new MathHelpers;
export default mathHelpers;