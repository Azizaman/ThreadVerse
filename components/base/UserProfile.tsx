import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface UserProfileProps {
  user: {
    name: string;
    username: string;
    bio: string;
    image: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      {/* Profile Picture */}
      {/* <img
        src={user.image}
        alt={user.name.slice(0, 1)}
        className="w-24 h-24 rounded-full object-cover"
      /> */}
      <Avatar className="w-12 h-12 rounded-full object-cover">
        <AvatarImage src={user.image} />
        <AvatarFallback>
          {user.name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>
        {/* Name and Username */}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        

        {/* Bio */}
        <p className="mt-2 text-gray-700">{user.bio}</p>
      </div>
    </div>
  );
}
