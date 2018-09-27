import React, { Component } from "react";
import subscribeToMessages from "./lib/messages";
import FadeIn from "./lib/FadeIn";

class PinScrollToBottom extends Component {
  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate(prevProps, prevState, atBottom) {
    if (atBottom) {
      this.scroll();
    }
  }

  scroll() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }

  getSnapshotBeforeUpdate() {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const atBottom = scrollHeight < scrollTop + clientHeight + 20;
    return atBottom;
  }

  render() {
    return this.props.children;
  }
}

class App extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="app">
        <div className="link">
          <a href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k">
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: `url(${message.avatar})`
                    }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }
}

export default App;
