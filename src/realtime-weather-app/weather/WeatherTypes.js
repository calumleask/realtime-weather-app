
const weatherTypes = {
    "200": { "main": "thunderstorm", "mapWeather": "rainy", "description": "thunderstorm with light rain" },
    "201": { "main": "thunderstorm", "mapWeather": "rainy", "description": "thunderstorm with rain" },
    "202": { "main": "thunderstorm", "mapWeather": "rainy", "description": "thunderstorm with heavy rain" },
    "210": { "main": "thunderstorm", "mapWeather": "overcast", "description": "light thunderstorm" },
    "211": { "main": "thunderstorm", "mapWeather": "overcast", "description": "thunderstorm" },
    "212": { "main": "thunderstorm", "mapWeather": "overcast", "description": "heavy thunderstorm" },
    "221": { "main": "thunderstorm", "mapWeather": "overcast", "description": "ragged thunderstorm" },
    "230": { "main": "thunderstorm", "mapWeather": "rainy", "description": "thunderstorm with light drizzle" },
    "231": { "main": "thunderstorm", "mapWeather": "rainy", "description": "thunderstorm with drizzle" },
    "232": { "main": "thunderstorm", "mapWeather": "rainy", "description": "thunderstorm with heavy drizzle" },
    "300": { "main": "Drizzle", "mapWeather": "rainy", "description": "light intensity drizzle" },
    "301": { "main": "Drizzle", "mapWeather": "rainy", "description": "drizzle" },
    "302": { "main": "Drizzle", "mapWeather": "rainy", "description": "heavy intensity drizzle" },
    "310": { "main": "Drizzle", "mapWeather": "rainy", "description": "light intensity drizzle rain" },
    "311": { "main": "Drizzle", "mapWeather": "rainy", "description": "drizzle rain" },
    "312": { "main": "Drizzle", "mapWeather": "rainy", "description": "heavy intensity drizzle rain" },
    "313": { "main": "Drizzle", "mapWeather": "rainy", "description": "shower rain and drizzle" },
    "314": { "main": "Drizzle", "mapWeather": "rainy", "description": "heavy shower rain and drizzle" },
    "321": { "main": "Drizzle", "mapWeather": "rainy", "description": "shower drizzle" },
    "500": { "main": "rain", "mapWeather": "rainy", "description": "light rain" },
    "501": { "main": "rain", "mapWeather": "rainy", "description": "moderate rain" },
    "502": { "main": "rain", "mapWeather": "rainy", "description": "heavy intensity rain" },
    "503": { "main": "rain", "mapWeather": "rainy", "description": "very heavy rain" },
    "504": { "main": "rain", "mapWeather": "rainy", "description": "extreme rain" },
    "511": { "main": "rain", "mapWeather": "rainy", "description": "freezing rain" },
    "520": { "main": "rain", "mapWeather": "rainy", "description": "light intensity shower rain" },
    "521": { "main": "rain", "mapWeather": "rainy", "description": "shower rain" },
    "522": { "main": "rain", "mapWeather": "rainy", "description": "heavy intensity shower rain" },
    "531": { "main": "rain", "mapWeather": "rainy", "description": "ragged shower rain" },
    "600": { "main": "snow", "mapWeather": "snowy", "description": "light snow" },
    "601": { "main": "snow", "mapWeather": "snowy", "description": "snow" },
    "602": { "main": "snow", "mapWeather": "snowy", "description": "heavy snow" },
    "611": { "main": "snow", "mapWeather": "snowy", "description": "sleet" },
    "612": { "main": "snow", "mapWeather": "snowy", "description": "shower sleet" },
    "615": { "main": "snow", "mapWeather": "snowy", "description": "light rain and snow" },
    "616": { "main": "snow", "mapWeather": "snowy", "description": "rain and snow" },
    "620": { "main": "snow", "mapWeather": "snowy", "description": "light shower snow" },
    "621": { "main": "snow", "mapWeather": "snowy", "description": "shower snow" },
    "622": { "main": "snow", "mapWeather": "snowy", "description": "heavy shower snow" },
    "701": { "main": "atmosphere", "mapWeather": "foggy", "description": "mist" },
    "711": { "main": "atmosphere", "mapWeather": "foggy", "description": "smoke" },
    "721": { "main": "atmosphere", "mapWeather": "foggy", "description": "haze" },
    "731": { "main": "atmosphere", "mapWeather": "foggy", "description": "sand, dust whirls" },
    "741": { "main": "atmosphere", "mapWeather": "foggy", "description": "fog" },
    "751": { "main": "atmosphere", "mapWeather": "foggy", "description": "sand" },
    "761": { "main": "atmosphere", "mapWeather": "foggy", "description": "dust" },
    "762": { "main": "atmosphere", "mapWeather": "foggy", "description": "volcanic ash" },
    "771": { "main": "atmosphere", "mapWeather": "foggy", "description": "squalls" },
    "781": { "main": "atmosphere", "mapWeather": "foggy", "description": "tornado" },
    "800": { "main": "clear", "mapWeather": "clear", "description": "clear sky" },
    "801": { "main": "clouds", "mapWeather": "overcast", "description": "few clouds" },
    "802": { "main": "clouds", "mapWeather": "overcast", "description": "scattered clouds" },
    "803": { "main": "clouds", "mapWeather": "overcast", "description": "broken clouds" },
    "804": { "main": "clouds", "mapWeather": "overcast", "description": "overcast clouds" },
    "900": { "main": "extreme", "mapWeather": "overcast", "description": "tornado" },
    "901": { "main": "extreme", "mapWeather": "rain", "description": "tropical storm" },
    "902": { "main": "extreme", "mapWeather": "overcast", "description": "hurricane" },
    "903": { "main": "extreme", "mapWeather": "clear", "description": "cold" },
    "904": { "main": "extreme", "mapWeather": "clear", "description": "hot" },
    "905": { "main": "extreme", "mapWeather": "clear", "description": "windy" },
    "906": { "main": "extreme", "mapWeather": "rain", "description": "hail" },
    "951": { "main": "additional", "mapWeather": "clear", "description": "calm" },
    "952": { "main": "additional", "mapWeather": "clear", "description": "light breeze" },
    "953": { "main": "additional", "mapWeather": "clear", "description": "gentle breeze" },
    "954": { "main": "additional", "mapWeather": "clear", "description": "moderate breeze" },
    "955": { "main": "additional", "mapWeather": "clear", "description": "fresh breeze" },
    "956": { "main": "additional", "mapWeather": "clear", "description": "strong breeze" },
    "957": { "main": "additional", "mapWeather": "clear", "description": "high wind, near gale" },
    "958": { "main": "additional", "mapWeather": "overcast", "description": "gale" },
    "959": { "main": "additional", "mapWeather": "overcast", "description": "severe gale" },
    "960": { "main": "additional", "mapWeather": "rain", "description": "storm" },
    "961": { "main": "additional", "mapWeather": "rain", "description": "violent storm" },
    "962": { "main": "additional", "mapWeather": "rain", "description": "hurricane" }
};

export const getMapWeatherFromWeatherCode = (code) => {
    if (code in weatherTypes) {
        return weatherTypes[code].mapWeather;
    }
    return "clear";
};

export const getDescriptionFromWeatherCode = (code) => {
    if (code in weatherTypes) {
        return weatherTypes[code].description;
    }
    return "N/A";
};