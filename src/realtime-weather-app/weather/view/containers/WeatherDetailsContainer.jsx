import React from "react";
import { connect } from "react-redux";

import localTime from "~/time/LocalTime";
import mapTime from "~/time/MapTime";

class WeatherDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    _getExpandCollapseTab() {
        const { expanded } = this.state;
        const text = expanded ? "Close" : "More";
        const onClick = expanded ? () => { this.setState({ expanded: false }); } : () => { this.setState({ expanded: true }); };
        return (
            <div className="expand-collapse-tab" onClick={onClick}>
                <div className="text" onClick={onClick}>{text}</div>
            </div>
        );
    }

    _getTopSection() {
        const { activeWeather } = this.props;
        return (
            <div className="top-section">
                <div className="location-container">
                    <div className="main-text">{activeWeather.location}</div>
                    <div className="sub-text">{activeWeather.country.toUpperCase()}</div>
                </div>
                <div className="date-container">
                    <div className="main-text">{mapTime.getDateString()}</div>
                    <div className="sub-text">{mapTime.getDayString().toUpperCase()}</div>
                </div>
            </div>
        );
    }

    _getMiddleSection() {
        const { activeWeather } = this.props;
        let weatherAssetUrl = "static/assets/weather_details/" + activeWeather.mapWeather + "_panel.png";
        const style = {
            backgroundImage: "url(" + weatherAssetUrl + ")"
        };

        return (
        <div className="middle-section">
            <div className="main-weather-container">
                <div className="weather-icon" style={style}/>
                <div className="text">{activeWeather.description}</div>
            </div>
            <div className="sunrise-sunset-container">
                <div className="icon"/>
                <div className="sunrise-time">{mapTime.getSunrise()}</div>
                <div className="sunset-time">{mapTime.getSunset()}</div>
                <div className="sunrise-text">SUNRISE</div>
                <div className="divider"/>
                <div className="sunset-text">SUNSET</div>
            </div>
            <div className="local-time-container">
                <div className="local-time-clock">{localTime.getDigitalString()}</div>
                <div className="text">LOCAL TIME</div>
            </div>
        </div>
        );
    }

    _getBottomSection() {
        const activeWeatherData = this.props.activeWeather.data;

        return (
            <div className="bottom-section">
                <div className="temperature-container">
                    <div className="value">{activeWeatherData.temperature + "°C"}</div>
                    <div className="max-text">Max</div>
                    <div className="max-value">{activeWeatherData.maxTemperature + "°C"}</div>
                    <div className="min-text">Min</div>
                    <div className="min-value">{activeWeatherData.minTemperature + "°C"}</div>
                    <div className="detail-icon"/>
                    <div className="temperature-text">Temperature</div>
                </div>
                <div className="humidity-container">
                    <div className="value">{activeWeatherData.humidity}</div>
                    <div className="percentage-text">%</div>
                    <div className="detail-icon"/>
                    <div className="humidity-text">Humidity</div>
                </div>
                <div className="clouds-container">
                    <div className="value">{activeWeatherData.cloudCover}</div>
                    <div className="percentage-text">%</div>
                    <div className="detail-icon"/>
                    <div className="clouds-text">Clouds</div>
                </div>
                <div className="wind-container">
                    <div className="value">{activeWeatherData.windSpeed}</div>
                    <div className="mph-text">mph</div>
                    <div className="detail-icon"/>
                    <div className="wind-text">Wind</div>
                </div>
            </div>
        );
    }

    render() {
        const className = "weather-details-container" + (this.state.expanded ? " expanded" : "");

        return (
            <div className={className}>
                <div className="weather-details-content">
                    {this._getTopSection()}
                    {this._getMiddleSection()}
                    {this._getBottomSection()}
                </div>
                {this._getExpandCollapseTab()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeWeather: state.weather.activeWeather,
    localTime: state.time.localTime
});

const ConnectedWeatherDetailsContainer = connect(mapStateToProps)(WeatherDetailsContainer);
export default ConnectedWeatherDetailsContainer;