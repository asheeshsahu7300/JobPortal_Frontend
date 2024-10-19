import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignUpPage from './screens/SignUpScreen/SignUpScreen';
 // Make sure to create this component
import './App.css';
import Verification from './screens/SignUpScreen/Verification';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import JobForm from './screens/CreateJobs/CreateJobs';

function App() {
  return (

    <Router>
      <div>
       <ToastContainer />
        
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/SignIn" element= {<Verification/>} />
          <Route path="/LogIn" element= {<Login/>} />
          <Route path="/Jobs" element= {<Home/>} />
          <Route path="/CreateJobs" element= {<JobForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
