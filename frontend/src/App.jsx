import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup";
import Chat from "./Pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoon";
import store from "./store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./store/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer theme="dark" />
        <Router>
          <Routes>
            <Route path="/" element={<LoginSignup />}></Route>
            <Route path="/loginsignup" element={<LoginSignup />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/comingsoon" element={<ComingSoon />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
