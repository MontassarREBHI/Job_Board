import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./contexts/ContextProvider";
import Register from "./components/Register";
import Signin from "./components/Signin";
import NavBar from "./components/NavBar";
import Home from "./components/JobSeeker/Home";
import JobApply from "./components/JobSeeker/JobApply";
import AddJob from "./components/Employer/AddJob";
import Application from "./components/JobSeeker/Application";
import Profile from "./components/Profile/Profile";
import EmployerDashboard from "./components/Employer/EmployerDashboard";
import JobApplications from "./components/Employer/JobApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ExploreProfiles from "./components/Employer/ExploreProfiles";
import ScanningProfile from "./components/Employer/ScanningProfile";
import SimpleBottomNavigation from "./components/LabelBottomNavigation";

function App() {
  const { userInfo, loggedIn } = useContext(userContext);
  return (
    <>
      <Router>
        <NavBar />
        <SimpleBottomNavigation />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={userInfo?.role !== "employer"}
                children={<Home />}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/jobApply" element={<JobApply />} />
          <Route path="/explore" element={<ExploreProfiles />} />
          <Route path="/scan" element={<ScanningProfile />} />
          <Route
            path="/Application"
            element={
              <ProtectedRoute
                isAuthenticated={userInfo?.role === "applicant"}
                children={<Application />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAuthenticated={loggedIn === "true"}
                children={<Profile />}
              />
            }
          />

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
        <Footer />
      </Router>
    </>
  );
}

export default App;
