import React from "react";

import mapController from "~/map/MapController";

export default class ZoomControlButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"map-overlay zoom-control-buttons"}>
                <button id="zoom-in" onClick={() => { mapController.zoomIn(); }}/>
                <button id="zoom-out" onClick={() => { mapController.zoomOut(); }}/>
            </div>
        );
    }
}