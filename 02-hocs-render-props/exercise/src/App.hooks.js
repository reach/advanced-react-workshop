import React, { useState, useEffect } from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";

const media = createMediaListener({
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
});

// <Media query="...">

// </Media>

class Media extends React.Component {
  // static propTypes = {
  //   query: PropTypes.string.isRequired
  // };

  state = { media: media.getState() };

  componentDidMount() {
    media.listen(media => this.setState({ media }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      // query prop changed!
      // time to teardown the old listener and setup
      // the new listener
    }
  }

  componentWillUnmount() {
    media.dispose();
  }

  render() {
    return this.props.children(this.state.media);
  }
}

function useMedia(query) {
  const [mediaState, updateMedia] = useState(true);

  useEffect(
    () => {
      // componentDidMount or componentDidUpdate
      const match = window.matchMedia(query);

      function handleMatchChange() {
        updateMedia(match.matches);
      }

      handleMatchChange();

      match.addListener(handleMatchChange);

      return () => {
        // componentWillUnmount
        match.removeListener(handleMatchChange);
      };
    },
    [query]
  );

  return mediaState;
}

function App() {
  const [flipped, setFlipped] = useState(false);

  const bigQuery = "(min-width: 1000px)";
  const smallQuery = "(max-width: 600px)";

  const big = useMedia(flipped ? smallQuery : bigQuery);
  const small = useMedia(flipped ? bigQuery : smallQuery);

  return (
    <div>
      <button
        onClick={() => setFlipped(!flipped)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: Number.MAX_SAFE_INTEGER
        }}
      >
        {flipped
          ? "Restore everything to normal, I feel sick"
          : "Flip the universe on its head"}
      </button>

      {big ? (
        <Galaxy key="galaxy" />
      ) : small ? (
        <Trees />
      ) : (
        <Earth key="earth" />
      )}
    </div>
  );
}

export default App;
