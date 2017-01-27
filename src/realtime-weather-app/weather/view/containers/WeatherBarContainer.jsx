import React from "react";
import { connect } from "react-redux";

import mapController from "~/map/MapController";

class WeatherBarContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        weatherEnabled: true,
        timeOfDayEnabled: true
        };

        this._toggleWeather = this._toggleWeather.bind(this);
        this._toggleTimeOfDay = this._toggleTimeOfDay.bind(this);
    }

    _toggleWeather() {
        const weatherEnabled = !this.state.weatherEnabled;
        if (weatherEnabled) {
            mapController.enableWeather();
            mapController.setWeather(this.props.mapWeather);
        }
        else {
            mapController.disableWeather();
        }
        this.setState({ weatherEnabled: weatherEnabled });
    }

    _toggleTimeOfDay() {
        const timeOfDayEnabled = !this.state.timeOfDayEnabled;
        if (timeOfDayEnabled) {
            mapController.enableTimeOfDay();
            mapController.setTimeOfDay(this.props.timeOfDay);
        }
        else {
            mapController.disableTimeOfDay();
        }
        this.setState({ timeOfDayEnabled: timeOfDayEnabled });
    }

    _getWeatherToggleButton() {
        let assetUrl = "static/assets/weather_icons/" + this.props.mapWeather;
        assetUrl += this.state.weatherEnabled ? "_enabled.png" : "_disabled.png";
        const style = {
            backgroundImage: "url(" + assetUrl + ")"
        };
        return <button id="weather-toggle-button" style={style} onClick={this._toggleWeather}/>;
    }

    _getTimeOfDayToggleButton() {
        let assetUrl = "static/assets/weather_icons/" + this.props.timeOfDay;
        assetUrl += this.state.timeOfDayEnabled ? "_enabled.png" : "_disabled.png";
        const style = {
            backgroundImage: "url(" + assetUrl + ")"
        };
        return <button id="time-of-day-toggle-button" style={style} onClick={this._toggleTimeOfDay}/>;
    }

    render() {
        return (
            <div className="map-overlay weather-bar-container">
                {this._getWeatherToggleButton()}
                {this._getTimeOfDayToggleButton()}
                <div className="location-text">{this.props.location}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.weather.activeWeather.location,
    mapWeather: state.weather.activeWeather.mapWeather,
    timeOfDay: state.time.timeOfDay
});

const ConnectedWeatherBarContainer = connect(mapStateToProps)(WeatherBarContainer);
export default ConnectedWeatherBarContainer;