// modified from http://codepen.io/enxaneta/pen/jbVLGb/, see copyright there

import React from "react";

class SineWave extends React.Component {
  componentDidMount() {
    this.ctx = this.node.getContext("2d");
    const { width, height } = this.node.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.renderCanvas(true);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.draw && this.props.draw) {
      this.renderCanvas();
    }
  }

  renderCanvas(force) {
    const { ctx, width, height } = this;
    let phi = 0;
    let frames = 0;
    ctx.lineWidth = 4;

    const draw = () => {
      const amplitude = height * this.props.amplitude;
      const frequency = this.props.frequency / 2;
      const offset = (height - amplitude) / 2;
      frames++;
      phi = frames / 30;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "white";
      ctx.moveTo(0, height);
      ctx.beginPath();
      for (var x = 0; x < width; x++) {
        let y = Math.sin(x * frequency + phi) * amplitude / 2 + amplitude / 2;
        ctx.lineTo(x, y + offset); // 40 = offset
      }
      ctx.stroke();
      if (this.props.draw) {
        window.requestAnimationFrame(draw);
      }
    };
    if (force || this.props.draw) {
      window.requestAnimationFrame(draw);
    }
  }

  render() {
    const { width, height } = this.props;
    return <canvas ref={n => (this.node = n)} width={width} height={height} />;
  }
}

export default SineWave;
