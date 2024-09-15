// components/CommentSection.js

import { useState, useEffect } from 'react';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    // Fetch comments from the server
    const fetchComments = async () => {
        const response = await fetch('/api/comments');
        const data = await response.json();
        setComments(data);
    };

    // Add new comment to the server
    const addComment = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        const response = await fetch('/api/comments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newComment }),
        });

        if (response.ok) {
            setNewComment('');  // Clear input
            fetchComments();  // Refresh comments
        }
    };

    // Toggle showing comments
    const toggleComments = () => {
        setShowComments(!showComments);
        if (!showComments) fetchComments();
    };

    return (
        <div>
            <h2>Comments Section</h2>

            {/* Form for adding a comment */}
            <form onSubmit={addComment}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {/* Button to show or hide comments */}
            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>

            {/* Display comments when the button is clicked */}
            {showComments && (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment._id}>{comment.content}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentSection;
