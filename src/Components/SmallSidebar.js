import React from "react";
import { FaTimes } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import { toggleSidebar } from "../features/userSlice/userslice";
import Wrapper from "../assets/wrappers/SmallSidebar";
import logo from "../assets/images/logo.svg";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((store) => store.user);
  const toggle = () => dispatch(toggleSidebar());

  console.log(isSideBarOpen);

  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <img src={logo} alt="logo" />
          </header>
          <div className="nav-links">
            <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
