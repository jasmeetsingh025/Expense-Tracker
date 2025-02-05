import React from "react";
import { Link } from "react-router-dom";

function Logo({ width = "100px", height = "100px" }) {
  return (
    <div className="flex items-center ">
      {/* <img src="#" alt="Logo" style={{ width: width, height: height }} /> */}
      <Link to="/" className="text-text">
        <h1
          className="sm:text-3xl font-bold text-text"
          // style={{ width: width, height: height }}
        >
          EXPENSE TRACKER
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
