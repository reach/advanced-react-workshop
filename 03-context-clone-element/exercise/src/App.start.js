/*

Make this component work like a normal <select><option/></select>.

1. Get the label to display correctly.

Tips:
- You can use React.Children.map or React.Children.forEach to iterate over
  the children to find the child with a value that matches the value in state.
- the `child` is an object you can inspect, like `child.props.value` and
  `child.props.children`

2. When you click the button the menu should open

3. When you click an option the component should close and update the value in
   state

*/

import React from "react";

class Select extends React.Component {
  state = {
    isOpen: false,
    value: this.props.defaultValue
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div className="select">
        <button className="label">
          label <span className="arrow">▾</span>
        </button>
        {isOpen && <ul className="options">{this.props.children}</ul>}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li className="option">{this.props.children}</li>;
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({
      selectValue: "mint-chutney"
    });
  };

  render() {
    return (
      <div className="app">
        <div className="block">
          <h2>Select / Option</h2>
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
