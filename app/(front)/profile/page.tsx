import React from 'react';
import UserProfile from '@/components/base/UserProfile';
import PostList from '@/components/base/PostList';


export default function ProfilePage() {
  // Mocked user data, replace this with actual user data from API or database
  const user = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    bio: "I love coding and sharing my thoughts!",
    image: "/images/profile-picture.jpg", // Placeholder image URL
    posts: [
      { id: 1, content: "Just posted my first thread!", created_at: new Date() },
      { id: 2, content: "Hello, world! Loving this new platform.", created_at: new Date() },
    ],
    followers: 120,
    following: 80,
    postCount: 10
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full p-4">
        {/* User Profile Information */}
        <UserProfile user={user} />

        

        {/* List of User's Posts */}
        <PostList posts={user.posts} />
      </div>
    </div>
  );
}
