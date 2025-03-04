import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const [multitext] = useTypewriter({
    words: [
      "This Section is currently under development it will be coming soon on Keeda Chat!!!",
    ],
    loop: {},
    typeSpeed: 10,
    deleteSpeed: 10,
  });
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="fs-5 my-5">
          {multitext}
          <Cursor cursorStyle="➡️" cursorBlinking={false} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-outline-dark" to="/chat">
          Home
        </Link>
      </div>
    </>
  );
}
