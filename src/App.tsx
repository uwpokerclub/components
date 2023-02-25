import { TournamentClock } from "./components";

import "./App.css";

function App() {
  const levels = [
    {
      small: 25,
      big: 50 ,
      ante: 0,
      time: 1,
    }
  ];

  return (
    <>
      <TournamentClock levels={levels} />
    </>
  );
}

export default App;
