import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import CommentSection from "@/components/base/CommentSection";

export default function CommentButton() {
  return (
    <button onClick={CommentSection} className="flex items-center space-x-2">
      <MessageCircle />
      <span>Comment</span>
    </button>
  );
}
