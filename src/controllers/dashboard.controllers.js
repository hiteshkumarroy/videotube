import { Video } from "../models/video.models.js"
import { Subscription } from "../models/subscription.models.js"
import { Like } from "../models/like.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = req.user._id

    // All videos for this channel
    const videos = await Video.find({ owner: channelId }, "views duration _id")

    const totalVideos = videos.length
    const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
    const totalDuration = videos.reduce((sum, v) => sum + v.duration, 0)

    const totalSubscribers = await Subscription.countDocuments({ channel: channelId })
    const totalLikes = await Like.countDocuments({ video: { $in: videos.map(v => v._id) } })

    res.status(200).json(
        new ApiResponse(200, {
            totalVideos,
            totalViews,
            totalDuration,
            totalSubscribers,
            totalLikes
        })
    )
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.user._id
    const { page = 1, limit = 10 } = req.query

    const videos = await Video.find({ owner: channelId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))

    res.status(200).json(new ApiResponse(200, videos))
})

export {
    getChannelStats,
    getChannelVideos
}
