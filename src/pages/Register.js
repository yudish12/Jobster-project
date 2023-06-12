import { useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../Components/FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../features/userSlice/userslice";
import { clearError } from "../features/userSlice/userslice";
// redux toolkit and useNavigate later

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState);

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  // redux toolkit and useNavigate later
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    // if (!email || !password || (!isMember && !name)) {
    //   toast.error("Please Fill Out All Fields");
    //   return;
    // }
    if (isMember) {
      return dispatch();
    } else {
      dispatch(userRegister({ name, email, password }));
    }
  };

  useEffect(() => {
    if (state.user.error) {
      toast.error(state.user.error);
    }
    dispatch(clearError());
  }, [dispatch, state.user.error]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <img src={logo} alt="logo" />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            type={"text"}
            handleChange={handleChange}
            value={values.name}
            name={"name"}
            labelText={"Name"}
          />
        )}

        <FormRow
          type={"email"}
          handleChange={handleChange}
          value={values.email}
          name={"email"}
          labelText={"Email"}
        />
        <FormRow
          type={"password"}
          handleChange={handleChange}
          value={values.password}
          name={"password"}
          labelText={"Password"}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
