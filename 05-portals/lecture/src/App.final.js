import React from "react";
import { createPortal } from "react-dom";

let portalNode = document.createElement("div");
document.body.appendChild(portalNode);

class Dialog extends React.Component {
  render() {
    return createPortal(
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          background: "hsla(0, 0%, 0%, 0.5)"
        }}
      >
        <div
          style={{
            background: "white",
            border: "solid 1px #000",
            margin: "auto",
            position: "absolute",
            left: 0,
            right: 0,
            top: 50,
            width: "600px",
            padding: 20
          }}
        >
          {this.props.children}
        </div>
      </div>,
      portalNode
    );
  }
}

let bustthisstuff = {
  height: "300px",
  overflow: "hidden",
  position: "absolute"
};

class App extends React.Component {
  state = {
    showDialog: false
  };

  render() {
    return (
      <div style={bustthisstuff}>
        <h1>Would you like a banana cream pie?!</h1>
        <button
          onClick={() => {
            this.setState({ showDialog: true });
          }}
        >
          YES
        </button>
        {this.state.showDialog && (
          <Dialog>
            <h2>Banana Cream Pie Delivery</h2>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.setState({ showDialog: false });
              }}
            >
              <p>
                <label>
                  Name: <input />
                </label>
              </p>
              <p>
                <label>
                  Address: <input />
                </label>
              </p>
              <p>
                <button type="submit">Send it!</button>
              </p>
            </form>
          </Dialog>
        )}
      </div>
    );
  }
}

export default App;
