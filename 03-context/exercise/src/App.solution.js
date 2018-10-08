import React from "react";
import podcast from "./lib/podcast.mp4";
import mario from "./lib/mariobros.mp3";
import FaPause from "react-icons/lib/fa/pause";
import FaPlay from "react-icons/lib/fa/play";
import FaRepeat from "react-icons/lib/fa/repeat";
import FaRotateLeft from "react-icons/lib/fa/rotate-left";
import { object } from "prop-types";

class AudioPlayer extends React.Component {
  static childContextTypes = {
    audio: object
  };

  state = {
    isPlaying: false,
    duration: null,
    currentTime: 0,
    loaded: false
  };

  getChildContext() {
    return {
      audio: {
        ...this.state,
        setTime: time => {
          this.audio.currentTime = time;
        },
        jump: by => {
          this.audio.currentTime = this.audio.currentTime + by;
        },
        play: () => {
          this.setState({ isPlaying: true });
          this.audio.play();
        },
        pause: () => {
          this.setState({ isPlaying: false });
          this.audio.pause();
        }
      }
    };
  }

  handleTimeUpdate = e => {
    this.setState({
      currentTime: this.audio.currentTime,
      duration: this.audio.duration
    });
  };

  handleAudioLoaded = e => {
    this.setState({
      duration: this.audio.duration,
      loaded: true
    });
  };

  handleEnded = () => {
    this.setState({
      isPlaying: false
    });
  };

  render() {
    return (
      <div className="audio-player">
        <audio
          src={this.props.source}
          onTimeUpdate={this.handleTimeUpdate}
          onLoadedData={this.handleAudioLoaded}
          onEnded={this.handleEnded}
          ref={n => (this.audio = n)}
        />
        {this.props.children}
      </div>
    );
  }
}

class Play extends React.Component {
  static contextTypes = {
    audio: object
  };

  render() {
    return (
      <button
        className="icon-button"
        onClick={this.context.audio.play}
        disabled={this.context.audio.isPlaying}
        title="Play"
      >
        <FaPlay />
      </button>
    );
  }
}

class Pause extends React.Component {
  static contextTypes = {
    audio: object
  };

  render() {
    return (
      <button
        className="icon-button"
        onClick={this.context.audio.pause}
        disabled={!this.context.audio.isPlaying}
        title="Pause"
      >
        <FaPause />
      </button>
    );
  }
}

class PlayPause extends React.Component {
  static contextTypes = {
    audio: object
  };

  render() {
    const { isPlaying } = this.context.audio;
    return isPlaying ? <Pause /> : <Play />;
  }
}

class JumpForward extends React.Component {
  static contextTypes = {
    audio: object
  };

  render() {
    return (
      <button
        className="icon-button"
        onClick={() => this.context.audio.jump(10)}
        disabled={!this.context.audio.isPlaying}
        title="Forward 10 Seconds"
      >
        <FaRepeat />
      </button>
    );
  }
}

class JumpBack extends React.Component {
  static contextTypes = {
    audio: object
  };

  render() {
    return (
      <button
        className="icon-button"
        onClick={() => this.context.audio.jump(-10)}
        disabled={!this.context.audio.isPlaying}
        title="Back 10 Seconds"
      >
        <FaRotateLeft />
      </button>
    );
  }
}

class Progress extends React.Component {
  static contextTypes = {
    audio: object
  };

  handleClick = e => {
    const { audio } = this.context;
    const rect = this.node.getBoundingClientRect();
    const clientLeft = e.clientX;
    const relativeLeft = clientLeft - rect.left;
    audio.setTime(relativeLeft / rect.width * audio.duration);
  };

  render() {
    const { loaded, duration, currentTime } = this.context.audio;

    return (
      <div
        className="progress"
        ref={n => (this.node = n)}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <div
          className="progress-bar"
          style={{
            width: loaded ? `${currentTime / duration * 100}%` : "0%"
          }}
        />
      </div>
    );
  }
}

const Exercise = () => (
  <div className="exercise">
    <AudioPlayer source={mario}>
      <Play /> <Pause /> Mario Bros. Remix
      <Progress />
    </AudioPlayer>

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward /> Workshop.me Podcast Episode 02
      <Progress />
    </AudioPlayer>
  </div>
);

export default Exercise;
