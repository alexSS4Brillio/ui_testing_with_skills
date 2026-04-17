import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostsPage.css';

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="posts-page">
            <h2>Social Media Posts</h2>
            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <div className="post-header">
                            <h3 className="post-title">{post.title}</h3>
                            <Link
                                to={`/user/${post.userId}`}
                                className="user-link"
                            >
                                View Author (User {post.userId})
                            </Link>
                        </div>
                        <div className="post-body">
                            <p>{post.body}</p>
                        </div>
                        <div className="post-footer">
                            <span className="post-id">Post ID: {post.id}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}