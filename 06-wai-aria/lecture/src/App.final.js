/*

Have `Portal` create a new DOM element, append it to document.body and then
render its children into a portal. We want to have portal create the new dom
node when it mounts, and remove it when it unmounts.

Tips:

- in componentDidMount, create a new dom node and append it to the body
  - `document.createElement('div')`
  - `document.body.append(node)`
- in componentWillUnmount, remove the node from the body with
  `document.body.removeChild(node)`

Finally, the menu will be rendered out of DOM context so the styles will be all
wrong, you'll need to provide a `style` prop with fixed position and left/top
values.  To help out, we've imported `Rect`. Go check the docs for Rect
(https://ui.reach.tech/rect) and then use it to put the menu by the button.

*/

import React from "react";
import Rect from "@reach/rect";

function findIndexFromValue(children, value) {
  let index = -1;
  React.Children.forEach(children, (child, childIndex) => {
    if (child.props.value === value) {
      index = childIndex;
    }
  });
  return index;
}

function findValueFromIndex(children, index) {
  return React.Children.toArray(children).reduce(
    (nextValue, child, childIndex) => {
      if (index === childIndex) {
        return child.props.value;
      }
      return nextValue;
    },
    null
  );
}

class Select extends React.Component {
  state = {
    value: this.props.defaultValue,
    highlightedIndex: findIndexFromValue(
      this.props.children,
      this.props.defaultValue
    ),
    isOpen: false
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isOpen && this.state.isOpen) {
      this.listRef.focus();
    } else if (prevState.isOpen && !this.state.isOpen) {
      this.buttonRef.focus();
    }
  }

  render() {
    const { isOpen, value, highlightedIndex } = this.state;
    let label;
    let activeDescendantId;

    const children = React.Children.map(this.props.children, (child, index) => {
      let isHighlighted = index === highlightedIndex;

      if (isHighlighted) {
        activeDescendantId = child.props.value;
      }

      if (child.props.value === value) {
        label = child.props.children;
      }

      return React.cloneElement(child, {
        isHighlighted: isHighlighted,
        onSelect: () => {
          this.setState({ value: child.props.value });
        }
      });
    });

    return (
      <Rect>
        {({ ref, rect }) => (
          <div className="select">
            <button
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              ref={node => {
                ref(node);
                this.buttonRef = node;
              }}
              onClick={this.handleToggle}
              className="label"
            >
              {label}{" "}
              <span aria-hidden="true" className="arrow">
                ▾
              </span>
            </button>
            {isOpen && (
              <ul
                role="listbox"
                tabIndex="-1"
                aria-activedescendant={activeDescendantId}
                onKeyDown={event => {
                  if (event.key === "Escape") {
                    this.setState({ isOpen: false });
                  } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    let childCount = React.Children.count(this.props.children);
                    if (highlightedIndex !== childCount - 1) {
                      this.setState({
                        highlightedIndex: highlightedIndex + 1
                      });
                    }
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (highlightedIndex !== 0) {
                      this.setState({
                        highlightedIndex: highlightedIndex - 1
                      });
                    }
                  } else if (event.key === "Enter") {
                    event.preventDefault();
                    this.setState({
                      isOpen: false,
                      value: findValueFromIndex(
                        this.props.children,
                        highlightedIndex
                      )
                    });
                  }
                }}
                ref={node => {
                  this.listRef = node;
                }}
                style={{
                  position: "fixed",
                  top: rect.top,
                  left: rect.left
                }}
                className="options"
              >
                {children}
              </ul>
            )}
          </div>
        )}
      </Rect>
    );
  }
}

class Option extends React.Component {
  render() {
    let { isHighlighted } = this.props;
    return (
      <li
        role="option"
        aria-selected={isHighlighted}
        className={isHighlighted ? "option highlighted" : "option"}
        onClick={this.props.onSelect}
      >
        {this.props.children}
      </li>
    );
  }
}

class App extends React.Component {
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
