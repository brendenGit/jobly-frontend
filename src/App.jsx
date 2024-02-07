import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/Common/NavBar/NavBar.jsx";
import Home from "./Components/Home/Home.jsx";
import LoginForm from "./Components/Login/LoginForm.jsx";
import SignUpForm from "./Components/SignUp/SignUpForm.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import CompanyList from "./Components/Company/CompanyList/CompanyList.jsx";
import './App.css';
import CompanyDetails from "./Components/Company/CompanyDetails/CompanyDetails.jsx";
import JobList from "./Components/Job/JobList/JobList.jsx";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} exact />} />
          <Route path="/login" element={<LoginForm user={user} exact />} />
          <Route path="/signup" element={<SignUpForm user={user} exact />} />
          {/**ProtectedRoute */}
          <Route path="/companies" element={<CompanyList user={user} exact />} />
          {/**ProtectedRoute */}
          <Route path="/companies/:handle" element={<CompanyDetails user={user} exact />} />
          {/**ProtectedRoute */}
          <Route path="/jobs" element={<JobList user={user} exact />} />
          {/**ProtectedRoute */}
          <Route path="/profile" element={<Profile user={user} exact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
