import React from 'react'

const ChatHeader = ({userName,profilePic}) => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-black text-white rounded-t-md">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
            <img src={profilePic } alt="profilePic" className='rounded-full' />
          </div>
          <div>
            <p className="font-medium text-lg">{userName}</p>
            <p className="text-sm text-gray-200">Online</p>
          </div>
        </div>
        <button className="text-white hover:bg-indigo-500 p-2 rounded-md">
          Options
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
