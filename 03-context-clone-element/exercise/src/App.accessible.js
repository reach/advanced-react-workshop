/* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex  */
/* eslint-disable jsx-a11y/role-has-required-aria-props  */
/* eslint-disable react/no-direct-mutation-state  */
import "./index.css";
import React from "react";
import PropTypes from "prop-types";

const findSelectionIndex = (children, value) => {
  let preSelectionIndex = -1;
  React.Children.forEach(children, (child, index) => {
    if (child.props.value === value) {
      preSelectionIndex = index;
    }
  });
  return preSelectionIndex;
};

const findValueFromIndex = (children, preSelectionIndex) => {
  let value;
  React.Children.forEach(children, (child, index) => {
    if (index === preSelectionIndex) {
      value = child.props.value;
    }
  });
  return value;
};

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = {
    value: this.props.defaultValue,
    isOpen: false,
    preSelectionIndex: findSelectionIndex(
      this.props.children,
      this.props.defaultValue
    ),
    refs: {
      list: null,
      button: null
    }
  };

  rootId = Math.random()
    .toString(32)
    .substr(2, 8);

  open = index => {
    this.setState({
      isOpen: true,
      preSelectionIndex:
        index != null
          ? index
          : findSelectionIndex(
              this.props.children,
              this.isControlled() ? this.props.value : this.state.value
            )
    });
  };

  isControlled() {
    return this.props.value != null;
  }

  handleListBlur = () => {
    this.setState({ isOpen: false });
  };

  handleButtonKeyDown = event => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      this.open();
    }
  };

  handleListKeyDown = event => {
    const prevent = ["Tab", "ArrowDown", "ArrowUp"];

    if (prevent.includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === "ArrowDown") {
      const { preSelectionIndex } = this.state;
      const { children } = this.props;
      let nextIndex = preSelectionIndex + 1;
      if (nextIndex < React.Children.count(children)) {
        this.setState({ preSelectionIndex: nextIndex });
      }
    }

    if (event.key === "ArrowUp") {
      const { preSelectionIndex } = this.state;
      let nextIndex = preSelectionIndex - 1;
      if (nextIndex !== -1) {
        this.setState({ preSelectionIndex: nextIndex });
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      this.selectAndClose();
    }

    if (event.key === "Escape") {
      this.setState({ isOpen: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen && !this.state.isOpen) {
      this.state.refs.button.focus();
    } else if (this.state.isOpen && !prevState.isOpen) {
      this.state.refs.list.focus();
    }
  }

  selectAndClose = () => {
    const { preSelectionIndex } = this.state;
    const value = findValueFromIndex(this.props.children, preSelectionIndex);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({
      value: this.isControlled() ? undefined : value,
      isOpen: false
    });
  };

  render() {
    const { labelledby } = this.props;
    const { isOpen, preSelectionIndex } = this.state;
    const { rootId } = this;
    let label;
    let activedescendant;
    const children = React.Children.map(this.props.children, (child, index) => {
      // side effect in a map
      const { value } = this.isControlled() ? this.props : this.state;
      const id = child.props.id || `${rootId}-${index}`;
      const isSelected = child.props.value === value;
      const isSelectionIndex = index === preSelectionIndex;

      if (isSelected) {
        label = child.props.children;
      }

      if (isSelectionIndex) {
        activedescendant = id;
      }

      return React.cloneElement(child, {
        id,
        isSelected,
        isSelectionIndex,
        onPreSelect: () => {
          if (!isSelectionIndex) {
            this.setState({ preSelectionIndex: index })
          }
        },
        onSelect: this.selectAndClose
      });
    });

    return (
      <div className="select">
        <button
          ref={n => (this.state.refs.button = n)}
          className="label"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-labelledby={labelledby}
          onClick={() => {
            // don't like the flash when the mouseMove hits on click,
            // so we send 0 in
            this.open(0);
          }}
          onKeyDown={this.handleButtonKeyDown}
        >
          {label}
          <span className="arrow" aria-hidden="true">
            {" "}
            ▾
          </span>
        </button>
        <ul
          ref={n => (this.state.refs.list = n)}
          className={["options", isOpen ? "" : "is-closed"].join(" ")}
          role="listbox"
          tabIndex="-1"
          aria-labelledby={labelledby}
          aria-activedescendant={activedescendant}
          onBlur={this.handleListBlur}
          onKeyDown={this.handleListKeyDown}
        >
          {children}
        </ul>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    const {
      id,
      isSelected,
      isSelectionIndex,
      onSelect,
      onPreSelect
    } = this.props;
    return (
      <li
        role="option"
        id={id}
        className={[
          "option",
          isSelected ? "selected" : "",
          isSelectionIndex ? "pre-selection" : ""
        ].join(" ")}
        onClick={onSelect}
        onMouseMove={
          // mouseMove instead of mouseEnter so switching from
          // keyboard to mouse works w/o having to leave and enter
          // the element to trigger selection
          onPreSelect
        }
      >
        {this.props.children}
      </li>
    );
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
          <h2 id="uncontrolled">Uncontrolled</h2>
          <Select defaultValue="tikka-masala" labelledby="uncontrolled">
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>

        <div className="block">
          <h2 id="controlled">Controlled</h2>
          <p>
            <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
          </p>
          <Select
            value={this.state.selectValue}
            labelledby="controlled"
            onChange={selectValue => {
              this.setState({ selectValue });
            }}
          >
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
