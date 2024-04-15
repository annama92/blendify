# Back-end

## Use cases
* Login
* Fetch songs with specific attributes
    * already in user-library
    * similar to user preferences
* Create new playlist from given songs in user account

## Endpoints

--- 
    
`GET /auth/code`: Navigate to this page to prompt the user to login. The user must be authenticated through this endpoint before using any other part of the API.

---

`GET /api/tracks`: Get all of the users "Liked Songs" and their audio features.
<details>

### Request Example
```http
GET /api/tracks HTTP/1.1
Content-Type: application/json
Host: <DOMAIN_NAME>:<PORT>
```

### Response Example

See [the official Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track) for more details on what each track object contains.
Note that this API additionally includes a `features` object on each track object that describes the track's audio features.
```json
{
    "tracks": [
        {
            "album": {
            "album_type": "album",
            "artists": [
                {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1anyVhU62p31KFi8MEzkbf"
                },
                "href": "https://api.spotify.com/v1/artists/1anyVhU62p31KFi8MEzkbf",
                "id": "1anyVhU62p31KFi8MEzkbf",
                "name": "Chance the Rapper",
                "type": "artist",
                "uri": "spotify:artist:1anyVhU62p31KFi8MEzkbf"
                }
            ],
            "available_markets": ["CA", "US"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/71QyofYesSsRMwFOTafnhB"
            },
            "href": "https://api.spotify.com/v1/albums/71QyofYesSsRMwFOTafnhB",
            "id": "71QyofYesSsRMwFOTafnhB",
            "images": [
                {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273e71dd15fc5bdefd5bff70452",
                "width": 640
                },
                {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02e71dd15fc5bdefd5bff70452",
                "width": 300
                },
                {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851e71dd15fc5bdefd5bff70452",
                "width": 64
                }
            ],
            "name": "Coloring Book",
            "release_date": "2016-05-27",
            "release_date_precision": "day",
            "total_tracks": 14,
            "type": "album",
            "uri": "spotify:album:71QyofYesSsRMwFOTafnhB"
            },
            "artists": [
            {
                "external_urls": {
                "spotify": "https://open.spotify.com/artist/1anyVhU62p31KFi8MEzkbf"
                },
                "href": "https://api.spotify.com/v1/artists/1anyVhU62p31KFi8MEzkbf",
                "id": "1anyVhU62p31KFi8MEzkbf",
                "name": "Chance the Rapper",
                "type": "artist",
                "uri": "spotify:artist:1anyVhU62p31KFi8MEzkbf"
            },
            {
                "external_urls": {
                "spotify": "https://open.spotify.com/artist/3KV3p5EY4AvKxOlhGHORLg"
                },
                "href": "https://api.spotify.com/v1/artists/3KV3p5EY4AvKxOlhGHORLg",
                "id": "3KV3p5EY4AvKxOlhGHORLg",
                "name": "Jeremih",
                "type": "artist",
                "uri": "spotify:artist:3KV3p5EY4AvKxOlhGHORLg"
            },
            {
                "external_urls": {
                "spotify": "https://open.spotify.com/artist/23EA28263XvtIrXuySX6oI"
                },
                "href": "https://api.spotify.com/v1/artists/23EA28263XvtIrXuySX6oI",
                "id": "23EA28263XvtIrXuySX6oI",
                "name": "Francis and the Lights",
                "type": "artist",
                "uri": "spotify:artist:23EA28263XvtIrXuySX6oI"
            }
            ],
            "available_markets": ["CA", "US"],
            "disc_number": 1,
            "duration_ms": 290316,
            "explicit": true,
            "external_ids": {
            "isrc": "TCACO1667426"
            },
            "external_urls": {
            "spotify": "https://open.spotify.com/track/2fl0B0OaXjWbjHCQFx2O8W"
            },
            "href": "https://api.spotify.com/v1/tracks/2fl0B0OaXjWbjHCQFx2O8W",
            "id": "2fl0B0OaXjWbjHCQFx2O8W",
            "is_local": false,
            "name": "Summer Friends (feat. Jeremih & Francis & The Lights)",
            "popularity": 61,
            "preview_url": "https://p.scdn.co/mp3-preview/fc02e5dc07c9e199675efbe82b78f21ecbe50fb5?cid=91f6137eb4cb4c009163ce034a6117fe",
            "track_number": 3,
            "type": "track",
            "uri": "spotify:track:2fl0B0OaXjWbjHCQFx2O8W",
            "features": {
                "acousticness": 0.675,
                "danceability": 0.693,
                "energy": 0.426,
                "instrumentalness": 0.0000103,
                "speechiness": 0.302,
                "tempo": 144.796,
                "valence": 0.477
            }
        }
    ]
}
```
</details>

