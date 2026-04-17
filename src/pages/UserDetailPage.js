import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetailPage.css';

export default function UserDetailPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!response.ok) throw new Error('Failed to fetch user data');
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    if (loading) return <div className="loading">Loading user details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!user) return <div className="error">User not found</div>;

    return (
        <div className="user-detail-page">
            <div className="user-header">
                <Link to="/" className="back-button">← Back to Users</Link>
                <h2>User Details</h2>
            </div>

            <div className="user-card">
                <div className="user-avatar">
                    <div className="avatar-placeholder">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="user-info">
                    <div className="info-section">
                        <h3>Basic Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>ID:</label>
                                <span>{user.id}</span>
                            </div>
                            <div className="info-item">
                                <label>Name:</label>
                                <span>{user.name}</span>
                            </div>
                            <div className="info-item">
                                <label>Username:</label>
                                <span>{user.username}</span>
                            </div>
                            <div className="info-item">
                                <label>Email:</label>
                                <span>{user.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Phone:</label>
                                <span>{user.phone}</span>
                            </div>
                            <div className="info-item">
                                <label>Website:</label>
                                <span><a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></span>
                            </div>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Address</h3>
                        <div className="address-info">
                            <p>{user.address.street}</p>
                            <p>{user.address.suite}</p>
                            <p>{user.address.city}, {user.address.zipcode}</p>
                            <p><strong>Geo:</strong> {user.address.geo.lat}, {user.address.geo.lng}</p>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Company</h3>
                        <div className="company-info">
                            <p><strong>{user.company.name}</strong></p>
                            <p><em>{user.company.catchPhrase}</em></p>
                            <p>{user.company.bs}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}