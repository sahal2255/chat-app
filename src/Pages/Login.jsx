import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import CommonForm from "../component/CommonForm";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const {login}=useAuthStore()
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: <FaEnvelope />,
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Enter a valid email",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: <FaLock />,
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  ];

  const handleLogin = (data) => {
    console.log("Login Data", data);
    login(data)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <CommonForm fields={fields} onSubmit={handleLogin} buttonText="Log In" />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
