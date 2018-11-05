import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";

const withMedia = queries => Comp => {
  const media = createMediaListener(queries);

  return class WithMedia extends React.Component {
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
      return <Comp {...this.state} />;
    }
  };
};

class App extends React.Component {
  render() {
    const { media } = this.props;

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

const AppWithMedia = withMedia({
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
})(App);

export default AppWithMedia;
