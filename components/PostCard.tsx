import React, { useState } from 'react';
import { Post, Comment as CommentType, User } from '../types';
import { HeartIcon, CommentIcon, SendIcon, ShareIcon } from './Icons';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => (
    <div className="flex items-start space-x-3 space-x-reverse mt-4">
        <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-8 h-8 rounded-full" />
        <div className="flex-1 bg-gray-100 rounded-lg p-2">
            <p className="font-semibold text-sm text-gray-800">{comment.author.name}</p>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.text}</p>
        </div>
    </div>
);

const CommentForm: React.FC<{
  currentUserAvatar: string;
  onSubmit: (text: string) => void;
}> = ({ currentUserAvatar, onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 space-x-reverse mt-4">
      <img src={currentUserAvatar} alt="Your Avatar" className="w-8 h-8 rounded-full" />
      <div className="relative flex-1">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="اكتب تعليقاً..."
          className="w-full py-2 ps-4 pe-12 border border-gray-300 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
        />
        <button type="submit" className="absolute end-2 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-800 disabled:text-gray-400" disabled={!commentText.trim()}>
            <SendIcon className="w-6 h-6 transform -rotate-45"/>
        </button>
      </div>
    </form>
  );
};


export const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onToggleLike, onAddComment }) => {
    const [showComments, setShowComments] = useState(false);

    const handleAddComment = (text: string) => {
        onAddComment(post.id, text);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `منشور من ${post.author.name} في ميدان`,
                    text: post.text,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('خاصية المشاركة غير مدعومة في متصفحك.');
        }
    };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full" />
            <div>
                <p className="font-bold text-gray-800">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
        </div>

        <p className="text-gray-800 mb-4 whitespace-pre-wrap text-lg">{post.text}</p>

        {post.imageUrl && (
            <div className="my-4 -mx-4 sm:mx-0">
                <img src={post.imageUrl} alt="محتوى المنشور" className="w-full h-auto max-h-[600px] object-cover sm:rounded-lg" />
            </div>
        )}

        <div className="flex justify-between items-center text-gray-500 text-sm mb-2 px-2">
            <div>
                {post.likes > 0 && `❤️ ${post.likes} إعجاب`}
            </div>
            <button onClick={() => setShowComments(true)} className="hover:underline">
                {post.comments.length > 0 && `${post.comments.length} تعليقات`}
            </button>
        </div>

        <hr />

        <div className="flex justify-around items-center pt-2 text-gray-600 font-semibold">
            <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center space-x-2 space-x-reverse hover:bg-red-50/50 hover:text-red-500 transition-colors duration-200 p-2 rounded-lg w-full justify-center ${post.isLiked ? 'text-red-500' : ''}`}
            >
                <HeartIcon isLiked={post.isLiked} className={post.isLiked ? 'transform scale-110' : ''}/>
                <span>أعجبني</span>
            </button>
            <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 space-x-reverse hover:bg-teal-50/50 hover:text-teal-600 transition-colors duration-200 p-2 rounded-lg w-full justify-center"
            >
                <CommentIcon />
                <span>تعليق</span>
            </button>
            <button
                onClick={handleShare}
                className="flex items-center space-x-2 space-x-reverse hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg w-full justify-center"
            >
                <ShareIcon />
                <span>مشاركة</span>
            </button>
        </div>

        {showComments && (
            <div className="pt-4 mt-2 border-t">
                <CommentForm currentUserAvatar={currentUser.avatarUrl} onSubmit={handleAddComment} />
                <div className="mt-4 space-y-2">
                    {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                </div>
            </div>
        )}
    </div>
  );
};