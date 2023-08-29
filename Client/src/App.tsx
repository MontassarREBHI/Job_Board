import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./contexts/ContextProvider";
import Register from "./components/Register";
import Signin from "./components/Signin";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import JobApply from "./components/JobApply";
import AddJob from "./components/AddJob";
import Application from "./components/Application";
import Profile from "./components/Profile";
import EmployerDashboard from "./components/EmployerDashboard";
import JobApplications from "./components/JobApplications";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { userInfo } = useContext(userContext);
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/jobApply" element={<JobApply />} />
          <Route path="/Application" element={<Application />} />
          <Route path="/profile" element={<Profile />} />
          {/* route below accessible only for employers */}
          <Route
            path="/addjob"
            element={
              <ProtectedRoute
                isAuthenticated={userInfo?.role === "employer"}
                children={<AddJob />}
              />
            }
          />

          <Route
            path="/dash"
            element={
              <ProtectedRoute
                isAuthenticated={userInfo?.role === "employer"}
                children={<EmployerDashboard />}
              />
            }
          />
          <Route path="/applications" element={<JobApplications />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
