import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock ,FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// CommonForm Component
const CommonForm = ({ fields, onSubmit, buttonText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      {fields.map(({ name, type, placeholder, icon }) => (
        <div key={name} className="flex items-center border rounded-md px-3 py-2 relative">
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}
          <input
            type={type === "password" && showPassword ? "text" : type}
            {...register(name, { required: `${placeholder} is required` })}
            placeholder={placeholder}
            className="w-full outline-none"
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 text-gray-500"
            >
              {showPassword ? <FaRegEyeSlash/> : <FaRegEye />}
            </button>
          )}
        </div>
      ))}

      {fields.map(({ name }) =>
        errors[name] ? (
          <p key={name} className="text-red-500 text-sm">{errors[name]?.message}</p>
        ) : null
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CommonForm