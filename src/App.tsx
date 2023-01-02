import {
  Counter,
  TemperatureConverter,
  Timer,
  FlightBooker,
  CRUD,
  CircleDrawer,
  Cells
} from './tasks';

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
      <hr />
      <CRUD />
      <hr />
      <CircleDrawer />
      <hr />
      <Cells />
    </div>
  );
}

export default App;
