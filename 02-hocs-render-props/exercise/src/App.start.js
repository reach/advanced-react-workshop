import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";

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
      <div>
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </div>
    );
  }
}

export default App;
