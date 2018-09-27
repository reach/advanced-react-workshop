import React from "react";
import galaxy from "./images/galaxy.jpg";
import earth from "./images/earth.jpg";
import trees from "./images/trees.jpg";

const makeBackgroundComponent = background => props => (
  <div
    {...props}
    style={{
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      background: `url(${background}) center center`,
      backgroundSize: "cover"
    }}
  />
);

export const Galaxy = makeBackgroundComponent(galaxy);
export const Earth = makeBackgroundComponent(earth);
export const Trees = makeBackgroundComponent(trees);
