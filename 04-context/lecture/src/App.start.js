import React, { useState } from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./lib/text";

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const clones = React.Children.map(children, child => {
    return React.cloneElement(child, {
      activeIndex,
      onSelectTab: setActiveIndex
    });
  });
  return <div className="Tabs">{clones}</div>;
}

function TabList({ activeIndex, onSelectTab, children }) {
  const clones = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onSelect: () => onSelectTab(index)
    });
  });
  return <div className="tabs">{clones}</div>;
}

function Tab({ isActive, isDisabled, onSelect, children }) {
  return (
    <div
      className={isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"}
      onClick={isDisabled ? null : onSelect}
    >
      {children}
    </div>
  );
}

function TabPanels({ activeIndex, children }) {
  return <div className="panels">{children[activeIndex]}</div>;
}

function TabPanel({ children }) {
  return children;
}

function App() {
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

export default App;
