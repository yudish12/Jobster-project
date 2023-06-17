import NavLinks from "./NavLinks";
import logo from "../assets/images/logo.svg";
import Wrapper from "../assets/wrappers/BigSidebar";
import { toggleSidebar } from "../features/userSlice/userslice";
import { useSelector, useDispatch } from "react-redux";

const BigSidebar = () => {
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((store) => store.user);
  const toggle = () => dispatch(toggleSidebar());
  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <img src={logo} alt="logo" w />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
