import Location from "~/weather/Location";
import LocationRepository from "~/weather/LocationRepository";

class LocationService {

    constructor() {
        this._locationRepository = new LocationRepository();
    }

    add(locationInfo) {
        const location = new Location(locationInfo.id, locationInfo.latLng, locationInfo.name);
        this._locationRepository.add(location);
    }

    getAllIds() {
        return this._locationRepository.getAllIds();
    }

    getLatLng(id) {
        return this._locationRepository.get(id).getLatLng();
    }

    getName(id) {
        if (id !== null && this._locationRepository.exists(id)) {
            return this._locationRepository.get(id).getName();
        }
        return "N/A";
    }
}

const locationService = new LocationService;
export default locationService;