// click next workout (cDU)
// old page stays, lagging bits (setState null)

import { createElement } from "glamor/react"; // eslint-disable-line
/* @jsx createElement */
import React, { Placeholder } from "react";
import { Router, Link } from "@reach/router";
import Spinner from "react-svg-spinner";
import Competitions from "./lib/Competitions";
import ManageScroll from "./lib/ManageScroll";
import { cache } from "./lib/cache";

import {
  fetchWorkout,
  fetchExercises,
  fetchNextWorkout,
  WorkoutsResource
} from "./lib/utils";

let patience = 1;

///////////////////////////////////////////////////
class Workout extends React.Component {
  state = {
    workout: null,
    exercises: null,
    nextWorkout: null
  };

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { workoutId } = this.props;
    fetchWorkout(workoutId).then(workout => {
      this.setState({ workout });
    });
    fetchExercises(workoutId).then(exercises => {
      this.setState({ exercises });
    });
    fetchNextWorkout(workoutId).then(nextWorkout => {
      console.log(nextWorkout);
      this.setState({ nextWorkout });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.workoutId !== this.props.workoutId) {
      this.setState({
        exercises: null,
        workout: null,
        nextWorkout: null
      });
      this.fetch();
    }
  }

  render() {
    const { workout, exercises, nextWorkout } = this.state;

    return workout ? (
      <div>
        <Link to="../..">Home</Link> / <Link to="..">Workouts</Link>
        <h1>{workout.name}</h1>
        {exercises ? <Exercises exercises={exercises} /> : <Spinner />}
        {workout.completed &&
          (nextWorkout ? (
            <NextWorkout nextWorkout={nextWorkout} />
          ) : (
            <h2>
              Up Next! <Spinner size="0.75em" />
            </h2>
          ))}
      </div>
    ) : (
      <Spinner size="100" />
    );
  }
}

////////////////////////////////////////////////////////////
const link = {
  display: "inline-block",
  width: "200px",
  height: "200px",
  lineHeight: "200px",
  background: "#f0f0f0",
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

const Workouts = () => {
  const workouts = WorkoutsResource.read(cache, 10);
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

const Exercises = ({ exercises }) => {
  return <ul>{exercises.map((exercise, i) => <li key={i}>{exercise}</li>)}</ul>;
};

const NextWorkout = ({ nextWorkout }) => {
  return (
    <div>
      <h2>
        Up Next! <Link to={`../${nextWorkout.id}`}>{nextWorkout.name}</Link>
      </h2>
    </div>
  );
};

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
