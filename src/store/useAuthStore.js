import { create } from "zustand";
import axiosInstance from '../lib/axios'
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res=await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log('error in checkAuth',error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
        console.log('stroe data',data)
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success('Account Created Successfully')
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error in the singup',error)
        }
    },
    login:async(data)=>{
        try {
            const res=await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success('Logging in Successfully')
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error in the loginig function',error)
        }
    },
    logout:async()=>{
        try {
            const res=await axiosInstance.post('/auth/logout')
            set({authUser:null})
            toast.success('Logout Successfully')
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error in the logout section')
        }
    }
}));
