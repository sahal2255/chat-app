import React from 'react'
import CommonForm from '../component/CommonForm';
import { FaUser,FaEnvelope,FaLock } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';
const SingUp = () => {
    const {isSigningUp,signup} =useAuthStore()
    console.log('singup components')
    const fields = [
        { name: "name", type: "text", placeholder: "Name", icon: <FaUser /> },
        { name: "email", type: "email", placeholder: "Email", icon: <FaEnvelope /> },
        { name: "password", type: "password", placeholder: "Password", icon: <FaLock /> },
      ];
    
      const handleSignup = (data) => {
        try {
          
          signup(data)
        } catch (error) {
          console.log('error in to the function',error)
        }
      };
    
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>
        <CommonForm fields={fields} onSubmit={handleSignup} buttonText="Sign Up" />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
          You have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              You have Already Registered
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SingUp
