import React from "react";
import { connect } from "react-redux";

import OptionRow from "~/searchbar/view/components/OptionRow.jsx";

class OptionsContainer extends React.Component {

  render() { 
    const { showingResults, options, onOptionSelect } = this.props;
    if (!showingResults || options.length === 0) { return null; }

    const optionElements = options.map((option, optionIndex) => {
      return <OptionRow key={optionIndex} option={option} onSelect={onOptionSelect.bind(this, option)}/>;
    });

    return (
      <div id="options-container">
        {optionElements}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showingResults: state.searchBar.showingResults
});

const ConnectedOptionsContainer = connect(mapStateToProps)(OptionsContainer);
export default ConnectedOptionsContainer;