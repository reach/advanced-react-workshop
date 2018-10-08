import React, {
  Component,
  createContext
} from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./lib/text";

let TabsContext = createContext();

class Tabs extends Component {
  state = {
    activeIndex: 0,
    selectTabIndex: activeIndex => {
      this.setState({ activeIndex });
    }
  };

  render() {
    return (
      <TabsContext.Provider value={this.state}>
        <div className="Tabs">
          {this.props.children}
        </div>
      </TabsContext.Provider>
    );
  }
}

let TabList = props => {
  return (
    <TabsContext.Consumer>
      {context => {
        let children = React.Children.map(
          props.children,
          (child, index) => {
            return React.cloneElement(child, {
              isActive: index === context.activeIndex,
              onActivate: () =>
                context.selectTabIndex(index)
            });
          }
        );
        return <div className="tabs">{children}</div>;
      }}
    </TabsContext.Consumer>
  );
};

let Tab = props => {
  const isDisabled = props.isDisabled;
  const isActive = props.isActive;
  return (
    <div
      className={
        isDisabled
          ? "tab disabled"
          : isActive ? "tab active" : "tab"
      }
      onClick={
        isDisabled ? undefined : props.onActivate
      }
    >
      {props.children}
    </div>
  );
};

let TabPanels = props => {
  return (
    <TabsContext.Consumer>
      {context => (
        <div className="panels">
          {props.children[context.activeIndex]}
        </div>
      )}
    </TabsContext.Consumer>
  );
};

let TabPanel = props => props.children;

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
            <TabPanel>
              <Tabs>
                <TabList>
                  <Tab>
                    <FaAutomobile />
                  </Tab>
                  <Tab isDisabled>
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
            </TabPanel>
            <TabPanel>{text.flights}</TabPanel>
            <TabPanel>{text.space}</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
