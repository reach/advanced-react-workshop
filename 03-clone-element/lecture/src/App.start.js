import React, { Component } from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./lib/text";

class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    const { data } = this.props;
    return (
      <div className="Tabs">
        <div className="tabs">
          {data.map((tab, index) => {
            const isActive = index === this.state.activeIndex;
            return (
              <div
                key={index}
                className={isActive ? "tab active" : "tab"}
                onClick={() => this.selectTabIndex(index)}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
        <div className="panels">{data[this.state.activeIndex].content}</div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const tabData = [
      {
        label: <FaAutomobile />,
        content: text.cars
      },
      {
        label: <FaBed />,
        content: text.hotels
      },
      {
        label: <FaPlane />,
        content: text.flights
      },
      {
        label: <FaSpaceShuttle />,
        content: text.space
      }
    ];
    return (
      <div className="App">
        <Tabs data={tabData} />
      </div>
    );
  }
}

export default App;
