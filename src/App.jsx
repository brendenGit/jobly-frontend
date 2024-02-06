import React, { useEffect, useState } from "react";
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
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<LoginForm user={user} />} />
          <Route path="/signup" element={<SignUpForm user={user} />} />

          {/** Protected Route */}
          <Route path="/companies" element={<ProtectedRoute user={user} />}>
            <Route path="/companies" element={<CompanyList user={user} />} />
          </Route>

          {/** Protected Route */}
          <Route path="/companies/:handle" element={<ProtectedRoute user={user} />}>
            <Route path="/companies/:handle" element={<CompanyDetails user={user} />} />
          </Route>

          {/** Protected Route */}
          <Route path="/jobs" element={<ProtectedRoute user={user} />}>
            <Route path="/jobs" element={<JobList user={user} />} />
          </Route>

          {/** Protected Route */}
          <Route path="/profile" element={<ProtectedRoute user={user} />}>
            <Route path="/profile" element={<Profile user={user} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
