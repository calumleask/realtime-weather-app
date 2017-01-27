import React from "react";
import { connect } from "react-redux";

import mapController from "~/map/MapController";
import { closeMenu } from "~/searchbar/actions/SearchBarActions";

import MenuOptionGroup from "~/searchbar/view/components/MenuOptionGroup.jsx";

const locationJumps = [
    { "name": "Chicago", "lat": 41.878114, "lng": -87.629798 },
    { "name": "Dundee", "lat": 56.459911, "lng": -2.977959 },
    { "name": "Edinburgh", "lat": 55.961559, "lng": -3.20994 },
    { "name": "London", "lat": 51.501851, "lng": -0.118915 },
    { "name": "Los Angeles", "lat": 34.050175, "lng": -118.260048 },
    { "name": "New York", "lat": 40.703762, "lng": -74.013733 },
    { "name": "Phoenix", "lat": 33.448443, "lng": -112.074475 },
    { "name": "Pisa", "lat": 43.723268, "lng": 10.395842 },
    { "name": "Portland", "lat": 45.523548, "lng": -122.676859 },
    { "name": "San Francisco", "lat": 37.7858, "lng": -122.401 },
    { "name": "Seattle", "lat": 47.60544, "lng": -122.334744 },
    { "name": "Toronto", "lat": 43.655205, "lng": -79.382401 },
    { "name": "Vancouver", "lat": 49.278643, "lng": -123.117482 }
];

class MenuContainer extends React.Component {

  constructor(props) {
    super(props);

    this._optionGroupIndex = {
      locations: 0
    };

    this.state = {
      optionGroupIndexExpanded: null,
      optionGroupIndexToBeExpanded: null
    };
    
    this._onOptionGroupCollapsed = this._onOptionGroupCollapsed.bind(this);
    this._onLocationOptionSelected = this._onLocationOptionSelected.bind(this);
  }

  _getLocationOptions() {
    return locationJumps.map(location => ({
      label: location.name,
      value: {
        lat: location.lat,
        lng: location.lng
      }
    }));
  }

  _onOptionGroupExpandCollapseToggleClicked(optionGroupIndex) {
    const collapsingCurrentlyExpanded = this.state.optionGroupIndexToBeExpanded === optionGroupIndex;
    const optionGroupIndexExpanded = this.state.optionGroupIndexExpanded === null ? optionGroupIndex : this.state.optionGroupIndexExpanded;
    const optionGroupIndexToBeExpanded = collapsingCurrentlyExpanded ? null : optionGroupIndex;
    this.setState({
      optionGroupIndexExpanded: optionGroupIndexExpanded,
      optionGroupIndexToBeExpanded: optionGroupIndexToBeExpanded
    });
  }

  _onOptionGroupExpandStart(optionGroupIndex) {
    if (optionGroupIndex === this._optionGroupIndex.find) {
      this._updateTagOptions();
    }
  }

  _onOptionGroupCollapsed() {
    this.setState({ optionGroupIndexExpanded: this.state.optionGroupIndexToBeExpanded });
  }

  _onLocationOptionSelected(option) {
    const location = option.value;
    this.props.closeMenu();
    mapController.goToLocation(location);
  }

  render() {
    const { isShowing, closeMenu } = this.props;
    const { optionGroupIndexExpanded, optionGroupIndexToBeExpanded } = this.state;
    if (!isShowing) { return null; }
 
    return (
      <div className="menu-container">
        <div className="header-container">
          <button className="toggle-menu-button" onClick={closeMenu}/>
          <div className="header-text">Menu</div>
        </div>
        <hr/>
        <div className="menu-body-container">
          <MenuOptionGroup  title="Locations"
                            shouldBeExpanded={optionGroupIndexToBeExpanded === this._optionGroupIndex.locations && optionGroupIndexExpanded === this._optionGroupIndex.locations}
                            onExpandCollapseToggleClick={() => { this._onOptionGroupExpandCollapseToggleClicked(this._optionGroupIndex.locations); }}
                            onExpandStartCallback={() => { this._onOptionGroupExpandStart(this._optionGroupIndex.locations); }}
                            onCollapsedCallback={this._onOptionGroupCollapsed}
                            options={this._getLocationOptions()}
                            onOptionSelect={this._onLocationOptionSelected}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isShowing: state.searchBar.showingMenu
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeMenu: () => { dispatch(closeMenu()); }
  };
};

const ConnectedMenuContainer = connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
export default ConnectedMenuContainer;