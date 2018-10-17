(() => {
    document.getElementById("submit").addEventListener("click", () => {
        getInfo(document.querySelector('input[name="type"]:checked').value)(
            document.getElementById("client_id").value,
            document.getElementById("client_secret").value,
            document.getElementById("lookup_id").value
        )
    })

    var getInfo = (option) => {
        switch(option) {
            case "playlist":
                return getPlaylist;
            case "isrc":
                return getSongWithISRC;
            default:
                return getPlaylist;
        }
    }

    var getSongWithISRC = (clientId, clientSecret, isrc) => {
        if (!clientId || !clientSecret || !isrc) {
            console.error("missing argument!");
            return;
        }
        SpotifyAM(clientId, clientSecret, isrc);
        // other actions

    }
    var getPlaylist = (clientId, clientSecret, playlistId) => {
        if (!clientId || !clientSecret || !playlistId) {
            console.error("missing argument!");
            return;
        }
        SpotifyPlaylist(clientId, clientSecret, playlistId);
        // other actions
    }
})();