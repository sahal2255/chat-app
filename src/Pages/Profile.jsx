import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
    const {authUser}=useAuthStore()
  return (
    <div>
      profile page
    </div>
  )
}

export default Profile
