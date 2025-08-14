import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.models.js"
import { Subscription } from "../models/subscription.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Toggle subscription to a channel
const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    if (!isValidObjectId(channelId)) throw new ApiError(400, "Invalid channel ID")

    const existing = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId
    })

    if (existing) {
        // Unsubscribe
        await Subscription.deleteOne({ _id: existing._id })
        return res.status(200).json(new ApiResponse(200, null, "Unsubscribed successfully"))
    }

    // Subscribe
    const subscription = await Subscription.create({
        subscriber: req.user._id,
        channel: channelId
    })
    res.status(201).json(new ApiResponse(201, subscription, "Subscribed successfully"))
})

// Get all subscribers of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    if (!isValidObjectId(channelId)) throw new ApiError(400, "Invalid channel ID")

    const subscribers = await Subscription.find({ channel: channelId }).populate("subscriber", "username email")
    res.status(200).json(new ApiResponse(200, subscribers))
})

// Get all channels a user has subscribed to
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if (!isValidObjectId(subscriberId)) throw new ApiError(400, "Invalid subscriber ID")

    const channels = await Subscription.find({ subscriber: subscriberId }).populate("channel", "username email")
    res.status(200).json(new ApiResponse(200, channels))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
