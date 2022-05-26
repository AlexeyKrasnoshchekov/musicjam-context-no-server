export interface PlaylistsState {
    playlists: Playlist[],
    owner: string,
    isLoadingPlaylists: boolean,
    failedToLoadPlaylists: boolean
}
export interface PlaylistState {
    playlist: Playlist,
    isLoadingPlaylist: boolean,
    failedToLoadPlaylist: boolean
}

export interface Playlist {
    images: Image[],
    name: string,
    tracks: Track,
    id: string
}
export interface Image {
    url: string,
    height: number,
    width: number
}
export interface Track {
    href: string,
    total: number,
    // items?: TrackItem[]

}

// export interface TrackItem {
//     added_at: string,
//     track: number,
// }