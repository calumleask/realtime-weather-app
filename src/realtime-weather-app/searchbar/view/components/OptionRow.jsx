import React from "react";

export default class OptionRow extends React.Component {

  render() {
    const { option, onSelect } = this.props;
    
    const iconUrl = "https://cdn-webgl.eegeo.com/eegeo-search/latest/assets/js/icon1_misc.png";
    const iconStyle = {
      backgroundImage: "url(" + iconUrl + ")"
    };

    const hasSubtitle = option.subtitle !== undefined;
    const subtitle = hasSubtitle ? <div className="subtitle">{option.subtitle}</div> : null;

    return (
      <div className={"option-row" + (hasSubtitle ? " with-subtitle" : "")} onClick={onSelect}>
        <div className="icon" style={iconStyle}/>
        <div className="text">
          <div className="title">{option.label}</div>
          {subtitle}
        </div>
      </div>
    );
  }
}