import { DateTimer, ManualTimer } from "./components";

import "./App.css";

function App() {
  return (
    <>
      <h2>Manual Timer</h2>
      <ManualTimer />
      <h2>Date Timer</h2>
      <DateTimer mins={1} />
    </>
  );
}

export default App;
