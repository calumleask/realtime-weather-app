import React from "react";
import { connect } from "react-redux";

import localTime from "~/time/Clock";
import mapController from "~/map/MapController";
import mapTime from "~/time/MapTime";
import mapWeather from "~/weather/MapWeather";
import weatherService from "~/weather/WeatherService";
import { getTimeZone, setActiveTimelineIndex } from "~/time/actions/TimeActions";

import SearchBarContainer from "~/searchbar/view/containers/SearchBarContainer.jsx";
import ZoomControlButtons from "~/map/view/components/ZoomControlButtons.jsx";
import WeatherBarContainer from "~/weather/view/containers/WeatherBarContainer.jsx";
import WeatherTimelineContainer from "~/weather/view/containers/WeatherTimelineContainer.jsx";

class MapContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		mapController.initialize();
		localTime.start();
		mapTime.initialize();
		mapWeather.initialize();
		getTimeZone();
		weatherService.getCurrentWeather();
		mapController.registerOnLocationChangeCallback(this._onMapLocationChange.bind(this));
	}

	_onMapLocationChange() {
		getTimeZone();
		weatherService.getCurrentWeather();
		this.props.resetActiveIndex();
	}

	render() {
		return (
			<div className="map-container" onMouseDown={this._closeContextMenu} onWheel={this._closeContextMenu}>
				<div id="map"/>
				<SearchBarContainer/>
				<ZoomControlButtons/>
				<WeatherBarContainer/>
				<WeatherTimelineContainer/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	resetActiveIndex: (index) => { dispatch(setActiveTimelineIndex(0)); }
});

const ConnectedMapContainer = connect(null, mapDispatchToProps)(MapContainer);
export default ConnectedMapContainer;