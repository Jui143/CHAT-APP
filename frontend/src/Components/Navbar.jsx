import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { List, X } from "react-bootstrap-icons";
import "../Styles/Navbar.css";
import "../Styles/Sidebar.css"; // Ensure Sidebar styles are included
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const sidebarRef = useRef(null);
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/userLogout`, {
        method: "get",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        logout(); // Update Context State
        toast.success("Logged out successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong!");
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark pt-4 pb-4"
        style={{ background: "#1F2937" }}
      >
        <div className="container-fluid d-flex align-items-center">
          {/* Sidebar Toggle Button (Left of Logo) */}
          <button
            className="opt btn btn-outline-dark me-3 sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>

          {/* Logo */}
          <Link
            className="navbar-brand fw-bold fs-2 d-flex align-items-center"
            to="/chat"
          >
            <img
              className="mx-3"
              src="../src/assets/imagewhite.png"
              height="44.8px"
              width="40.8px"
              alt="logo"
            />
            <span className="BrandName1">Keeda</span>
            <span className="BrandName2">Chat</span>
          </Link>

          {/* Navbar Links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fs-6 rounded-3 m-1" to="/chat">
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 rounded-3 m-1" to="/comingsoon">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 rounded-3 m-1" to="/comingsoon">
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 rounded-3 m-1" to="/comingsoon">
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 rounded-3 m-1" to="/comingsoon">
                Project
              </Link>
            </li>
          </ul>

          {/* Profile Button */}
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <Link to="/comingsoon">
                <button type="button" className="opt btn btn-outline-dark m-2">
                  Profile
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/loginsignup" onClick={handleLogout}>
                <button type="button" className="opt btn btn-outline-dark m-2">
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img
            className="mx-3 mb-3"
            src="../src/assets/imagewhite.png"
            height="40px"
            width="40px"
            alt="logo"
          />
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="list-unstyled">
          <li>
            <a href="/chat" className="sidebar-link">
              Chat
            </a>
          </li>
          <li>
            <a href="/comingsoon" className="sidebar-link">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/comingsoon" className="sidebar-link">
              Team
            </a>
          </li>
          <li>
            <a href="/comingsoon" className="sidebar-link">
              Calendar
            </a>
          </li>
          <li>
            <a href="/comingsoon" className="sidebar-link">
              Projects
            </a>
          </li>
        </ul>
      </div>

      {/* Background Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
