'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

interface Post {
  id: number;
  content: string;
  image: string | null;
  user_id: number;
  like_count: number; // Add this line
}

export default function PostDisplay() {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/post');
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setError('Invalid data format received from the server');
        }
      } catch (err) {
        setError('Error fetching posts.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p> <div className="flex items-center justify-center flex-grow">
    {/* Simple spinner for loading */}
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-4 mx-56 my-10  ">
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 bg-white dark:bg-gray-950 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
            <div className=''>
            <p className="mb-2 text-gray-800 dark:text-gray-200 py-2  ">{post.content.split(' ').slice(0, 30).join(' ')}...</p>
            <button className='text-blue-800 dark:text-blue-600 py-2'>View More</button>
            </div>
           
            {post.image && (
              <img
                src={`/uploads/${post.image}`} // Assuming the image is stored in /public/uploads
                alt="Post"
                className="max-h-60 w-full object-cover rounded-md py-2"
              />
            )}

            {/*like button */}
            <div className='flex items-center '>
              {/* also add the image of like and comment */}
              <div className='flex items-center space-x-2  px-6 py-2'>
              <LikeButton id={post.id} initialLikes={post.like_count} />
              </div>
            {/*comment button */}
            <div className='px-6 py-2'>
            <CommentButton onOpenComments={() => {}} />
            </div>
            {/* Add the Author logic here after getting the user details */}
            {/* <div>
              <p>Author</p>
              <p>{post.id}</p>
              </div> */}
            
            </div>
          </div>
        ))
      )}
    </div>
  );
}
