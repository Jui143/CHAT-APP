import React from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

export default function SignupNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark pt-4 pb-4"
      style={{ background: "#1F2937" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-2 d-flex" to="/">
          <img
            className="mx-3"
            src="../src/assets/imagewhite.png"
            height="44.8px"
            width="40 .8px"
            alt="logo"
          ></img>
          <span className="BrandName1">Keeda</span>
          <span className="BrandName2">Chat</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav ms-auto mb-lg-0">
          <li className="nav-item">
            <Link to="/loginsignup">
              <button type="button" className="opt btn btn-outline-dark m-2">
                Signup
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/loginsignup">
              <button type="button" className="opt btn btn-outline-dark m-2">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
