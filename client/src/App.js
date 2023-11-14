import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Datatable from "./pages/Datatable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/" className="button-link">
          Go to datatable
        </Link>

        <Link to="/index" className="button-link">
          Go to index
        </Link>

        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/index" exact Component={Datatable}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
