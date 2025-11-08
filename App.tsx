
import React, { useState } from 'react';
import { Post, User } from './types';
import { Header } from './components/Header';
import { PostForm } from './components/PostForm';
import { PostCard } from './components/PostCard';

const CURRENT_USER: User = {
    id: 'user-0',
    name: 'أنت',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
};

const INITIAL_POSTS: Post[] = [
    {
        id: 'post-1',
        text: 'مرحباً بكم في ميدان! منصة جديدة للتعبير ومشاركة الأفكار. أتمنى أن ينال إعجابكم.',
        imageUrl: 'https://picsum.photos/id/10/800/600',
        author: { id: 'user-1', name: 'علي محمد', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
        timestamp: 'منذ 5 دقائق',
        likes: 15,
        isLiked: false,
        comments: [
            { 
                id: 'comment-1', 
                text: 'فكرة رائعة! بالتوفيق.', 
                author: { id: 'user-2', name: 'فاطمة الزهراء', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, 
                timestamp: 'منذ 3 دقائق'
            },
        ],
    },
    {
        id: 'post-2',
        text: 'ما هو أفضل كتاب قرأتموه هذا العام؟ أبحث عن توصيات جديدة.',
        author: { id: 'user-3', name: 'خالد عبد الله', avatarUrl: 'https://picsum.photos/id/1012/100/100' },
        timestamp: 'منذ ساعتين',
        likes: 32,
        isLiked: true,
        comments: [
            { 
                id: 'comment-2', 
                text: 'أنصحك بكتاب "فن اللامبالاة".', 
                author: { id: 'user-4', name: 'سارة أحمد', avatarUrl: 'https://picsum.photos/id/1025/100/100' }, 
                timestamp: 'منذ ساعة' 
            },
            { 
                id: 'comment-3', 
                text: 'ثلاثية غرناطة لرضوى عاشور، عمل خالد.', 
                author: { id: 'user-1', name: 'علي محمد', avatarUrl: 'https://picsum.photos/id/1011/100/100' }, 
                timestamp: 'منذ 30 دقيقة'
            },
        ],
    },
];

const App: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

    const handleCreatePost = (text: string, imageUrl?: string) => {
        const newPost: Post = {
            id: `post-${Date.now()}`,
            text,
            imageUrl,
            author: CURRENT_USER,
            timestamp: 'الآن',
            likes: 0,
            isLiked: false,
            comments: [],
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handleToggleLike = (postId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                };
            }
            return post;
        }));
    };

    const handleAddComment = (postId: string, text: string) => {
        const newComment = {
            id: `comment-${Date.now()}`,
            text,
            author: CURRENT_USER,
            timestamp: 'الآن',
        };
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, newComment],
                };
            }
            return post;
        }));
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container mx-auto p-4 md:p-6">
                <div className="max-w-2xl mx-auto">
                    <PostForm currentUser={CURRENT_USER} onCreatePost={handleCreatePost} />
                    <div className="space-y-6">
                        {posts.map(post => (
                            <PostCard
                                key={post.id}
                                post={post}
                                currentUser={CURRENT_USER}
                                onToggleLike={handleToggleLike}
                                onAddComment={handleAddComment}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
