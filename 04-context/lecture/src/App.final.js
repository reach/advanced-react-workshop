import React, { createContext, useState, useMemo, useContext } from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./lib/text";

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const context = useMemo(() => {
    return {
      activeIndex,
      onSelectTab: setActiveIndex
    };
  }, [activeIndex]);

  return (
    <TabsContext.Provider value={context}>
      <div className="Tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  const { activeIndex, onSelectTab } = useContext(TabsContext);
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

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext);
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
