import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Rect from "@reach/rect";

class Portal extends Component {
  state = {
    mounted: false
  };

  componentDidMount() {
    this.node = document.createElement("div");
    document.body.appendChild(this.node);
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  render() {
    return this.state.mounted
      ? createPortal(this.props.children, this.node)
      : null;
  }
}

class Select extends Component {
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
      <Rect>
        {({ rect, ref }) => (
          <div onClick={this.handleToggle} className="select">
            <button ref={ref} className="label">
              {label} <span className="arrow">▾</span>
            </button>
            {isOpen && (
              <Portal>
                <ul
                  style={{
                    position: "absolute",
                    top: rect.top,
                    left: rect.left
                  }}
                  className="options"
                >
                  {children}
                </ul>
              </Portal>
            )}
          </div>
        )}
      </Rect>
    );
  }
}

class Option extends Component {
  render() {
    return (
      <li className="option" onClick={this.props.onSelect}>
        {this.props.children}
      </li>
    );
  }
}

class App extends Component {
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
