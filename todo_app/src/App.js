import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TodoPage from "./Components/TodoPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ResetPassword from "./Components/ResetPassword";


function App() {
  return (
    <>
      <div className="bg-dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ResetPass" element={<ResetPassword />} />
            <Route path="/todopage" element={<TodoPage />} />
          </Routes>
        </BrowserRouter>

      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </>


  );
}

export default App;
