import React from "react";

export default class TextField extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange, onFocus, onBlur, onKeyDown, onClearClick, shouldShowSpinner } = this.props;

    const clearIconClassName = "clear-icon" + (shouldShowSpinner || value === "" ? " fade" : "");
    const spinnerIconClassName = "spinner-icon"+ (shouldShowSpinner ? "" : " fade");

    return (
      <div className="text-field-container">
        <input  className="text-field"
                type="text"
                placeholder="Search"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}/>
        <div className={spinnerIconClassName}></div>
        <button className={clearIconClassName} onClick={onClearClick}></button>
      </div>
    );
  }
}