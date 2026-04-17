import './ErrorPage.css';

export default function ErrorPage({ message }) {
    return (
        <div className="error-page">
            <div className="error-card">
                <h2>Something went wrong</h2>
                <p>{message || 'Unable to load the requested content.'}</p>
            </div>
        </div>
    );
}
