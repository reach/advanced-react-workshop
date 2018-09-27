import React from "react";
import createOscillator from "./lib/createOscillator";
import SineWave from "./lib/SineWave";

class Tone extends React.Component {
  oscillator = createOscillator();

  componentDidMount() {
    this.doImperativeStuff();
  }

  componentDidUpdate() {
    this.doImperativeStuff();
  }

  doImperativeStuff() {
    const { isPlaying, pitch, volume } = this.props;
    if (isPlaying) {
      this.oscillator.play();
    } else {
      this.oscillator.stop();
    }
    this.oscillator.setPitchBend(pitch);
    this.oscillator.setVolume(volume);
  }

  render() {
    return null;
  }
}

class App extends React.Component {
  state = {
    isPlaying: false,
    pitch: 0,
    volume: 0
  };

  play = () => {
    this.setState({ isPlaying: true });
  };

  stop = () => {
    this.setState({ isPlaying: false });
  };

  changeTone = event => {
    const { clientX, clientY } = event;
    const { top, right, bottom, left } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    this.setState({ pitch, volume });
  };

  render() {
    return (
      <div className="App">
        <div
          className="theremin"
          onMouseEnter={this.play}
          onMouseLeave={this.stop}
          onMouseMove={this.changeTone}
        >
          <SineWave
            width="400px"
            height="400px"
            amplitude={this.state.volume}
            frequency={this.state.pitch}
            draw={this.state.isPlaying}
          />
          <Tone
            isPlaying={this.state.isPlaying}
            pitch={this.state.pitch}
            volume={this.state.volume}
          />
        </div>
        <div className="label pitch">◀︎ Pitch ▶︎</div>
        <div className="label volume">◀︎ Volume ▶︎</div>
      </div>
    );
  }
}

export default App;
