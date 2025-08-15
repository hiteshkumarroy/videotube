📚 VIDEOTUBE API Documentation
🔑 Authentication

Most routes require a JWT token in the Authorization header:

Authorization: Bearer <your_jwt_token>

🧑‍💻 User Routes
Route	Method	Body / Params	Description
/api/v1/user/register	POST	multipart/form-data
- avatar: file
- coverimage: file
- username: string
- email: string
- password: string	Register a new user
/api/v1/user/login	POST	JSON
{ "email": "", "password": "" }	Login and get JWT tokens
/api/v1/user/logout	POST	Header: JWT token	Logout user
/api/v1/user/changePassword	PUT	JSON
{ "oldPassword": "", "newPassword": "" }	Change user password
/api/v1/user/current-user	GET	Header: JWT token	Get current logged-in user
/api/v1/user/updatedetails	PUT	JSON
{ "username": "", "email": "", "bio": "" }	Update account details
/api/v1/user/updateavatar	PATCH	multipart/form-data
- avatar: file	Update profile avatar
/api/v1/user/updatecoverimage	PATCH	multipart/form-data
- coverimage: file	Update cover image
/api/v1/user/c/:username	GET	URL param: username	Get channel profile of user
/api/v1/user/watchHistory	GET	Header: JWT token	Get user watch history
🎥 Video Routes
Route	Method	Body / Params	Description
/api/v1/videos/	GET	Header: JWT token	Get all videos
/api/v1/videos/publish	POST	multipart/form-data
- videoFile: file
- thumbnail: file
- title: string
- description: string
- category: string	Upload & publish video
/api/v1/videos/:videoId	GET	URL param: videoId	Get video by ID
/api/v1/videos/:videoId	PATCH	multipart/form-data
- thumbnail: file
- title: string
- description: string	Update video details
/api/v1/videos/:videoId	DELETE	URL param: videoId	Delete video
/api/v1/videos/toggle/publish/:videoId	PATCH	URL param: videoId	Toggle video publish status
💬 Comments Routes
Route	Method	Body / Params	Description
/api/v1/comments/:videoId	GET	URL param: videoId	Get comments of a video
/api/v1/comments/:videoId	POST	JSON
{ "text": "" }	Add comment to video
/api/v1/comments/c/:commentId	PATCH	JSON
{ "text": "" }	Update comment
/api/v1/comments/c/:commentId	DELETE	URL param: commentId	Delete comment
❤️ Likes Routes
Route	Method	Body / Params	Description
/api/v1/likes/toggle/v/:videoId	POST	URL param: videoId	Like/unlike a video
/api/v1/likes/toggle/c/:commentId	POST	URL param: commentId	Like/unlike a comment
/api/v1/likes/toggle/t/:tweetId	POST	URL param: tweetId	Like/unlike a tweet
/api/v1/likes/videos	GET	Header: JWT token	Get user liked videos
📂 Playlists Routes
Route	Method	Body / Params	Description
/api/v1/playlist/	POST	JSON
{ "name": "", "description": "" }	Create playlist
/api/v1/playlist/:playlistId	GET	URL param: playlistId	Get playlist by ID
/api/v1/playlist/:playlistId	PATCH	JSON
{ "name": "", "description": "" }	Update playlist
/api/v1/playlist/:playlistId	DELETE	URL param: playlistId	Delete playlist
/api/v1/playlist/add/:videoId/:playlistId	PATCH	URL params: videoId, playlistId	Add video to playlist
/api/v1/playlist/remove/:videoId/:playlistId	PATCH	URL params: videoId, playlistId	Remove video from playlist
/api/v1/playlist/user/:userId	GET	URL param: userId	Get all playlists of user
🔔 Subscriptions Routes
Route	Method	Body / Params	Description
/api/v1/subscriptions/c/:channelId	POST	URL param: channelId	Subscribe/unsubscribe channel
/api/v1/subscriptions/c/:channelId	GET	URL param: channelId	Get channels user is subscribed to
/api/v1/subscriptions/u/:subscriberId	GET	URL param: subscriberId	Get subscribers of a channel
🐦 Tweets Routes
Route	Method	Body / Params	Description
/api/v1/tweets/	POST	JSON
{ "text": "" }	Create tweet
/api/v1/tweets/:tweetId	PATCH	JSON
{ "text": "" }	Update tweet
/api/v1/tweets/:tweetId	DELETE	URL param: tweetId	Delete tweet
/api/v1/tweets/user/:userId	GET	URL param: userId	Get tweets by user
📊 Dashboard Routes
Route	Method	Body / Params	Description
/api/v1/dashboard/stats	GET	Header: JWT token	Get channel statistics
/api/v1/dashboard/videos	GET	Header: JWT token	Get videos of current user's channel

✅ All POST/PATCH requests requiring files must use multipart/form-data.
✅ All protected routes require JWT token in the Authorization header.