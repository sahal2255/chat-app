import { create } from "zustand";
import axiosInstance from '../lib/axios'
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
        set({isLoggingIn:true})
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
    },
    updateProfilePic:async(data)=>{
        console.log('data in to the ',data)
        
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            
        } catch (error) {
            console.log('error in the update profile',error)
        }
    }
}));
