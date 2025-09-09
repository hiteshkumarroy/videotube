NOTE:frontend is in process,backend is complete.
🎬 VIDEOTUBE | Node.js, Express.js, MongoDB, JWT, Cloudinary, Multer
Node.js Express MongoDB JWT Cloudinary Multer

A full-featured YouTube-like video sharing platform backend with user authentication, video uploads, comments, likes, subscriptions, playlists, tweets and dashboards.

🚀 Live Demo
Live Hosted URL

📝 Features
✅ User
 Register & login with JWT authentication
 Update avatar & cover image
 Change password
 Fetch current user details
 Track watch history
 Fetch user channel profile
✅ Videos
 Upload videos & thumbnails via Cloudinary
 Publish / unpublish videos
 Fetch all videos or specific video by ID
 Update video details
 Delete videos
 Paginated API for performance
✅ Comments
 Add, update, delete comments
 Fetch video comments
 Toggle likes on comments
✅ Likes
 Like/unlike videos, comments, tweets
 Fetch liked videos
✅ Playlists
 Create, update, delete playlists
 Add/remove videos to/from playlists
 Fetch user playlists
 Fetch playlist by ID
✅ Subscriptions
 Subscribe/unsubscribe channels
 Fetch subscribed channels
 Fetch subscribers of a channel
✅ Tweets
 Create, update, delete tweets
 Fetch tweets by user
✅ Dashboard
 Fetch channel stats
 Fetch videos of user's channel
🗂 Tech Stack
Backend	Database	Authentication	Storage
Node.js	MongoDB	JWT	Cloudinary
Express.js	Mongoose	Bcrypt	Multer
REST API	NoSQL	Role-based	File uploads
🔗 API Routes
User
POST /api/v1/user/register
POST /api/v1/user/login
POST /api/v1/user/logout
PUT /api/v1/user/changePassword
GET /api/v1/user/current-user
PUT /api/v1/user/updatedetails
PATCH /api/v1/user/updateavatar
PATCH /api/v1/user/updatecoverimage
GET /api/v1/user/c/:username
GET /api/v1/user/watchHistory
Videos
Edit
GET /api/v1/videos/
POST /api/v1/videos/publish
GET /api/v1/videos/:videoId
PATCH /api/v1/videos/:videoId
DELETE /api/v1/videos/:videoId
PATCH /api/v1/videos/toggle/publish/:videoId
Comments
GET /api/v1/comments/:videoId
POST /api/v1/comments/:videoId
PATCH /api/v1/comments/c/:commentId
DELETE /api/v1/comments/c/:commentId
Likes
POST /api/v1/likes/toggle/v/:videoId
POST /api/v1/likes/toggle/c/:commentId
POST /api/v1/likes/toggle/t/:tweetId
GET /api/v1/likes/videos
Playlists
POST /api/v1/playlist/
PATCH /api/v1/playlist/:playlistId
DELETE /api/v1/playlist/:playlistId
GET /api/v1/playlist/:playlistId
PATCH /api/v1/playlist/add/:videoId/:playlistId
PATCH /api/v1/playlist/remove/:videoId/:playlistId
GET /api/v1/playlist/user/:userId
Subscriptions
POST /api/v1/subscriptions/c/:channelId
GET /api/v1/subscriptions/c/:channelId
GET /api/v1/subscriptions/u/:subscriberId
Tweets
POST /api/v1/tweets/
PATCH /api/v1/tweets/:tweetId
DELETE /api/v1/tweets/:tweetId
GET /api/v1/tweets/user/:userId
Dashboard
GET /api/v1/dashboard/stats
GET /api/v1/dashboard/videos
🗂 ER Diagram

https://app.eraser.io/workspace/xlt1IcLTjN2HGN0TwJLD
⚙️ Installation & Setup Clone the repository:

git clone https://github.com/hiteshkumarroy/videotube.git
Install dependencies:

bash Copy Edit npm install Create a .env file with your credentials:

env
PORT=3000
MONGODB_URI=//your mongodb url
REFRESH_TOKEN_SECRET=//secret
REFRESH_TOKEN_EXPIRY=//expiry time
ACCESS_TOKEN_SECRET=//secret
ACCESS_TOKEN_EXPIRY=expiry time
CLOUDINARY_CLOUD_NAME=//your cloudinary cloud name
CLOUDINARY_API_KEY=//api key cloudinary
CLOUDINARY_API_SECRET=//secret cloudinary
NODE_ENV=development
FRONTEND_URL= //url frontend
Start the server:

npm run dev
To test API'S import "./postmantesting" in postman and test
⚡ Notes All file uploads are managed via Cloudinary.

JWT is required for all protected routes.

Full validation and error handling implemented.
