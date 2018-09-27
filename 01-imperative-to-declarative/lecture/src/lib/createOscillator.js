class Oscillator {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.start(0);
    this.gainNode = this.audioContext.createGain();
    this.pitchBase = 50;
    this.pitchBend = 0;
    this.pitchRange = 2000;
    this.volume = 0.5;
    this.maxVolume = 0.5;
    this.frequency = this.pitchBase;
    this.hasConnected = false;
    this.frequency = this.pitchBase;
  }

  play() {
    this.oscillatorNode.connect(this.gainNode);
    this.hasConnected = true;
  }

  stop() {
    if (this.hasConnected) {
      this.oscillatorNode.disconnect(this.gainNode);
      this.hasConnected = false;
    }
  }

  setType(type) {
    this.oscillatorNode.type = type;
  }

  setPitchBend(v) {
    this.pitchBend = v;
    this.frequency = this.pitchBase + this.pitchBend * this.pitchRange;
    this.oscillatorNode.frequency.value = this.frequency;
  }

  setVolume(v) {
    this.volume = this.maxVolume * v;
    this.gainNode.gain.value = this.volume;
  }

  connect(output) {
    this.gainNode.connect(output);
  }
}

function createOscillator() {
  const audioContext = new AudioContext();
  const oscillator = new Oscillator(audioContext);
  oscillator.connect(audioContext.destination);
  return oscillator;
}

export default createOscillator;
