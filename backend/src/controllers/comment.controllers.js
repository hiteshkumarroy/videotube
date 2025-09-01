import mongoose from "mongoose"
import { Comment } from "../models/comment.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Get all comments for a video
const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const comments = await Comment.find({video: videoId })
        .sort({ createdAt: -1 }) // newest first
        .skip((page - 1) * limit)
        .limit(Number(limit))


    res.status(200).json(new ApiResponse(200, comments))
})

// Add a new comment
const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { content } = req.body

    if (!content) {
        throw new ApiError(400, "Comment content is required")
    }

    const comment = await Comment.create({
        "video":videoId,
       "owner": req.user._id,
        content
    })
console.log(comment);
    res.status(201).json(new ApiResponse(201, comment, "Comment added"))
})

// Update an existing comment
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body

    const comment = await Comment.findById(commentId)
    if (!comment) throw new ApiError(404, "Comment not found")

    if (comment.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this comment")
    }

    comment.content = content || comment.content
    await comment.save()

    res.status(200).json(new ApiResponse(200, comment, "Comment updated"))
})

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    const comment = await Comment.findById(commentId)
    if (!comment) throw new ApiError(404, "Comment not found")

    if (comment.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to delete this comment")
    }

    await comment.deleteOne()

    res.status(200).json(new ApiResponse(200, null, "Comment deleted"))
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
