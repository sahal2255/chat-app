import { create } from "zustand";
import axiosInstance from '../lib/axios'
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL='http://localhost:5001'
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,
    checkAuth: async () => {
        try {
            const res=await axiosInstance.get('/auth/check')
            set({authUser:res.data})
            get().connectSocket()
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
            get().connectSocket()
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

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error in the loginig function',error)
        }
    },
    logout:async()=>{
        try {
            const res=await axiosInstance.post('/auth/logout')
            set({authUser:null})
            get().disconnectSocket()
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
            toast.success('Profile updated successfully')
            
        } catch (error) {
            console.log('error in the update profile',error)
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    connectSocket:async()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return
        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket:socket});

        socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:async()=>{
        if(get().socket?.connect)get().socket.disconnect()
    }

}));
