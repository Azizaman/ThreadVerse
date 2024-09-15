import React from 'react';

interface PostListProps {
  posts: Array<{
    id: number;
    content: string;
    created_at: Date;
  }>;
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow mb-4">
            {/* Post Content */}
            <p className="text-gray-800">{post.content}</p>

            {/* Created At */}
            <p className="text-gray-500 text-sm mt-2">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
