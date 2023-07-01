import { Entry } from "./components/Entry";
import { Controls } from "./components/Controls";
import { useDataPoints } from "./hooks/useDataPoints";

const App = () => {
  const { dataPointsByDate } = useDataPoints();

  return (
    <div className="App">
      <Controls />

      <hr />

      {Object.entries(dataPointsByDate).map(([date, dataPoints]) => (
        <section key={date}>
          <h2>{date}</h2>

          <ul>{dataPoints.map(Entry)}</ul>
        </section>
      ))}
    </div>
  );
};

export default App;
