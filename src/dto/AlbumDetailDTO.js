export function mapAlbumDetailFromApi(raw) {
    return {
        id: raw.id,
        title: raw.title || '',
        userId: raw.userId
    };
}

export async function fetchAlbumWithRetry(albumId, maxRetries = 2) {
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Failed to fetch album`);
            }
            const data = await response.json();
            if (!data.id) {
                throw new Error('Invalid album data received');
            }
            return mapAlbumDetailFromApi(data);
        } catch (err) {
            lastError = err;
            if (attempt < maxRetries) {
                // Wait a bit before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)));
            }
        }
    }
    throw lastError || new Error('Failed to fetch album after retries');
}
