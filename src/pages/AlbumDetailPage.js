import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAlbumWithRetry } from '../dto/AlbumDetailDTO';
import ErrorPage from './ErrorPage';
import './AlbumDetailPage.css';

export default function AlbumDetailPage() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlbum = async () => {
            try {
                setLoading(true);
                const albumData = await fetchAlbumWithRetry(id, 2);
                setAlbum(albumData);
            } catch (err) {
                setError(err.message || 'Failed to load album');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadAlbum();
        }
    }, [id]);

    if (loading) {
        return <div className="loading">Loading album...</div>;
    }

    if (error) {
        return <ErrorPage message={`Album Error: ${error}`} />;
    }

    if (!album) {
        return <ErrorPage message="Album not found" />;
    }

    return (
        <div className="album-detail-page">
            <div className="album-container">
                <Link to="/albums" className="back-button">← Back to Albums</Link>

                <div className="album-card">
                    <div className="album-cover">
                        <div className="album-placeholder">
                            <span className="album-id">{album.id}</span>
                        </div>
                    </div>

                    <div className="album-info">
                        <div className="album-meta">
                            <span className="meta-label">ALBUM</span>
                        </div>
                        <h1 className="album-title">{album.title}</h1>

                        <div className="album-details">
                            <div className="detail-row">
                                <span className="detail-label">Album ID:</span>
                                <span className="detail-value">{album.id}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Artist (User):</span>
                                <Link to={`/user/${album.userId}`} className="detail-link">
                                    User {album.userId}
                                </Link>
                            </div>
                        </div>

                        <div className="album-actions">
                            <button className="play-button">▶ Play</button>
                            <button className="share-button">♥ Like</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
