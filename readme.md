# 🎬 VIDEOTUBE | Node.js, Express.js, MongoDB, JWT, Cloudinary, Multer

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3C68B8?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Multer](https://img.shields.io/badge/Multer-FFA500?style=for-the-badge)](https://www.npmjs.com/package/multer)

A full-featured YouTube-like video sharing platform backend with **user authentication**, **video uploads**, **comments**, **likes**, **subscriptions**, **playlists**, **tweets** and **dashboards**.

---

## 🚀 Live Demo
[Live Hosted URL](https://videotube-8zg7.onrender.com/)

---

## 📝 Features

### ✅ User
- [x] Register & login with **JWT authentication**
- [x] Update avatar & cover image
- [x] Change password
- [x] Fetch current user details
- [x] Track watch history
- [x] Fetch user channel profile

### ✅ Videos
- [x] Upload videos & thumbnails via **Cloudinary**
- [x] Publish / unpublish videos
- [x] Fetch all videos or specific video by ID
- [x] Update video details
- [x] Delete videos
- [x] Paginated API for performance

### ✅ Comments
- [x] Add, update, delete comments
- [x] Fetch video comments
- [x] Toggle likes on comments

### ✅ Likes
- [x] Like/unlike videos, comments, tweets
- [x] Fetch liked videos

### ✅ Playlists
- [x] Create, update, delete playlists
- [x] Add/remove videos to/from playlists
- [x] Fetch user playlists
- [x] Fetch playlist by ID

### ✅ Subscriptions
- [x] Subscribe/unsubscribe channels
- [x] Fetch subscribed channels
- [x] Fetch subscribers of a channel

### ✅ Tweets
- [x] Create, update, delete tweets
- [x] Fetch tweets by user

### ✅ Dashboard
- [x] Fetch channel stats
- [x] Fetch videos of user's channel

---

## 🗂 Tech Stack

| Backend        | Database       | Authentication | Storage       |
|----------------|----------------|----------------|---------------|
| Node.js        | MongoDB        | JWT            | Cloudinary    |
| Express.js     | Mongoose       | Bcrypt         | Multer        |
| REST API       | NoSQL          | Role-based     | File uploads  |

---

## 🔗 API Routes

### User
```http
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
```

### Videos
```http
Edit
GET /api/v1/videos/
POST /api/v1/videos/publish
GET /api/v1/videos/:videoId
PATCH /api/v1/videos/:videoId
DELETE /api/v1/videos/:videoId
PATCH /api/v1/videos/toggle/publish/:videoId
```
### Comments

```http

GET /api/v1/comments/:videoId
POST /api/v1/comments/:videoId
PATCH /api/v1/comments/c/:commentId
DELETE /api/v1/comments/c/:commentId
```
### Likes
```http

POST /api/v1/likes/toggle/v/:videoId
POST /api/v1/likes/toggle/c/:commentId
POST /api/v1/likes/toggle/t/:tweetId
GET /api/v1/likes/videos
```
### Playlists
``` http

POST /api/v1/playlist/
PATCH /api/v1/playlist/:playlistId
DELETE /api/v1/playlist/:playlistId
GET /api/v1/playlist/:playlistId
PATCH /api/v1/playlist/add/:videoId/:playlistId
PATCH /api/v1/playlist/remove/:videoId/:playlistId
GET /api/v1/playlist/user/:userId
```
### Subscriptions
```http

POST /api/v1/subscriptions/c/:channelId
GET /api/v1/subscriptions/c/:channelId
GET /api/v1/subscriptions/u/:subscriberId
```
### Tweets
```http
POST /api/v1/tweets/
PATCH /api/v1/tweets/:tweetId
DELETE /api/v1/tweets/:tweetId
GET /api/v1/tweets/user/:userId
```
### Dashboard
```http

GET /api/v1/dashboard/stats
GET /api/v1/dashboard/videos
```
🗂 ER Diagram


⚙️ Installation & Setup
Clone the repository:
```http
git clone https://github.com/hiteshkumarroy/videotube.git
```
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file with your credentials:

### env
```http
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
```
Start the server:

```http
npm run dev
```
⚡ Notes
All file uploads are managed via Cloudinary.

JWT is required for all protected routes.

Full validation and error handling implemented.