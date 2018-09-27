/*

Have `Portal` create a new DOM element, append it to document.body and then
render its children into a portal.

You'll also want to use `<Rect>` to know the styles too apply to the menu to
display by the button using `rect.left` and `rect.top`. Check out the docs here
to know how to use it: https://ui.reach.tech/rect

*/

import React from "react";
import PropTypes from "prop-types";

class Portal extends React.Component {
  render() {
    return this.props.children;
  }
}

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = {
    value: this.props.defaultValue,
    isOpen: false
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  isControlled() {
    return this.props.value != null;
  }

  render() {
    const { isOpen } = this.state;
    let label;
    const children = React.Children.map(this.props.children, child => {
      const { value } = this.isControlled() ? this.props : this.state;
      if (child.props.value === value) {
        label = child.props.children;
      }

      return React.cloneElement(child, {
        onSelect: () => {
          if (this.isControlled()) {
            this.props.onChange(child.props.value);
          } else {
            this.setState({ value: child.props.value });
          }
        }
      });
    });

    return (
      <div onClick={this.handleToggle} className="select">
        <button className="label">
          {label} <span className="arrow">▾</span>
        </button>
        {isOpen && (
          <Portal>
            <ul className="options">{children}</ul>
          </Portal>
        )}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <li className="option" onClick={this.props.onSelect}>
        {this.props.children}
      </li>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="block">
          <h2>Portal Party</h2>
          <Select defaultValue="tikka-masala">
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default App;
