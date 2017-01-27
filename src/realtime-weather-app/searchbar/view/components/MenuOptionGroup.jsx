import React from "react";

export default class MenuOptionGroup extends React.Component {

  constructor(props) {
    super(props);

    this._showingState = {
      collapsed: 0,
      expanding: 1,
      expanded: 2,
      collapsing: 3
    };

    const showingState = props.shouldBeExpanded ? this._showingState.expanded : this._showingState.collapsed;

    this.state = {
      showingState: showingState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldBeExpanded) {
      if (this.state.showingState === this._showingState.collapsed) {
        this.setState({ showingState: this._showingState.expanding });
        this.props.onExpandStartCallback();
      }
    }
    else if (this.state.showingState === this._showingState.expanded) {
      this.setState({
        showingState: this._showingState.collapsing
      });
    }
  }

  componentDidUpdate() {
    if (!this.toggleButton) { return; }
    const { showingState } = this.state;
    if (showingState === this._showingState.expanding) {
      this.toggleButton.addEventListener("transitionend", () => {
        this.setState({ showingState: this._showingState.expanded });
      });
    }
    else if (showingState === this._showingState.collapsing) {
      this.toggleButton.addEventListener("transitionend", () => {
        this.setState({ showingState: this._showingState.collapsed });
        this.props.onCollapsedCallback();
      });
    }
  }

  _getOptionListContainer() {
    const { shouldBeExpanded, options, onOptionSelect } = this.props;
    const { showingState } = this.state;
    if (!shouldBeExpanded && showingState === this._showingState.collapsed) { return null; }
    
    let rowClassName = "option-row";
    if (showingState === this._showingState.expanding) {
      rowClassName += " row-expand";
    }
    else if (showingState === this._showingState.collapsing) {
      rowClassName += " row-collapse";
    }

    const iconUrl = "https://cdn-webgl.eegeo.com/eegeo-search/latest/assets/js/icon1_misc.png";
    const iconStyle = {
      backgroundImage: "url(" + iconUrl + ")"
    };
    const optionRows = options.map((option, optionIndex) => {
      return  <div  className={rowClassName}
                    key={optionIndex}
                    onClick={() => { onOptionSelect(option); }}>
                <div className="icon" style={iconStyle}/>
                <div className="text">{option.label}</div>
              </div>;
    });

    return <div className="option-list-container">{optionRows}</div>;
  }

  render() {
    const { title, shouldBeExpanded, onExpandCollapseToggleClick } = this.props;

    const toggleButtonClassName = "toggle-button" + (shouldBeExpanded ? " expanded" : " collapsed");
 
    return (
      <div className="menu-option-group">
        <div className="title-container" onClick={onExpandCollapseToggleClick}>
          <button className={toggleButtonClassName} ref={(node) => { this.toggleButton = node; }}/>
          <div className="title-text">{title}</div>
        </div>
        {this._getOptionListContainer()}
      </div>
    );
  }
}