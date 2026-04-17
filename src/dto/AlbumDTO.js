export function mapAlbumFromApi(raw) {
    return {
        userId: raw.userId,
        id: raw.id,
        title: raw.title || ''
    };
}

export function groupAlbumsByUser(albums) {
    return albums.reduce((groups, album) => {
        const key = album.userId;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(album);
        return groups;
    }, {});
}
