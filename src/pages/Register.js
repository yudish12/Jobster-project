import { useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../Components/FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../features/userSlice/userslice";
import { clearError } from "../features/userSlice/userslice";
import { getUserFromLocalStorage } from "../Api/localStorage";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { user, error, isLoading } = useSelector((state) => state.user);
  console.log(user);
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
      console.log("asd");
      dispatch(userLogin({ email, password }));
    } else {
      dispatch(userRegister({ name, email, password }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user) {
      navigate("/");
    }
    dispatch(clearError());
  }, [dispatch, error, user, navigate]);

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
