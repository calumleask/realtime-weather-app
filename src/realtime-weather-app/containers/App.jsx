import React from "react";

import MapContainer from "~/map/view/containers/MapContainer.jsx";

export default class App extends React.Component {
  
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <MapContainer/>
            </div>
        );
    }
}