import React from 'react'
import CommonForm from '../component/CommonForm';
import { FaUser,FaEnvelope,FaLock } from 'react-icons/fa';
const SingUp = () => {
    console.log('singup components')
    const fields = [
        { name: "name", type: "text", placeholder: "Name", icon: <FaUser /> },
        { name: "email", type: "email", placeholder: "Email", icon: <FaEnvelope /> },
        { name: "password", type: "password", placeholder: "Password", icon: <FaLock /> },
      ];
    
      const handleSignup = (data) => {
        console.log("Signup Data", data);
      };
    
  return (
    <div>
      <CommonForm fields={fields} onSubmit={handleSignup} buttonText="Sign Up" />
    </div>
  )
}

export default SingUp
