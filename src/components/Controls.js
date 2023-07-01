import { useState } from "react";
import { useDataPoints } from "../hooks/useDataPoints";

export const Controls = () => {
  const { addDataPoint } = useDataPoints();
  const [note, setNote] = useState("");

  const log = (tag) => (_) => {
    addDataPoint({ tag, note, timestamp: new Date().toISOString() });
    setNote("");
  };

  return (
    <section>
      <h2>Controls</h2>

      <label htmlFor="note">note (optional)</label>
      <input id="note" value={note} onChange={(e) => setNote(e.target.value)} />

      <br />

      <button onClick={log("stop")}>stop drinking</button>
      <button onClick={log("start")}>start drinking</button>
      <button onClick={log("pee")}>pee</button>
      <button onClick={log("drink")}>drink 16oz</button>
    </section>
  );
};
