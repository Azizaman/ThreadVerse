import React from 'react'
import UserListCard from '../common/UserListcard'

export default function RightSidebar() {
  return (
    <div className="h-screen flex px-6 w-72">

      <div className="border-l border-gray-200 dark:border-gray-800 h-full"></div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Suggested For You</h2>
        {/* Add your sidebar content here */}
        <UserListCard/>
      </div>
    </div>
  )
}