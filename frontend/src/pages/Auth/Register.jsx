
import React from 'react'

import { useState,useEffect } from "react";

import { Link,useLocation,useNavigate } from "react-router-dom";

import { useDispatch,useSelector } from "react-redux";

import Loader from "../../component/Loader";

import { setCredentials } from "../../redux/features/auth/authSlice";

import { useRegisterMutation } from "../../redux/api/users";

import { toast } from "react-toastify";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const {search} = useLocation();

    const sp =new URLSearchParams(search);

    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
    

    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error("Password do not match");
      } else {
        try {
          const res = await register({ username, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success("User successfully registered.");
        } catch (err) {
          console.log(err);
          toast.error(err.data.message);
        }
      }
    };
  

  return (
    <div className="pl-[10rem] flex flex-wrap bg-cyan-600">
    <div className="mr-[4rem] mt-[4rem] mb-80 bg-black rounded">
      <h1 className="text-2xl font-semibold mb-4 text-center mt-2">Register</h1>

<form onSubmit={submitHandler} className="container w-[30rem]">
<div className="my-[2rem] ml-2 mr-2">
  <label
    htmlFor="name"
    className="block text-sm font-medium text-white"
  >
    Name
  </label>
  <input
    type="text"
    id="name"
    className="mt-1 p-2 border rounded w-full "
    placeholder="Enter Name"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>

<div className="my-[2rem] ml-2 mr-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="my-[2rem] ml-2 mr-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div className="my-[2rem] ml-2 mr-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>


          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] ml-2  "
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
</form>

<div className="mt-4 ml-2 mb-4">
          <p className="text-white text-center">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-teal-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
    </div>

    <img
        src="https://mrwallpaper.com/images/high/ornate-cinema-hall-interior-npknvxlf3tijizig.webp"
        alt=""
        className="h-[60rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
      />

    </div>



  );
};

export default Register


