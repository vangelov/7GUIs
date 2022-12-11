import { FlightBooker } from 'tasks/FlightBooker';
import { Timer } from 'tasks/Timer';
import { Counter } from './tasks/Counter';
import { TemperatureConverter } from './tasks/TemperatureConverter';

function App() {
  return (
    <div>
      <h1>7GUIs</h1>
      <hr />
      <Counter />
      <hr />
      <TemperatureConverter />
      <hr />
      <FlightBooker />
      <hr />
      <Timer />
    </div>
  );
}

export default App;
