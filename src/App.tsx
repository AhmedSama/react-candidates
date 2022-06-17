import { Card } from "./components/Card/Card";
import "./global.css"

function App() {
  return (
    <div style={{gap:24}} className="App flex items-center content-center direction-col">
      <h1 className="title">Let's plan your <span className="bold">loan.</span></h1>
      <Card />
    </div>
  );
}

export default App;
