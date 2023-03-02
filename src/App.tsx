import { TournamentClock } from "./components";

import "./App.css";

const structureF = [
  {
    small: 25,
    big: 50,
    ante: 0,
    time: 20,
  },
  {
    small: 50,
    big: 100,
    ante: 0,
    time: 20,
  },
  {
    small: 100,
    big: 200,
    ante: 0,
    time: 20,
  },
  {
    small: 150,
    big: 300,
    ante: 0,
    time: 12,
  },
  {
    small: 200,
    big: 400,
    ante: 0,
    time: 12,
  },
  {
    small: 250,
    big: 500,
    ante: 0,
    time: 12,
  },
  {
    small: 400,
    big: 800,
    ante: 0,
    time: 12,
  },
  {
    small: 500,
    big: 1000,
    ante: 1000,
    time: 8,
  },
  {
    small: 600,
    big: 1200,
    ante: 1200,
    time: 8,
  },
  {
    small: 700,
    big: 1400,
    ante: 1400,
    time: 8,
  },
  {
    small: 800,
    big: 1600,
    ante: 1600,
    time: 8,
  },
  {
    small: 1000,
    big: 2000,
    ante: 2000,
    time: 8,
  },
  {
    small: 1500,
    big: 3000,
    ante: 3000,
    time: 8,
  },
  {
    small: 2000,
    big: 4000,
    ante: 4000,
    time: 8,
  },
  {
    small: 3000,
    big: 6000,
    ante: 6000,
    time: 8,
  },
  {
    small: 4000,
    big: 8000,
    ante: 8000,
    time: 8,
  },
  {
    small: 5000,
    big: 10000,
    ante: 10000,
    time: 6,
  },
  {
    small: 7500,
    big: 15000,
    ante: 15000,
    time: 6,
  },
  {
    small: 10000,
    big: 20000,
    ante: 20000,
    time: 6,
  },
  {
    small: 15000,
    big: 30000,
    ante: 30000,
    time: 6,
  },
  {
    small: 20000,
    big: 40000,
    ante: 40000,
    time: 6,
  },
  {
    small: 25000,
    big: 50000,
    ante: 50000,
    time: 6,
  },
  {
    small: 30000,
    big: 60000,
    ante: 60000,
    time: 6,
  },
  {
    small: 40000,
    big: 80000,
    ante: 80000,
    time: 6,
  },
  {
    small: 50000,
    big: 100000,
    ante: 100000,
    time: 6,
  },
];

function App() {
  return (
    <>
      <TournamentClock levels={structureF} />
    </>
  );
}

export default App;
