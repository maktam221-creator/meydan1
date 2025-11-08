
import React, { useState, useRef } from 'react';
import { SendIcon, ImageIcon, CloseIcon } from './Icons';
import { User } from '../types';


interface PostFormProps {
  currentUser: User;
  onCreatePost: (text: string, imageUrl?: string) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ currentUser, onCreatePost }) => {
  const [postText, setPostText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim() || imagePreview) {
      onCreatePost(postText.trim(), imagePreview ?? undefined);
      setPostText('');
      handleRemoveImage();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4 space-x-reverse">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="بم تفكر؟"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition resize-none"
              rows={3}
            />
            
            {imagePreview && (
              <div className="mt-3 relative">
                <img src={imagePreview} alt="معاينة" className="rounded-lg max-h-80 w-full object-cover border" />
                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="absolute top-2 end-2 bg-gray-900/60 text-white rounded-full p-1 hover:bg-gray-900/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="إزالة الصورة"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 ms-16">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-500 hover:text-teal-600 p-2 rounded-full transition-colors"
            aria-label="إضافة صورة"
          >
            <ImageIcon className="w-6 h-6" />
          </button>
          <button
            type="submit"
            disabled={!postText.trim() && !imagePreview}
            className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span>نشر</span>
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
