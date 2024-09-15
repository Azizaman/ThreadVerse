'use client'
import React, { useState } from 'react';
import { Send, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from '../common/UserAvatar';
import axios from 'axios'; // Import axios

export default function PostInput() {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState<File | null>(null); // Store the image as a File object
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handlePostTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!postText && !image) {
      alert('Please add some content or an image to post.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a new FormData object to send text and image together
      const formData = new FormData();
      formData.append('content', postText); // Append the post text
      if (image) {
        formData.append('image', image); // Append the image if available
      }

      // Send the form data to your backend using axios
      const response = await axios.post('/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success
      console.log('Post created successfully!', response.data);
      alert('Post created successfully!');

      // Reset the form
      setPostText('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Error submitting post. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <div className="p-4 mx-56 my-28 shadow-lg bg-white dark:bg-gray-950 rounded-3xl border-gray-200 dark:border-gray-800">
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-950">
        <div className="flex-shrink-0">
          <UserAvatar name="aman" />
        </div>
        <div className="flex-1">
          <Input
            type="text"
            placeholder="What's on your mind?"
            value={postText}
            onChange={handlePostTextChange}
            className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {image && (
            <div className="mt-2 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Post"
                className="max-h-40 w-full object-contain rounded-md"
              />
              <button
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Image className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Add image
              </span>
            </label>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting} // Disable the button during submission
            >
              <Send className="h-5 w-5 mr-2" />
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
