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
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        onSelectTab: this.selectTabIndex
      });
    });
    return <div className="Tabs">{children}</div>;
  }
}

class TabList extends Component {
  render() {
    const { activeIndex } = this.props;
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.props.onSelectTab(index)
      });
    });
    return <div className="tabs">{children}</div>;
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props;
    return (
      <div
        className={
          isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  render() {
    const { activeIndex, children } = this.props;
    return <div className="panels">{children[activeIndex]}</div>;
  }
}

class TabPanel extends Component {
  render() {
    return this.props.children;
  }
}

class DataTabs extends Component {
  render() {
    const { data } = this.props;
    return (
      <Tabs>
        <TabList>
          {data.map((tab, index) => <Tab key={index}>{tab.label}</Tab>)}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>
              <FaAutomobile />
            </Tab>
            <Tab>
              <FaBed />
            </Tab>
            <Tab>
              <FaPlane />
            </Tab>
            <Tab>
              <FaSpaceShuttle />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{text.cars}</TabPanel>
            <TabPanel>{text.hotels}</TabPanel>
            <TabPanel>{text.flights}</TabPanel>
            <TabPanel>{text.space}</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
