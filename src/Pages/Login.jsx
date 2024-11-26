import React from 'react'
import { FaEnvelope,FaLock ,FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import CommonForm from '../component/CommonForm';

const Login = () => {
    const fields = [
        { name: "email", type: "email", placeholder: "Email", icon: <FaEnvelope /> },
        { name: "password", type: "password", placeholder: "Password", icon: <FaLock /> },
      ];
    const handleLogin = (data) => {
        console.log("Login Data", data);
      };
  return (
    <div>
      
      <CommonForm fields={fields} onSubmit={handleLogin} buttonText="Log In"/>
    </div>
  )
}

export default Login
