import React from "react";
import { connect } from "react-redux";

const config = require("~/config.json");

import mapController from "~/map/MapController";
import { closeMenu } from "~/searchbar/actions/SearchBarActions";

import MenuOptionGroup from "~/searchbar/view/components/MenuOptionGroup.jsx";

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
    return config.location_jumps.map(location => ({
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