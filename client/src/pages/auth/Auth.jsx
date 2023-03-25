import React, { useState } from "react";
import { AiOutlineCrown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../redux/actions/authActions";
// import Signup from "./Signup";
// import Login from "./Login";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (data.password !== data.cpassword) {
        setConfirmPass(false);
        return;
      }

      dispatch(signUp(data));
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      cpassword: "",
    });
  };

  return (
    <div className="Auth flex justify-center items-center h-screen gap-16 relative">
      <div className="a-left flex justify-center items-center gap-8">
        <AiOutlineCrown size={64} className="text-rose-500" />
        <div className="brand-name">
          <h2 className="text-rose-500 text-5xl font-bold mb-2">Crown Media</h2>
          <h6 className="font-semibold text-lg">
            Explore the ideas throughout the world
          </h6>
        </div>
      </div>

      <div className="a-right">
        <form
          className="info-form flex justify-center items-center flex-col gap-8 p-4 rounded-2xl bg-[#ffffffa3]"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-2xl text-rose-500">
            {isSignup ? "Sign up" : "Login"}
          </h2>

          {isSignup && (
            <div className="flex gap-4 h-8 w-full">
              <input
                type="text"
                placeholder="First Name"
                className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="flex gap-4 h-8 w-full">
            <input
              type="text"
              placeholder="Username"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 h-8 w-full">
            <input
              type="password"
              placeholder="Password"
              className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
                name="cpassword"
                value={data.cpassword}
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{ display: confirmPass ? "none" : "block" }}
            className="text-red-500 text-xs self-end mr-1"
          >
            * Confirm Password is not same
          </span>

          <div className="flex gap-4 h-8 w-full">
            <span
              className="text-xs cursor-pointer"
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}
            >
              {isSignup
                ? "Already have an account. Login!"
                : "Don't have an account. Signup!"}
            </span>
          </div>
          <button
            disabled={loading}
            className="custom-btn w-24 h-8 self-end"
            type="submit"
          >
            {loading ? "Loading..." : isSignup ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
