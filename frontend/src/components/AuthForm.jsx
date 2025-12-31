import { useState } from "react";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signup data:", formData);
    } else {
      console.log("Login data:", {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div className="h-screen md:flex">
      {/* Left Side Banner */}
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="button"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white w-80" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            {isSignup ? "Create Account" : "Hello Again!"}
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            {isSignup ? "Join us by creating your account" : "Welcome Back"}
          </p>

          {/* Name Field (Signup Only) */}
          {isSignup && (
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {/* Toggle Link */}
          <p className="text-sm text-gray-600 mt-2 text-center">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 cursor-pointer"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
