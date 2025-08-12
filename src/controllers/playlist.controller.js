import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Create a new playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    if (!name) throw new ApiError(400, "Playlist name is required")

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id,
        videos: []
    })

    res.status(201).json(new ApiResponse(201, playlist, "Playlist created successfully"))
})

// Get all playlists of a user
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID")

    const playlists = await Playlist.find({ owner: userId })
    res.status(200).json(new ApiResponse(200, playlists))
})

// Get a playlist by ID
const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!isValidObjectId(playlistId)) throw new ApiError(400, "Invalid playlist ID")

    const playlist = await Playlist.findById(playlistId).populate("videos")
    if (!playlist) throw new ApiError(404, "Playlist not found")

    res.status(200).json(new ApiResponse(200, playlist))
})

// Add video to playlist
const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid ID(s)")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) throw new ApiError(404, "Playlist not found")

    if (!playlist.videos.includes(videoId)) {
        playlist.videos.push(videoId)
        await playlist.save()
    }

    res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist"))
})

// Remove video from playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid ID(s)")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) throw new ApiError(404, "Playlist not found")

    playlist.videos = playlist.videos.filter(
        (vid) => vid.toString() !== videoId
    )
    await playlist.save()

    res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist"))
})

// Delete playlist
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!isValidObjectId(playlistId)) throw new ApiError(400, "Invalid playlist ID")

    await Playlist.findByIdAndDelete(playlistId)
    res.status(200).json(new ApiResponse(200, null, "Playlist deleted successfully"))
})

// Update playlist details
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body
    if (!isValidObjectId(playlistId)) throw new ApiError(400, "Invalid playlist ID")

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        { name, description },
        { new: true }
    )
    if (!playlist) throw new ApiError(404, "Playlist not found")

    res.status(200).json(new ApiResponse(200, playlist, "Playlist updated successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
