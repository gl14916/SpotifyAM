var SpotifyAM = (client_id, client_secret, isrc) => {
    var xhttp = new XMLHttpRequest();
    var access_token;
    xhttp.open("POST", 'https://accounts.spotify.com/api/token', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhttp.onload = () => {
        if (xhttp.status == 200) {
            access_token = JSON.parse(xhttp.responseText).access_token;
            getSpotifySongUrlFromIsrc(isrc, access_token);
        }
        else {
            console.log(xhttp.response);
        }
    }
    xhttp.send("grant_type=client_credentials");
    
    function getSpotifySongUrlFromIsrc(song_isrc, token) {
        var xhttpForSong = new XMLHttpRequest();
        xhttpForSong.open("GET", "https://api.spotify.com/v1/search?type=track&q=isrc:" + song_isrc, true);
        xhttpForSong.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttpForSong.setRequestHeader("Authorization", "Bearer " + token);
        xhttpForSong.onload = () => {
            if (xhttpForSong.status == 200) {
                shareFromSongInfoJson(JSON.parse(xhttpForSong.responseText));
            }
            else {
                console.log(xhttpForSong.response);
            }
        }
        xhttpForSong.send();
    }

    function shareFromSongInfoJson(searchResult) {
        if (!!searchResult) {
            var shareUrl = searchResult.tracks.items[0].external_urls.spotify;
            console.log(shareUrl);
        }
    }
}
SpotifyAM("[Client_ID]", "[Client_Secret]", "[ISRC]");
