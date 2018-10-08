import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  render() {
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {this.props.children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    const isActive = false; // <-- should come from somewhere
    const className = "radio-button " + (isActive ? "active" : "");
    return <button className={className}>{this.props.children}</button>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup legend="Radio Group">
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
