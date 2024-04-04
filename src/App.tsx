import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";

function App(): React.JSX.Element {
  return  <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
  </Routes>
}

export default App
