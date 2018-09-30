import { createElement } from "glamor/react"; // eslint-disable-line
/* @jsx createElement */
import "./index.css";
import Spinner from "react-svg-spinner";
import ManageScroll from "../components/ManageScroll";
import React, { Placeholder } from "react";
import { Router, Link } from "@reach/router";
import Component from "@reach/component-component";
import {
  readWorkouts,
  readWorkout,
  readExercises,
  readNextWorkout,
  patience
} from "./utils";
// import Img, { preload as preloadImg } from "./Img";
import { cache } from "../cache";

const link = {
  display: "inline-block",
  width: "200px",
  height: "200px",
  lineHeight: "200px",
  background: "#fff",
  textAlign: "center",
  margin: "20px",
  ":hover": {
    background: "#ddd"
  },
  position: "relative"
};

const Home = () => (
  <div>
    <h1 css={{ textAlign: "center" }}>Workout App!</h1>
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Link to="/workouts" css={link}>
        Workouts
      </Link>
      <Link to="/competitions" css={link}>
        Competitions
      </Link>
    </div>
  </div>
);

const LoadingLink = ({ children, ...props }) => (
  <Component initialState={{ isLoading: false }}>
    {({ state, setState }) => (
      <Link
        {...props}
        onClick={() => {
          setState({ isLoading: true });
        }}
      >
        {children}
        <div
          css={{
            transition: "opacity 200ms ease",
            transitionDelay: "500ms",
            position: "absolute",
            left: 0,
            top: 25,
            right: 0,
            bottom: 0,
            opacity: state.isLoading ? "1" : "0"
          }}
        >
          <LoadingSpinner />
        </div>
      </Link>
    )}
  </Component>
);

const Workouts = () => {
  const workouts = readWorkouts.read(cache, 10);
  return (
    <div>
      <Link to="..">Home</Link>
      <h1>Workouts</h1>
      {workouts.map(workout => (
        <Link key={workout.id} to={workout.id} css={link}>
          {workout.name}
        </Link>
      ))}
    </div>
  );
};

const Exercises = ({ workoutId }) => {
  const exercises = readExercises.read(cache, workoutId);
  return (
    <ul>
      {exercises.map((exercise, i) => (
        <li key={i}>{exercise}</li>
      ))}
    </ul>
  );
};

const Workout = ({ workoutId }) => {
  readNextWorkout.preload(cache, workoutId);
  readWorkout.preload(cache, workoutId);
  readExercises.preload(cache, workoutId);
  const workout = readWorkout.read(cache, workoutId);

  return (
    <div>
      <Link to="../..">Home</Link> / <Link to="..">Workouts</Link>
      <h1>{workout.name}</h1>
      <Placeholder delayMs={patience} fallback={<Spinner size="150" />}>
        <Exercises workoutId={workoutId} />
      </Placeholder>
      {workout.completed && (
        <Placeholder
          delayMs={patience}
          fallback={
            <h2>
              Up Next! <Spinner size="0.75em" />
            </h2>
          }
        >
          <NextWorkout workoutId={workoutId} />
        </Placeholder>
      )}
    </div>
  );
};

const NextWorkout = ({ workoutId }) => {
  const nextWorkout = readNextWorkout.read(cache, workoutId);
  return (
    <div>
      <h2>
        Up Next! <Link to={`../${nextWorkout.id}`}>{nextWorkout.name}</Link>
      </h2>
    </div>
  );
};

const Competitions = () => <div>Competitions</div>;

const LoadingSpinner = () => (
  <div css={{ textAlign: "center", padding: 20 }}>
    <Spinner size="100" />
  </div>
);

const App = () => {
  return (
    <Placeholder delayMs={patience} fallback={<Spinner size="100" />}>
      <ManageScroll />
      <Router style={{ padding: 20 }}>
        <Home path="/" />
        <Workouts path="workouts" />
        <Workout path="workouts/:workoutId" />
        <Competitions path="competitions" />
      </Router>
    </Placeholder>
  );
};

export default App;
