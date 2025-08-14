import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Toggle like for a video
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video ID")

    const existingLike = await Like.findOne({ video: videoId, likedby: req.user._id })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Like removed from video"))
    } else {
        await Like.create({ video: videoId, likedby: req.user._id })
        return res.status(201).json(new ApiResponse(201, null, "Video liked"))
    }
})

// Toggle like for a comment
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!isValidObjectId(commentId)) throw new ApiError(400, "Invalid comment ID")

    const existingLike = await Like.findOne({ comment: commentId, likedby: req.user._id })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Like removed from comment"))
    } else {
        await Like.create({ comment: commentId, likedby: req.user._id })
        return res.status(201).json(new ApiResponse(201, null, "Comment liked"))
    }
})

// Toggle like for a tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID")

    const existingLike = await Like.findOne({ tweet: tweetId, likedby: req.user._id })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Like removed from tweet"))
    } else {
        await Like.create({ tweet: tweetId, likedby: req.user._id })
        return res.status(201).json(new ApiResponse(201, null, "Tweet liked"))
    }
})

// Get all liked videos by the user
const getLikedVideos = asyncHandler(async (req, res) => {
    const likes = await Like.find({ likedby: req.user._id, video: { $exists: true } })
        .populate("video")

    res.status(200).json(new ApiResponse(200, likes))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
