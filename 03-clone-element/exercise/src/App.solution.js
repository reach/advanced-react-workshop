import React, { useState } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

function RadioGroup({ defaultValue, legend, children }) {
  const [value, setValue] = useState(defaultValue);
  const clones = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isActive: child.props.value === value,
      onSelect: () => setValue(child.props.value)
    });
  });
  return (
    <fieldset className="radio-group">
      <legend>{legend}</legend>
      {clones}
    </fieldset>
  );
}

function RadioButton({ onSelect, isActive, children }) {
  const className = "radio-button " + (isActive ? "active" : "");
  return (
    <button onClick={onSelect} className={className}>
      {children}
    </button>
  );
}

function App() {
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

export default App;
