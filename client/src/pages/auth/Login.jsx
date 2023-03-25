import React from "react";

const Login = () => {
  return (
    <div className="a-right">
      <form className="info-form flex justify-center items-center flex-col gap-8 p-4 rounded-2xl bg-[#ffffffa3]">
        <h2 className="font-bold text-2xl text-rose-500">Login</h2>

        <div className="flex gap-4 h-8 w-full">
          <input
            type="text"
            placeholder="Username"
            className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
            name="username"
          />
        </div>

        <div className="flex gap-4 h-8 w-full">
          <input
            type="password"
            placeholder="Password"
            className="info-input border-none outline-none bg-[#28343e11] rounded-[8px] p-[20px] flex-[1]"
            name="password"
          />
        </div>

        <div className="flex gap-4 h-8 w-full">
          <span className="text-xs">Don't have an account. Signup!</span>
        </div>
        <button className="custom-btn w-24 h-8 self-end" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
