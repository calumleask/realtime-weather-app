import ES6Promise from "es6-promise";
ES6Promise.polyfill();
import fetch from "isomorphic-fetch";

import Weather from "~/weather/Weather";

const kelvinToCelcius = (temp) => {
	return parseInt(temp - 273.15);
};

const metersPerSecToMilesPerHour = (speed) => {
	return parseInt(speed * 2.236936);
};

class WeatherWebRequestService {

    constructor() {
        this._apiKey = "INSERT_OPEN_WEATHER_MAP_API_KEY_HERE";
        this._urlRoot = "http://api.openweathermap.org/data/2.5/";
    }

    getLocationsAtLatLng(latLng, locationCount) {
        const urlString = this._urlRoot + "find?APPID=" + this._apiKey + "&lat=" + latLng.lat + "&lon=" + latLng.lng + "&cnt=" + locationCount;
        return fetch(urlString)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (!result.list) return [];
            const locationArray = [];
            result.list.some((listItem) => {
                locationArray.push({
                    id: listItem.id,
                    latLng: {
                        lat: listItem.coord.lat,
                        lng: listItem.coord.lon
                    },
                    name: listItem.name,
                    weather: new Weather(listItem.weather[0].id, {
                        temperature: kelvinToCelcius(listItem.main.temp),
                        maxTemperature: kelvinToCelcius(listItem.main.temp_max),
                        minTemperature: kelvinToCelcius(listItem.main.temp_min),
                        humidity: listItem.main.humidity,
                        cloudCover: listItem.clouds.all,
                        windSpeed: metersPerSecToMilesPerHour(listItem.wind.speed)
                    })
                });
            });

            return locationArray;
        })
        .catch(error => {
			console.log("Could not get locations at: " + latLng.lat + ", " + latLng.lng + "\nError: " + error);
		});
    }

    getForecastForLocationId(id) {
        const urlString = this._urlRoot + "forecast?APPID=" + this._apiKey + "&id=" + id;
        return fetch(urlString)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (!result.list) return [];
            const weatherArray = [];
            result.list.some((listItem) => {
                weatherArray.push({
                    code: listItem.weather[0].id,
                    time: new Date(listItem.dt_txt).getTime(),
                    temperature: kelvinToCelcius(listItem.main.temp),
                    maxTemperature: kelvinToCelcius(listItem.main.temp_max),
                    minTemperature: kelvinToCelcius(listItem.main.temp_min),
                    humidity: listItem.main.humidity,
                    cloudCover: listItem.clouds.all,
                    windSpeed: metersPerSecToMilesPerHour(listItem.wind.speed)
                });
                
                return weatherArray.length > 9;
            });

            return weatherArray;
        })
        .catch(error => {
            console.log("Could not get forecast for id: " + id + "\nError: " + error);
        });
    }
}

const weatherWebRequestService = new WeatherWebRequestService;
export default weatherWebRequestService;