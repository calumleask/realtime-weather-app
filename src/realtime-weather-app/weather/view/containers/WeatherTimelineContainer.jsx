import React from "react";
import { connect } from "react-redux";

import { setActiveTimelineIndex } from "~/time/actions/TimeActions";
import { getTimeStringAtIndex } from "~/time/helpers/TimelineHelpers";

import WeatherDetailsContainer from "~/weather/view/containers/WeatherDetailsContainer.jsx";

class WeatherTimelineContainer extends React.Component {

    constructor(props) {
        super(props);

        this._cycleBack = this._cycleBack.bind(this);
        this._cycleForward = this._cycleForward.bind(this);
    }

    _cycleBack() {
        const { setActiveIndex, activeIndex } = this.props;
        let index = activeIndex - 1;
        if (index < 0) { return; }
        setActiveIndex(index);
    }

    _cycleForward() {
        const { setActiveIndex, activeIndex, maxIndex } = this.props;
        let index = activeIndex + 1;
        if (index > maxIndex) { return; }
        setActiveIndex(index);
    }

    _getTimelineTimes() {
        const { setActiveIndex, activeIndex, maxIndex } = this.props;
        let timeElements = [];

        for (let i = 0; i <= maxIndex; ++i) {
            let className = "time-text";
            className += i === activeIndex ? " active" : "";
            className += i === maxIndex ? " last" : "";
            const timeText = getTimeStringAtIndex(i);
            timeElements.push(<div key={i} className={className} onClick={setActiveIndex.bind(this, i)}>{timeText}</div>);
        }

        return (
            <div className="timeline-times">
                {timeElements}
            </div>
        );
    }

    render() {
        return (
            <div className="map-overlay weather-timeline-container">
                <button id="timeline-cycle-back" onClick={this._cycleBack}/>
                <button id="timeline-cycle-forward" onClick={this._cycleForward}/>
                <WeatherDetailsContainer/>
                {this._getTimelineTimes()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    baseTime: state.timeline.baseTime,
    activeIndex: state.timeline.activeIndex,
    maxIndex: state.timeline.maxIndex,
    dstOffset: state.time.dstOffset
});

const mapDispatchToProps = (dispatch) => ({
    setActiveIndex: (index) => { dispatch(setActiveTimelineIndex(index)); }
});

const ConnectedWeatherTimelineContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherTimelineContainer);
export default ConnectedWeatherTimelineContainer;