import React, { useEffect, useRef } from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
const Landing = () => {
  const navigate = useNavigate();

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["job <span>tracking</span> app"],
      typeSpeed: 50,
      backSpeed: 50,
      smartBackspace: true, // this is a default
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobster logo" className="logo" />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          {/* <h1>
            job <span>tracking</span> app
          </h1> */}
          <h1 ref={el}>||</h1>
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
