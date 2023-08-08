import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
