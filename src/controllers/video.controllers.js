import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get all videos with pagination, filtering, sorting
const getAllVideos = asyncHandler(async (req, res) => {
    // console.log("hiijii")
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

    const match = {};
    if (query) match.title = { $regex: query, $options: "i" };
    if (userId && isValidObjectId(userId)) match.owner = new mongoose.Types.ObjectId(userId);

    const sort = { [sortBy]: sortType === "asc" ? 1 : -1 };

    const aggregate = Video.aggregate([{ $match: match }, { $sort: sort }]);

    const options = { page: parseInt(page), limit: parseInt(limit) };

    const videos = await Video.aggregatePaginate(aggregate, options);
// console.log(videos);
    res.status(200).json(new ApiResponse(200, videos, "Videos fetched successfully"));
});
// const getAllVideos = asyncHandler(async (req, res) => {
//     let { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

//     page = parseInt(page);
//     limit = parseInt(limit);

//     const match = {};
//     if (query) {
//         match.title = { $regex: query, $options: "i" }; // Case-insensitive search
//     }
//     if (userId && isValidObjectId(userId)) {
//         match.owner = userId;
//     }

//     // Validate sortBy field
//     const allowedSortFields = ["createdAt", "title", "views"];
//     if (!allowedSortFields.includes(sortBy)) {
//         sortBy = "createdAt";
//     }

//     const sort = { [sortBy]: sortType === "asc" ? 1 : -1 };

//     // Count total videos for pagination
//     const totalVideos = await Video.countDocuments(match);

//     // Fetch paginated videos
//     const videos = await Video.find(match)
//         .sort(sort)
//         .skip((page - 1) * limit)
//         .limit(limit)
//         .populate("owner", "username email");

//     res.status(200).json(
//         new ApiResponse(200, {
//             totalVideos,
//             page,
//             totalPages: Math.ceil(totalVideos / limit),
//             videos
//         }, "Videos fetched successfully")
//     );
// });


// Publish (upload) a new video
const publishAVideo = asyncHandler(async (req, res) => {
    console.log("hello");
    const { title, description } = req.body;
    const videoFilePath = req.files?.videoFile?.[0]?.path;
    const thumbnailPath = req.files?.thumbnail?.[0]?.path;

    if (!title || !description || !videoFilePath || !thumbnailPath) {
        console.log(title);
        console.log(description);
        console.log(videoFilePath);
        console.log(thumbnailPath);
        // console.log(title);
        throw new ApiError(400, "All fields are required");
    }

    const videoFile = await uploadOnCloudinary(videoFilePath);
    const thumbnail = await uploadOnCloudinary(thumbnailPath);

    const newVideo = await Video.create({
        owner: req.user._id,
        title,
        description,
        videofile: videoFile.url,
        thumbnail: thumbnail.url,
        duration: videoFile.duration,
    });

    res.status(201).json(new ApiResponse(201, newVideo, "Video published successfully"));
});

// Get video by ID
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video ID");

    const video = await Video.findById(videoId).populate("owner", "username email");
    if (!video) throw new ApiError(404, "Video not found");

    res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));
});

// Update video details
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video ID");

    const video = await Video.findByIdAndUpdate(videoId, { title, description }, { new: true });
    if (!video) throw new ApiError(404, "Video not found");

    res.status(200).json(new ApiResponse(200, video, "Video updated successfully"));
});

// Delete video
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video ID");

    const deletedVideo = await Video.findByIdAndDelete(videoId);
    if (!deletedVideo) throw new ApiError(404, "Video not found");

    res.status(200).json(new ApiResponse(200, {}, "Video deleted successfully"));
});

// Toggle publish status
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video ID");

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Video not found");

    video.ispublished = !video.ispublished;
    await video.save();

    res.status(200).json(new ApiResponse(200, video, "Publish status toggled"));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
};
