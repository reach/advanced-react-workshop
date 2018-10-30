import { unstable_createResource as createResource } from "react-cache";
////////////////////////////////////////////////////////////

let qnetworks = ["fast", "slow", "slow", "fast", "slow", "fast", "nextIsSlow"];
let search = window.location.search.substr(1);

let network = qnetworks[search] || "fast";

export { network };

////////////////////////////////////////////////////////////

const sleep = (ms = 1000) => new Promise(res => setTimeout(res, ms));

let token = null;

let networks = {
  fast: {
    workouts: 100,
    workout: 200,
    exercises: 200,
    next: 200
  },
  slow: {
    workouts: 100,
    workout: 2000,
    exercises: 3000,
    next: 3000
  },
  nextIsSlow: {
    workouts: 100,
    workout: 100,
    exercises: 100,
    next: 5000
  }
};

const fakeWorkouts = [
  {
    name: "Chest and Back",
    id: "chest-back",
    completed: true
  },
  { name: "Cardio", id: "cardio", completed: true },
  {
    name: "Lower Body",
    id: "lower",
    completed: false
  },
  { name: "Core", id: "core", completed: false },
  {
    name: "Upper Body",
    id: "upper-body",
    completed: false
  }
];

const fakeExercises = {
  "chest-back": [
    "pull-ups",
    "push-ups",
    "chin-ups",
    "military pushups",
    "close-grip pullups",
    "wide pushups"
  ],
  cardio: [
    "run in place",
    "hop squats",
    "figure eights",
    "jab punch sprawl",
    "burpees"
  ],
  lower: ["lunges", "jump squats", "side-kicks", "hip raises"],
  core: ["crunches"],
  "upper-body": ["curls"]
};

const fakeNextWorkouts = {
  "chest-back": "cardio",
  cardio: "lower",
  lower: "core",
  core: "upper-body",
  "upper-body": "chest-back"
};

////////////////////////////////////////////////////////////
// fetchers
export const fetchWorkouts = () =>
  new Promise(async res => {
    logTakeoff("readWorkouts");
    await sleep(1000);
    logLanding("readWorkouts");
    res(fakeWorkouts);
  });

export const fetchWorkout = id =>
  new Promise(async res => {
    logTakeoff(`fetchWorkout ${id}`);
    await sleep(1000);
    logLanding(`fetchWorkout ${id}`);
    res(fakeWorkouts.find(w => w.id === id));
  });

export const fetchExercises = id =>
  new Promise(async res => {
    logTakeoff(`fetchExercises ${id}`);
    await sleep(2000);
    logLanding(`fetchExercises ${id}`);
    res(fakeExercises[id]);
  });

export const fetchNextWorkout = id =>
  new Promise(async res => {
    logTakeoff(`fetchNext ${id}`);
    await sleep(3000);
    logLanding(`fetchNext ${id}`);
    res(fakeWorkouts.find(workout => workout.id === fakeNextWorkouts[id]));
  });

////////////////////////////////////////////////////////////
// readers
export const WorkoutsResource = createResource(
  () =>
    new Promise(async res => {
      logTakeoff("readWorkouts");
      await sleep(networks[network].workouts);
      logLanding("readWorkouts");
      res(fakeWorkouts);
    })
);

export const WorkoutResource = createResource(
  id =>
    new Promise(async res => {
      logTakeoff(`readWorkout ${id}`);
      await sleep(networks[network].workout);
      logLanding(`readWorkout ${id}`);
      res(fakeWorkouts.find(w => w.id === id));
    })
);

export const ExercisesResource = createResource(
  id =>
    new Promise(async res => {
      logTakeoff(`readExercises ${id}`);
      await sleep(networks[network].exercises);
      logLanding(`readExercises ${id}`);
      res(fakeExercises[id]);
    })
);

export const NextWorkoutResource = createResource(
  id =>
    new Promise(async res => {
      logTakeoff(`readRelated ${id}`);
      await sleep(networks[network].next);
      logLanding(`readRelated ${id}`);
      res(fakeWorkouts.find(workout => workout.id === fakeNextWorkouts[id]));
    })
);

////////////////////////////////////////////////////////
// Contacts
const API = `https://contacts.now.sh`;
const fetchContacts = async (url, opts = { headers: {} }) => {
  return fetch(`${API}${url}`, {
    ...opts,
    headers: { authorization: token, ...opts.headers }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return res;
    }
  });
};

export const readContacts = createResource(() => fetchContacts("/contacts"));

export const readContact = createResource(id =>
  fetchContacts(`/contacts/${id}`)
);

export const createContact = contact =>
  fetchContacts("/contacts", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ contact })
  });

////////////////////////////////////////////////////////
// logging stuff
let logTakeoff = str => {
  console.log(`%c🛫 ${str}`, "font-size: 20px; color: hsl(10, 50%, 50%)");
};

let logLanding = str => {
  console.log(`%c🛬 ${str}`, "font-size: 20px; color: hsl(170, 50%, 50%)");
};
