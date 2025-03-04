import React from "react";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup";
import Chat from "./Pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoon";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />}></Route>
          <Route path="/loginsignup" element={<LoginSignup />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/comingsoon" element={<ComingSoon />}></Route>
        </Routes>
      </Router>
    </>
  );
}
