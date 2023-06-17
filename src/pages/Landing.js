import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
const Landing = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobster logo" className="logo" />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>some text</p>
          <button
            className="btn btn-hero"
            onClick={() => navigate("/register")}
          >
            Login/Register
          </button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
