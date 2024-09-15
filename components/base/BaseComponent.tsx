import React from 'react';
import RightSidebar from './RightSidebar';
import AddThreads from '../threads/AddThreads';
import PostDisplay from './PostDisplay';

export default function BaseComponent() {
  return (
    <div className="flex ">
     

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-full">
        <main className="p-4">
          <AddThreads />
          <PostDisplay />
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 h-full sticky top-0">
        <RightSidebar />
      </div>
    </div>
  );
}
