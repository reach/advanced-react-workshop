/*

Follow the WAI ARIA Radio Group example at:
https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html

- Turn the span into a button to get keyboard and focus events
- Use tabIndex to allow only the active button to be tabbable
- Use left/right arrows to select the next/previous radio button
  - Tip: you can figure out the next value with React.Children.forEach(fn),
    or React.Children.toArray(children).reduce(fn)
- Move the focus in cDU to the newly selected item
  - Tip: do it in RadioOption not RadioGroup
  - Tip: you'll need a ref
- Add the aria attributes
  - radiogroup
  - radio
  - aria-checked
  - aria-label on the icons

*/
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  state = {
    value: this.props.defaultValue
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isActive: child.props.value === this.state.value,
        onSelect: () => this.setState({ value: child.props.value })
      });
    });
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    const { isActive, onSelect } = this.props;
    const className = "radio-button " + (isActive ? "active" : "");
    return (
      <span className={className} onClick={onSelect}>
        {this.props.children}
      </span>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue="pause" legend="Radio Group">
          <RadioButton value="back">
            <FaBackward />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
