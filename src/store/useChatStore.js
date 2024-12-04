import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isCheckingAuth:true,

    getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            const res=await axiosInstance.get('/messages/users')
            console.log(res.data)
            set({users:res.data})
        } catch (error) {
            console.log('error in the fetching user',error)
            toast.error(error.response.data.message)
        } finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data})
        } catch (error) {
            
        } finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async(messageData)=>{
        const {selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    onMessages:async()=>{
        const {selectedUser}=get()
        if(!selectedUser) return
        const socket=useAuthStore.getState().socket

        socket.on('newMessage',(newMessage)=>{
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },
    offMessages:async()=>{
        const socket=useAuthStore.getState().socket
        socket.off('newMessage')
    },
    setSelectedUser:(selectedUser)=>set({selectedUser }),
}))
export default useChatStore