import React from "react";
import { connect } from "react-redux";

import { showResults, hideResults, openMenu, closeMenu } from "~/searchbar/actions/SearchBarActions";

import TextField from "~/searchbar/view/components/TextField.jsx";

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this._onKeyDown = this._onKeyDown.bind(this);
    this._hideResults = this._hideResults.bind(this);
  }

  _onKeyDown(event) {
    switch (event.key) {
      case "Enter":
        this.props.onSearch();
        break;
    }
  }

  _hideResults() {
    const mouseIsOverSearchOptions = $("#options-container:hover").length !== 0;
    if (!mouseIsOverSearchOptions) {
      this.props.hideResults();
    }
  }

  render() {
    const { openMenu, closeMenu, showResults, searchString, onSearch, onInputChange, onClearClick, shouldShowSpinner, showingMenu } = this.props;
    
    let searchBarClassName = "searchbar";
    searchBarClassName += searchString.trim().length ? " has-input" : "";
    const searchBarDisabledOverlay = showingMenu ? <div className="disabled-overlay" onClick={closeMenu}></div> : null;

    return (
      <div className={searchBarClassName}>
          <button className="toggle-menu-button" onClick={openMenu}/>
          <TextField  value={searchString}
                      onChange={onInputChange}
                      onFocus={showResults}
                      onBlur={this._hideResults}
                      onKeyDown={this._onKeyDown}
                      onClearClick={onClearClick}
                      shouldShowSpinner={shouldShowSpinner}/>
          <button className="search-button" onClick={onSearch}/>
          {searchBarDisabledOverlay}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showingMenu: state.searchBar.showingMenu
});

const mapDispatchToProps = (dispatch) => {
  return {
    showResults: () => { dispatch(showResults()); },
    hideResults: () => { dispatch(hideResults()); },
    openMenu: () => {
      dispatch(hideResults());
      dispatch(openMenu());
    },
    closeMenu: () => { dispatch(closeMenu()); }
  };
};

const ConnectedSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default ConnectedSearchBar;
