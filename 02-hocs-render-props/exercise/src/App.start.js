import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const media = createMediaListener({
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
});

class App extends React.Component {
  state = {
    media: media.getState()
  };

  componentDidMount() {
    media.listen(media => this.setState({ media }));
  }

  componentWillUnmount() {
    media.dispose();
  }

  render() {
    const { media } = this.state;

    return (
      <TransitionGroup>
        <div>
          <CSSTransition
            in={media.big}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <Galaxy key="galaxy" />
          </CSSTransition>
          <CSSTransition
            in={media.tiny}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <Trees key="trees" />
          </CSSTransition>
          <CSSTransition
            in={!media.big && !media.tiny}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <Earth key="earth" />
          </CSSTransition>
        </div>
      </TransitionGroup>
    );
  }
}

export default App;
