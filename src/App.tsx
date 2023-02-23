import { BlindTimer } from "./components";

import "./App.css";

function App() {
  const levels = [2, 1];

  return (
    <>
      <div className="grid">
        <section className="timer">
          <header className="timer__header"></header>

          <div className="timer__display">
            <BlindTimer levels={levels} />
          </div>

          <div className="timer__buttons"></div>
        </section>

        <section className="blinds">
          <header className="blinds__header">Blinds</header>
          <span className="blinds__amount">10/20</span>
          <div className="blinds__next">
            <header className="blinds__next__header">Next Level</header>
            <span className="blinds__next__amount">20/40</span>
          </div>
        </section>

        <section className="ante">
          <header className="ante__header">Ante</header>
          <span className="ante__amount">0</span>
          <div className="ante__next">
            <header className="ante__next__header">Next Level</header>
            <span className="ante__next__amount">40</span>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
