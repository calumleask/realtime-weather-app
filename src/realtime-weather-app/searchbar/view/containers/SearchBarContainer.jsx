import React from "react";
import { connect } from "react-redux";

import LocationSearchService from "~/backend/LocationSearchService";
import mapController from "~/map/MapController";
import { showResults, hideResults } from "~/searchbar/actions/SearchBarActions";

import MenuContainer from "~/searchbar/view/containers/MenuContainer.jsx";
import OptionsContainer from "~/searchbar/view/containers/OptionsContainer.jsx";
import SearchBar from "~/searchbar/view/components/SearchBar.jsx";

const getSubtitleFromLocationResultProperties = (properties) => {
  let subtitleArray = [];
  if (properties.locality !== undefined) {
    subtitleArray.push(properties.locality);
  }
  if (properties.region !== undefined) {
    subtitleArray.push(properties.region);
  }
  if (properties.macroregion !== undefined) {
    subtitleArray.push(properties.macroregion);
  }
  if (properties.country !== undefined) {
    subtitleArray.push(properties.country);
  }
  if (properties.macrocountry !== undefined) {
    subtitleArray.push(properties.macrocountry);
  }
  return subtitleArray.join(", ");
};

class SearchBarContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      results: [],
      awaitingLocationResults: false
    };

    this._fetchingLocationsTimeout = null;
    this._locationsRequestCount = 0;
    this._countryCodes = [ "GBR", "USA", "CAN", "IRL", "ITA", "NOR", "SWE", "FIN", "SJM" ];

    this._onInputChange = this._onInputChange.bind(this);
    this._onClearClicked = this._onClearClicked.bind(this);
    this._onOptionSelected = this._onOptionSelected.bind(this);
    this._performSearch = this._performSearch.bind(this);
  }

  _onInputChange(event) {
    const input = event.target.value;
    this._getOptionsFromInput(input);
    this.props.showResults();
    this.setState({ searchString: input });
  }

  _getOptionsFromInput(input) {
    clearTimeout(this._fetchingLocationsTimeout);

    if (input.trim().length === 0) {
      this.setState({
        results: [],
        awaitingResults: false
      });
      return;
    }

    this.setState({ awaitingResults: true });

    this._fetchingLocationsTimeout = setTimeout(() => {
      this._locationsRequestCount++;
      const requestNum = this._locationsRequestCount;
      LocationSearchService.performAutocomplete(input)
      .then(response => response.json())
      .then(result => {
        if (this._locationsRequestCount > requestNum) {
          return;
        }
        let results = [];
        const maxResultsToShow = 5;
        result.features.some(feature => {
          if (this._countryCodes.indexOf(feature.properties.country_a) !== -1) {
            results.push({
              label: feature.properties.name,
              subtitle: getSubtitleFromLocationResultProperties(feature.properties),
              value: {
                location: {
                  lat: feature.geometry.coordinates[1],
                  lng: feature.geometry.coordinates[0]
                }
              }
            });
          }
          return results.length >= maxResultsToShow;
        });

        this.setState({
          results: results,
          awaitingResults: false
        });
      })
      .catch(error => {
        this.setState({ awaitingResults: false });
      });
    }, 250);
  }

  _onClearClicked() {
    this._reset();
  }

  _onOptionSelected(result) {
    mapController.goToLocation(result.value.location);
    this._reset();
  }

  _performSearch() {
    const topResult = this.state.results[0];
    if (topResult) {
      mapController.goToLocation(topResult.value.location);
    }
    this._reset();
  }

  _reset() {
    this.props.hideResults();
    this.setState({
      searchString: "",
      results: [],
      awaitingResults: false
    });
  }

  render() {
    const { searchString, results, awaitingResults } = this.state;

    return (
      <div className="map-overlay searchbar-container">
        <SearchBar  searchString={searchString}
                    onSearch={this._performSearch}
                    onInputChange={this._onInputChange}
                    onClearClick={this._onClearClicked}
                    shouldShowSpinner={awaitingResults}/>
        <OptionsContainer options={results} onOptionSelect={this._onOptionSelected}/>
        <MenuContainer/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showResults: () => { dispatch(showResults()); },
    hideResults: () => { dispatch(hideResults()); }
  };
};

const ConnectedSearchBarContainer = connect(null, mapDispatchToProps)(SearchBarContainer);
export default ConnectedSearchBarContainer;
