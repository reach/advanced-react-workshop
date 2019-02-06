// You'll find the documentation to be helpful for this exercise:
// https://reactjs.org/docs/hooks-reference.html
//
// 3. Make the play/pause button work by cycling through the slides automatically
//    - You'll need to manage some new `isPlaying` state
//    - You'll want to use `setTimeout` inside of a `useEffect` and update the
//      `currentIndex` there.
//    - Be sure to clean up the effect by returning a function from `useEffect`
//      that cleans it up
//    - Be sure to pass the dependencies to useEffect so that React knows when
//      to clean it up.
//
// 4. Make the progress bar animate when the slides are playing automatically
//    - There's a custom hook called `useProgress` that you can use inside of
//      `ProgressBar`.
//    - The signature is `useProgress(shouldAnimate, animationDuration)`, so
//      you can just pass along the props ProgressBar received.
//    - The animation needs to reset whenever the `currentIndex` and `isPlaying`
//      change. There's a little trick in React where you can pass a new `key`
//      to the element and it'll "reset" the state (really it creates a new
//      instance with the initial state). The code is already doing this trick
//      for you, but go delete `key={currentIndex + isPlaying}` and see what
//      happens. Can you explain why it breaks?
//    - Go look at the the source of `useProgress` and see if you can understand
//      how it works. You may want to review:
//      https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
//
// 5. When the carousel is playing and then you click next, previous, or one of
//    the nav icons, make the carousel stop playing
//
// 6. Got extra time?
//    - Convert all of your state to use `useReducer` instead of multiple `useState`.
//    - Manage document focus when the user clicks the nav icons.
//      - Pass `true` to the `takeFocus` prop on `Slide`
//      - In `Slide`, inside a `useEffect` when `takeFocus` is true, focus the
//        slide's DOM node
//      - You'll need to `useRef` as well to track the DOM node.
//      - NOTE: You only want to manage focus when the nav icons are clicked,
//        not when play, next, or previous are clicked, so you'll need some
//        more state to know when you're managing focus and when you're not.
//
import React, { useState, useReducer, useEffect, useRef } from "react";
import Alert from "@reach/alert";
import VisuallyHidden from "@reach/visually-hidden";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

import slides from "./whatevs/slides";
import useProgress from "./useProgress";

let SLIDE_DURATION = 3000;

function Carousel(props) {
  return <section className="Carousel" {...props} />;
}

function Slides(props) {
  return <ul {...props} />;
}

function Slide({ isCurrent, takeFocus, image, id, title, children }) {
  return (
    <li
      aria-hidden={!isCurrent}
      tabIndex="-1"
      aria-labelledby={id}
      className="Slide"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="SlideContent">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </li>
  );
}

function SlideNav(props) {
  return <ul className="SlideNav" {...props} />;
}

function SlideNavItem({ isCurrent, ...props }) {
  return (
    <li className="SlideNavItem">
      <button {...props} aria-current={isCurrent}>
        <span />
      </button>
    </li>
  );
}

function Controls(props) {
  return <div className="Controls" {...props} />;
}

function IconButton(props) {
  return <button {...props} className="IconButton" />;
}

function ProgressBar({ animate, time }) {
  let progress = useProgress(animate, time);

  return (
    <div className="ProgressBar">
      <div style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

function SpacerGif({ width }) {
  return <div style={{ display: "inline-block", width }} />;
}

function App() {
  let currentIndex = 0;
  let isPlaying = false;

  return (
    <Carousel aria-label="Images from Space">
      <Slides>
        {slides.map((image, index) => (
          <Slide
            key={index}
            id={`image-${index}`}
            image={image.img}
            title={image.title}
            isCurrent={index === currentIndex}
            takeFocus={null}
            children={image.content}
          />
        ))}
      </Slides>

      <SlideNav>
        {slides.map((slide, index) => (
          <SlideNavItem
            key={index}
            isCurrent={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => {}}
          />
        ))}
      </SlideNav>

      <Controls>
        {isPlaying ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {}}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {}}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px" />
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {}}
          children={<FaBackward />}
        />
        <IconButton
          aria-label="Next Slide"
          onClick={() => {}}
          children={<FaForward />}
        />
      </Controls>

      <ProgressBar
        key={currentIndex + isPlaying}
        time={SLIDE_DURATION}
        animate={isPlaying}
      />

      <VisuallyHidden>
        <Alert>
          Item {currentIndex + 1} of {slides.length}
        </Alert>
      </VisuallyHidden>
    </Carousel>
  );
}

export default App;