---

`GET /api/recommendations`: Get song recommendations from seed values and target audio features.

<details>

### Query

**seed_artists** *string*

* A comma-separated list of Spotify IDs for seed artists. 1 to 5 seed values between artists, genres, and tracks must be provided.

**seed_genres** *string*

* A comma-separated list of genre seeds (see `GET /api/recommendations/genre-seeds`). 1 to 5 seed values between artists, genres, and tracks must be provided.

**seed_tracks** *string*

* A comma-separated list of Spotify IDs for seed tracks. 1 to 5 seed values between artists, genres, and tracks must be provided.

**limit** *number\<integer\>*

* The number of tracks to recommend. Minimum: 1, Maximum: 100, Default: 20.

**acousticness** *number\<float\>*

* A value between 0.0 and 1.0 measuring acousticness (1.0 = most acoustic).

**danceability** *number\<float\>*

* A value between 0.0 and 1.0 measuring how suitable tracks are for dancing (1.0 = most danceable).

**energy** *number\<float\>*

* A value between 0.0 and 1.0 measuring intensity/activity (1.0 = most energetic).

**instrumentalness** *number\<float\>*

* A value between 0.0 and 1.0 measuring the abscence of vocals (1.0 = no vocals).

**popularity** *number\<integer\>*

* A value between 0 and 100 measuring popularity of the track (100 = most popular).

**speechiness** *number\<float\>*

* A value between 0.0 and 1.0 measuring the amount of spoken words
    * 0.0-0.33 = music and other non-speech like tracks
    * 0.33-0.66 = tracks with both music and speech, either in sections or layered (e.g. rap music)
    * 0.66-1.0 = tracks made up entirely of spoken words

**tempo** *number\<float\>*

* The overall estimated BPM of the track (e.g. 140.239).

**valence** *number\<float\>*

* A value between 0.0 and 1.0 measuring positivity/happiness (1.0 = most positive).

### Request Example
```http
GET /api/recommendations?seed_genres=pop,jazz&danceability=0.7&valence=0.3 HTTP/1.1
Content-Type: application/json
Host: <DOMAIN_NAME>:<PORT>
```

### Response Example

See [the official Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track) for more details on what each track object contains.
Note that this API additionally includes a `features` object on each track object that describes the track's audio features.

```json
{
    "tracks": [
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/73sIBHcqh3Z3NyqHKZ7FOL"
                        },
                        "href": "https://api.spotify.com/v1/artists/73sIBHcqh3Z3NyqHKZ7FOL",
                        "id": "73sIBHcqh3Z3NyqHKZ7FOL",
                        "name": "Childish Gambino",
                        "type": "artist",
                        "uri": "spotify:artist:73sIBHcqh3Z3NyqHKZ7FOL"
                    }
                ],
                "available_markets": [],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/5GBcqixIFDPEom7AUNbFiM"
                },
                "href": "https://api.spotify.com/v1/albums/5GBcqixIFDPEom7AUNbFiM",
                "id": "5GBcqixIFDPEom7AUNbFiM",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273b81f8fd4b6c69c0eabb592ba",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02b81f8fd4b6c69c0eabb592ba",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851b81f8fd4b6c69c0eabb592ba",
                        "width": 64
                    }
                ],
                "name": "Kauai",
                "release_date": "2014-10-03",
                "release_date_precision": "day",
                "total_tracks": 7,
                "type": "album",
                "uri": "spotify:album:5GBcqixIFDPEom7AUNbFiM"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/73sIBHcqh3Z3NyqHKZ7FOL"
                    },
                    "href": "https://api.spotify.com/v1/artists/73sIBHcqh3Z3NyqHKZ7FOL",
                    "id": "73sIBHcqh3Z3NyqHKZ7FOL",
                    "name": "Childish Gambino",
                    "type": "artist",
                    "uri": "spotify:artist:73sIBHcqh3Z3NyqHKZ7FOL"
                }
            ],
            "available_markets": [],
            "disc_number": 1,
            "duration_ms": 252013,
            "explicit": false,
            "external_ids": {
                "isrc": "USYAH1400031"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/6olUplztLFFfU7fMYmFXOP"
            },
            "href": "https://api.spotify.com/v1/tracks/6olUplztLFFfU7fMYmFXOP",
            "id": "6olUplztLFFfU7fMYmFXOP",
            "is_local": false,
            "name": "Sober",
            "popularity": 0,
            "preview_url": null,
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:6olUplztLFFfU7fMYmFXOP",
            "features": {
                "acousticness":0.927,
                "danceability":0.0742,
                "energy":0.0363,
                "instrumentalness":0.777,
                "speechiness":0.0431,
                "tempo":78.927,
                "valence":0.0278
            }
        }
    ]
}
```

