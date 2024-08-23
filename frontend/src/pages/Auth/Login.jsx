



import { useState,useEffect } from 'react'

import { Link,useLocation,useNavigate } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'

import Loader from '../../component/Loader'

import { setCredentials } from '../../redux/features/auth/authSlice'

import { toast } from 'react-toastify'

import { useLoginMutation } from '../../redux/api/users'


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <div className='bg-cyan-600'>

<section className="pl-[10rem] flex flex-wrap">

        <div className="mr-[4rem] mt-[4rem] mb-[30rem] bg-black rounded-lg justify-center">
          <h1 className="text-2xl font-semibold mb-4 text-center mt-5">Sign In</h1>

<form onSubmit={submitHandler} className="container w-[30rem]">
          <div className="my-[2rem] ml-2 mr-2 ">
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
<div className="flex justify-center items-center">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>

            </div>
            
            {isLoading && <Loader />}

</form>

     <div className="mt-4">
            <p className="text-white text-center">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-teal-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>

      </div>
      
      <img
          src="https://w0.peakpx.com/wallpaper/411/838/HD-wallpaper-marvelous-ornate-theater-seats-stage-ornate-theater.jpg"
          alt=""
          className="h-[60rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
        />

      </section>
      
    </div>
  );
};

export default Login
