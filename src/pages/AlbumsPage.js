import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mapAlbumFromApi, groupAlbumsByUser } from '../dto/AlbumDTO';
import './AlbumsPage.css';
import ErrorPage from './ErrorPage';

export default function AlbumsPage() {
    const [albums, setAlbums] = useState([]);
    const [groupedAlbums, setGroupedAlbums] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/albums');
                if (!response.ok) {
                    throw new Error('Failed to fetch albums');
                }
                const data = await response.json();
                const normalized = data.map(mapAlbumFromApi);
                setAlbums(normalized);
                setGroupedAlbums(groupAlbumsByUser(normalized));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) return <div className="loading">Loading albums...</div>;
    if (error) return <ErrorPage message={error} />;

    const userIds = Object.keys(groupedAlbums).sort((a, b) => Number(a) - Number(b));

    return (
        <div className="albums-page">
            <div className="albums-header">
                <div>
                    <h2>Album Collections</h2>
                    <p className="page-description">
                        Albums are grouped by user. Click any album bubble to view that user's details.
                    </p>
                </div>
                <div className="albums-summary">
                    <span>{albums.length} albums</span>
                    <span>{userIds.length} users</span>
                </div>
            </div>

            <div className="album-bubble-grid">
                {userIds.map((userId) => (
                    <div key={userId} className="user-bubble">
                        <div className="user-bubble-title">
                            <Link to={`/user/${userId}`} className="user-bubble-link">
                                User {userId}
                            </Link>
                            <span>{groupedAlbums[userId].length} albums</span>
                        </div>

                        <div className="album-bubble-row">
                            {groupedAlbums[userId].map((album) => (
                                <Link
                                    key={album.id}
                                    to={`/album/${album.id}`}
                                    className="album-bubble"
                                    title={album.title}
                                >
                                    {album.id}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
