import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Create a new tweet
const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body
    if (!content) throw new ApiError(400, "Tweet content is required")

    const tweet = await Tweet.create({
        owner: req.user._id,
        content
    })

    res.status(201).json(new ApiResponse(201, tweet, "Tweet created successfully"))
})

// Get all tweets of a user
const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID")

    const tweets = await Tweet.find({ owner: userId }).sort({ createdAt: -1 })
    res.status(200).json(new ApiResponse(200, tweets))
})

// Update a tweet
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    const { content } = req.body
    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID")
    if (!content) throw new ApiError(400, "Tweet content is required")

    const tweet = await Tweet.findOneAndUpdate(
        { _id: tweetId, owner: req.user._id },
        { content },
        { new: true }
    )

    if (!tweet) throw new ApiError(404, "Tweet not found or not authorized")

    res.status(200).json(new ApiResponse(200, tweet, "Tweet updated successfully"))
})

// Delete a tweet
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID")

    const deleted = await Tweet.findOneAndDelete({ _id: tweetId, owner: req.user._id })
    if (!deleted) throw new ApiError(404, "Tweet not found or not authorized")

    res.status(200).json(new ApiResponse(200, null, "Tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
