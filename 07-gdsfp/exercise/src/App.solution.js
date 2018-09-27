import React, { Component } from "react";

const getQuote = () => {
  return 30 + Math.random() * 10;
};

class App extends Component {
  state = {
    price: getQuote()
  };

  componentDidMount() {
    setInterval(this.fetch, 2000);
  }

  fetch = async () => {
    this.setState({ price: getQuote() });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Stock Price</h1>
        <PriceDisplay price={this.state.price} />
      </div>
    );
  }
}

class PriceDisplay extends React.Component {
  state = {
    price: this.props.price,
    direction: "initial"
  };

  static getDerivedStateFromProps(props, state, more) {
    if (props.price > state.price) {
      return {
        price: props.price,
        direction: "up"
      };
    } else if (props.price < state.price) {
      return {
        price: props.price,
        direction: "down"
      };
    }
    return null;
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          boxShadow: "inset 0 0 10px #000000",
          borderRadius: 10,
          fontSize: 50,
          background: "#454545",
          width: 300,
          padding: 20,
          color:
            this.state.direction === "down"
              ? "red"
              : this.state.direction === "up" ? "lawngreen" : "#ccc"
        }}
      >
        <span>
          {this.state.direction === "up" && "▲"}
          {this.state.direction === "down" && "▼"}
        </span>
        <span style={{ fontFamily: "monospace" }}>
          {this.props.price.toFixed(2)}
        </span>
      </div>
    );
  }
}

export default App;
