import React, { Component } from "react";
import Alert from "@reach/alert";

let sleep = ms => new Promise(res => setTimeout(res, ms));

let subscribeEmail = email =>
  new Promise(async resolve => {
    console.log("subscribing", email);
    await sleep(4000);
    console.log("subscribed!");
    resolve();
  });

class App extends Component {
  state = {
    state: "idle" // "subscribing", "subscribed"
  };

  inputRef = React.createRef();

  contentRef = React.createRef();

  getSnapshotBeforeUpdate() {
    return document.activeElement !== this.contentRef.current;
  }

  componentDidUpdate(prevProps, prevState, userMovedFocus) {
    if (prevState.state === "idle" && this.state.state === "subscribing") {
      this.contentRef.current.focus();
    } else if (
      !userMovedFocus &&
      prevState.state === "subscribed" &&
      this.state.state === "idle"
    ) {
      this.inputRef.current.focus();
    }
  }

  render() {
    let { state } = this.state;
    return (
      <div className="app">
        <div>
          <p>Subscribe to our mailing list!</p>
          {state === "idle" ? (
            <form
              onSubmit={async event => {
                event.preventDefault();
                this.setState({ state: "subscribing" });
                await subscribeEmail(this.inputRef.current.value);
                this.setState({ state: "subscribed" });
                await sleep(5000);
                this.setState({ state: "idle" });
              }}
            >
              <input
                aria-label="Email"
                placeholder="you@example.com"
                ref={this.inputRef}
              />{" "}
              <button>Subscribe</button>
            </form>
          ) : (
            <div ref={this.contentRef} tabIndex="-1">
              {state === "subscribing" ? (
                <Alert>Subscribing ...</Alert>
              ) : state === "subscribed" ? (
                <Alert>You're subscribed, thanks!</Alert>
              ) : null}
            </div>
          )}
        </div>

        <hr />

        <p>Here's some other stuff on the page</p>
        <button>I am a button</button>
        <button>I am another</button>
      </div>
    );
  }
}

export default App;