</details>

---
`GET /api/recommendations/genre-seeds`: Get a list of strings that can be used as genre seeds for `GET /api/recommendations`

<details>

### Request Example
```http
GET /api/recommendations/genre-seeds HTTP/1.1
Content-Type: application/json
Host: <DOMAIN_NAME>:<PORT>
```

### Response Example
```json
{
    "genres": [
        "acoustic",
        "classical",
        "pop"
    ]
}
```

</details>

---
`POST /api/playlist`: Create a new playlist with specified tracks.

<details>

### Body

**name** *string* (required)

* The name of the new playlist.

**description** *string*

* The description of the new playlist.

**uris** *array of strings* (required)

* A JSON array of 1 or more Spotify URIs to add to the new playlist. Note that the Spotify URI of each track is included in the track object returned from `GET /api/recommendations` and `GET /api/tracks`.

### Request Example
```http
POST /api/playlist HTTP/1.1
Content-Type: application/json
Host: <DOMAIN_NAME>:<PORT>
Content-Length: 169

{
    "name": "JazzStep",
    "description": "One small step for man, two Giant Steps for Coltrane",
    "uris": [
        "spotify:track:592fFAK3lU3A92Kjvqy8ci"
    ]
}

```

### Response Example

The response contains the playlist object of the newly created playlist. See [the official Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist) for more details on what the playlist object contains.

```json
{
    "collaborative": false,
    "description": "One small step for man, two Giant Steps for Coltrane",
    "external_urls": {
        "spotify": "https://open.spotify.com/playlist/2T63llkbTsY6K9v64NDGen"
    },
    "followers": {
        "href": null,
        "total": 0
    },
    "href": "https://api.spotify.com/v1/playlists/2T63llkbTsY6K9v64NDGen",
    "id": "2T63llkbTsY6K9v64NDGen",
    "images": [],
    "name": "JazzStep",
    "owner": {
        "display_name": "took-the-a-trane",
        "external_urls": {
            "spotify": "https://open.spotify.com/user/johncoltrane"
        },
        "href": "https://api.spotify.com/v1/users/johncoltrane",
        "id": "johncoltrane",
        "type": "user",
        "uri": "spotify:user:johncoltrane"
    },
    "primary_color": null,
    "public": true,
    "snapshot_id": "MSwwMWNhOTg2NDIyY2ExYjViNjlmMmZhZjc1NWViODU4MGQzMjhiNTdj",
    "tracks": {
        "href": "https://api.spotify.com/v1/playlists/2T63llkbTsY6K9v64NDGen/tracks",
        "items": [],
        "limit": 100,
        "next": null,
        "offset": 0,
        "previous": null,
        "total": 0
    },
    "type": "playlist",
    "uri": "spotify:playlist:2T63llkbTsY6K9v64NDGen"
}
```

</details>

---
## Authorization Details


### Login

The application uses [authorization code flow](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/) with Spotify's implementation of the OAuth 2.0 framework. The `GET /auth/code` endpoint retrieves an authentication code using the user's credentials. On authentication, the application is redirected to the `GET /auth/token` endpoint to exchange the code for an authentication token. The token is then stored in the `authToken` session variable.

The access token expires in one hour. An expired access token can be refreshed with a refresh token supplied in the authorization token. The new authorization token containing the fresh access token will be saved to the `authToken` session variable.

The user should not have to refresh the token manually. Any API calls through this backend will check if the access token is expired and will perform a token refresh (if required) before sending a request to the Spotify API.

`authToken` is an object with the following properties:
```typescript
session.authToken = {
    // The access token to be provided in subsequent API calls
    accessToken: string,
    // A space-separated list of scopes which have been granted for this access token
    // (e.g. 'user-library-read playlist-modify-private')
    scope: string, 
    // The unix timestamp when the access token will expire
    expiry: number,
    // A token that can be sent in place of an authorization code to refresh
    // an expiring access token
    refreshToken: string
}
```
Any Spotify API request must contain the following Authorization header (see [How to use the Access Token](https://developer.spotify.com/documentation/general/guides/authorization/use-access-token/)):
```
Authorization: Bearer <accessToken>
```
