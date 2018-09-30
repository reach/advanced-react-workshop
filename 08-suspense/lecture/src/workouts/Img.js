/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { createResource } from "simple-cache-provider";
import withCache from "./withCache";

const ImageResource = createResource(src => {
  const image = new Image();
  return new Promise(resolve => {
    image.onload = () => resolve(src);
    image.src = src;
  });
});

function Img({ cache, src, ...props }) {
  return <img src={ImageResource.read(cache, src)} {...props} />;
}

export const preload = ImageResource.preload;

export default withCache(Img);
