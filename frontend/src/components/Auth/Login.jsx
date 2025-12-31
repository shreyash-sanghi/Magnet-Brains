import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { IoLogIn } from "react-icons/io5";
import { axiosInstance } from "../../API/axiosApi";

function Login() {
  const {authUser, setAuthUser} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  setIsLoading(true);

  const userInfo = {
    email: data.email,
    password: data.password,
  };
  try {
    const response = await axiosInstance.post("/user/login", userInfo);
    if (response.data) {
      toast.success("Login successful");
      localStorage.setItem("Task-Creat", response?.data?.data?.token);
      setAuthUser(response?.data?.data?.user);
      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      toast.error("Error: " + error.response.data.error);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
      
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4 shadow-lg">
              <HiSparkles className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Task Management<span className="text-green-400 pl-2">App</span>
            </h1>
            <p className="text-gray-300 text-sm">Welcome back! Please login to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                  <span>●</span> This field is required
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                  <span>●</span> This field is required
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

         
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <IoLogIn className="text-xl" />
                  Login
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-300 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;