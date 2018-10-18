/*
- Make the Play button work
- Make the Pause button work
- Disable the play button if it's playing
- Disable the pause button if it's not playing
- Make the PlayPause button work
- Make the JumpForward button work
- Make the JumpBack button work
- Make the progress bar work
  - change the width of the inner element to the percentage of the played track
  - add a click handler on the progress bar to jump to the clicked spot

Here is the audio API you'll need to use, `audio` is the <audio/> dom nod
instance, you can access it as `this.audio` in `AudioPlayer`

```js
// play/pause
audio.play()
audio.pause()

// change the current time
audio.currentTime = audio.currentTime + 10
audio.currentTime = audio.currentTime - 30

// know the duration
audio.duration

// values to calculate relative mouse click position
// on the progress bar
event.clientX // left position *from window* of mouse click
let rect = node.getBoundingClientRect()
rect.left // left position *of node from window*
rect.width // width of node
```

Other notes about the `<audio/>` tag:

- You can't know the duration until `onLoadedData`
- `onTimeUpdate` is fired when the currentTime changes
- `onEnded` is called when the track plays through to the end and is no
  longer playing

Good luck!
*/

import React from "react";
import podcast from "./lib/podcast.mp4";
import mario from "./lib/mariobros.mp3";
import FaPause from "react-icons/lib/fa/pause";
import FaPlay from "react-icons/lib/fa/play";
import FaRepeat from "react-icons/lib/fa/repeat";
import FaRotateLeft from "react-icons/lib/fa/rotate-left";

let AudioContext = React.createContext();

class AudioPlayer extends React.Component {
  state = {
    isPlaying: false,
    duration: null,
    currentTime: 0,
    loaded: false,
    play: () => {
      this.audio.play();
      this.setState({ isPlaying: true });
    },
    pause: () => {
      this.audio.pause();
      this.setState({ isPlaying: false });
    },
    setTime: time => {
      this.audio.currentTime = time;
    },
    jump: by => {
      this.audio.currentTime = this.audio.currentTime + by;
    }
  };

  render() {
    return (
      <AudioContext.Provider value={this.state}>
        <div className="audio-player">
          <audio
            src={this.props.source}
            onTimeUpdate={() => {
              this.setState({
                currentTime: this.audio.currentTime,
                duration: this.audio.duration
              });
            }}
            onLoadedData={() => {
              this.setState({
                duration: this.audio.duration,
                loaded: true
              });
            }}
            onEnded={() => {
              this.setState({
                isPlaying: false
              });
            }}
            ref={n => (this.audio = n)}
          />
          {this.props.children}
        </div>
      </AudioContext.Provider>
    );
  }
}

class Play extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={context.play}
            disabled={context.isPlaying}
            title="play"
          >
            <FaPlay />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class Pause extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={context.pause}
            disabled={!context.isPlaying}
            title="pause"
          >
            <FaPause />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class PlayPause extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (context.isPlaying ? <Pause /> : <Play />)}
      </AudioContext.Consumer>
    );
  }
}

class JumpForward extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={() => context.jump(10)}
            disabled={null}
            title="Forward 10 Seconds"
          >
            <FaRepeat />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class JumpBack extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={() => context.jump(-10)}
            disabled={null}
            title="Back 10 Seconds"
          >
            <FaRotateLeft />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class Progress extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => {
          let { loaded, duration, currentTime, setTime } = context;

          return (
            <div
              className="progress"
              ref={n => (this.node = n)}
              onClick={event => {
                let rect = this.node.getBoundingClientRect();
                let clientLeft = event.clientX;
                let relativeLeft = clientLeft - rect.left;
                setTime(relativeLeft / rect.width * duration);
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: loaded ? `${currentTime / duration * 100}%` : "0%"
                }}
              />
            </div>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

let Exercise = () => (
  <div className="exercise">
    <AudioPlayer source={mario}>
      <PlayPause /> <span className="player-text">Mario Bros. Remix</span>
      <Progress />
    </AudioPlayer>

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward />{" "}
      <span className="player-text">Workshop.me Podcast Episode 02</span>
      <Progress />
    </AudioPlayer>
  </div>
);

export default Exercise;
