var SpotifyPlaylist = (client_id, client_secret, playlist_id) => {
    var song_list = [];
    var xhttp = new XMLHttpRequest();
    var access_token;
    xhttp.open("POST", 'https://accounts.spotify.com/api/token', false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhttp.onload = () => {
        if (xhttp.status == 200) {
            access_token = JSON.parse(xhttp.responseText).access_token;
            getSpotifySongInfoFromPlaylistId(playlist_id, access_token);
        }
        else {
            console.log(xhttp.response);
        }
    }
    xhttp.send("grant_type=client_credentials");
    
    function getSpotifySongInfoFromPlaylistId(id, token) {
        var url = "https://api.spotify.com/v1/playlists/" + id + "/tracks?";
        var fields = "fields=items(track(name,artists,external_urls)),next";
        var next = url + fields;
        while (next != null) {
            next = xHttp(next, token);
        };
    }
    function xHttp(url, token) {
        var next_url = null;
        var xhttpForSongList = new XMLHttpRequest();
        xhttpForSongList.open("GET", url, false);
        xhttpForSongList.setRequestHeader("Content-Type", "application/json");
        xhttpForSongList.setRequestHeader("Accept", "application/json")
        xhttpForSongList.setRequestHeader("Authorization", "Bearer " + token);
        xhttpForSongList.onload = () => {
            if (xhttpForSongList.status == 200) {
                next_url = handleResponse(JSON.parse(xhttpForSongList.responseText));
            }
            else {
                console.log(xhttpForSongList.response);
            }
        }
        xhttpForSongList.send();
        return next_url;
    }

    function handleResponse(result) {
        var next_url = null;
        if (!!result) {
            result.items.forEach(e => {
                try {
                    var song_info = {};
                    var artists = [];
                    e.track.artists.forEach(el => {
                        artists.push(el.name);
                    });
                    song_info.name = e.track.name;
                    song_info.artists = artists;
                    song_info.href = e.track.external_urls.spotify;
                    song_list.push(song_info);
                }
                catch (err) {
                    console.error(err);
                    console.log("No info!");
                }
            });
            next_url = result.next;
        }
        return next_url;
    }

    song_list.forEach(e => { console.log(e) });
}
//SpotifyPlaylist("[Client_ID]", "[Client_Secret]", "[ISRC]");