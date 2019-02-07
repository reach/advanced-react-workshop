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
audioRef.current.play()
audioRef.current.pause()

// change the current time
audioRef.current.currentTime = audio.currentTime + 10
audioRef.current.currentTime = audio.currentTime - 30

// know the duration
audioRef.current.duration

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

import React, { useState, useMemo, useRef, useContext } from "react";
import podcast from "./lib/podcast.mp4";
import mario from "./lib/mariobros.mp3";
import FaPause from "react-icons/lib/fa/pause";
import FaPlay from "react-icons/lib/fa/play";
import FaRepeat from "react-icons/lib/fa/repeat";
import FaRotateLeft from "react-icons/lib/fa/rotate-left";

const AudioContext = React.createContext();

function AudioPlayer({ source, children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef(null);

  const context = useMemo(() => {
    return {
      isPlaying,
      duration,
      currentTime,
      loaded,
      play: () => {
        audioRef.current.play();
        setIsPlaying(true);
      },
      pause: () => {
        audioRef.current.pause();
        setIsPlaying(false);
      },
      setTime: time => {
        audioRef.current.currentTime = time;
      },
      jump: by => {
        audioRef.current.currentTime = audioRef.current.currentTime + by;
      }
    };
  }, [isPlaying, duration, currentTime, loaded]);

  return (
    <AudioContext.Provider value={context}>
      <div className="audio-player">
        <audio
          src={source}
          onTimeUpdate={() => {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
          }}
          onLoadedData={() => {
            setDuration(audioRef.current.duration);
            setLoaded(true);
          }}
          onEnded={() => {
            setIsPlaying(false);
          }}
          ref={audioRef}
        />
        {children}
      </div>
    </AudioContext.Provider>
  );
}

function Play() {
  const context = useContext(AudioContext);
  return (
    <button
      className="icon-button"
      onClick={context.play}
      disabled={context.isPlaying}
      title="play"
    >
      <FaPlay />
    </button>
  );
}

function Pause() {
  const context = useContext(AudioContext);
  return (
    <button
      className="icon-button"
      onClick={context.pause}
      disabled={!context.isPlaying}
      title="pause"
    >
      <FaPause />
    </button>
  );
}

function PlayPause() {
  const context = useContext(AudioContext);
  return context.isPlaying ? <Pause /> : <Play />;
}

function JumpForward() {
  const context = useContext(AudioContext);
  return (
    <button
      className="icon-button"
      onClick={() => context.jump(10)}
      disabled={null}
      title="Forward 10 Seconds"
    >
      <FaRepeat />
    </button>
  );
}

function JumpBack() {
  const context = useContext(AudioContext);
  return (
    <button
      className="icon-button"
      onClick={() => context.jump(-10)}
      disabled={null}
      title="Back 10 Seconds"
    >
      <FaRotateLeft />
    </button>
  );
}

function Progress() {
  let ref = useRef(null);
  let { loaded, duration, currentTime, setTime } = useContext(AudioContext);

  return (
    <div
      className="progress"
      ref={ref}
      onClick={event => {
        let rect = ref.current.getBoundingClientRect();
        let clientLeft = event.clientX;
        let relativeLeft = clientLeft - rect.left;
        setTime((relativeLeft / rect.width) * duration);
      }}
    >
      <div
        className="progress-bar"
        style={{
          width: loaded ? `${(currentTime / duration) * 100}%` : "0%"
        }}
      />
    </div>
  );
}

function App() {
  return (
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
}

export default App;
