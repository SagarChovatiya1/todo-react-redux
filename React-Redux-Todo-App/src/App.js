import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./css/main.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";
import { motion } from "framer-motion";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import Notify from "./Notify";
import Signup from "./components/Signup";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "./redux/auth";
import { toast } from "react-toastify";
import Logout from './components/Logout';
// import { useNavigate } from "react-router-dom"

function App() {


  return (
    <div className="App">

      <Logout/>

      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Todo App
      </motion.h1>


      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={
              <PrivateRoute>
                <Todos />
                <DisplayTodos />
              </PrivateRoute>

            }
            />
          </Routes>
          <Notify />
        </BrowserRouter>

        {/* <Todos />
        <DisplayTodos />
        <Login/> */}
      </motion.div>
    </div>

  );
}

export default App;
