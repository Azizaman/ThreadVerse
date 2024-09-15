import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import axios from 'axios';

interface PostProps {
  id: number;
  initialLikes: number;
  like_count: number;
}

export default function LikeButton({ id, initialLikes }: PostProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!liked) {
      try {
        const response = await axios.post(`api/post/${id}/like`);
        setLikes(response.data.like_count);
        setLiked(true); // Disable further liking
      } catch (error) {
        console.error('Failed to like the post:', error);
      }
    }
  };

  return (
    <button onClick={handleLike} className={`flex items-center space-x-2 ${liked ? 'text-blue-600' : ''}`}>
      <ThumbsUp />
      <span>{likes}</span>
    </button>
  );
}
