// id string pk
// name string
// videos objectId[] videos
// owner objectid users
// description string
// content string
// createdAt date
// updatedAt date

import mongoose,{Schema} from "mongoose";

const playlistSchema=Schema(
  {
    name:{
      type:String,
      required:true
    },
    videos:[
    {  type: Schema.Types.ObjectId,
      ref:"Video"}
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    description:{
      type:String,
      required:true
    },
    // content:{
    //   type:String,
    //   required:true
    // }
  },
  {
timestamps:true
  }
)
export const Playlist=mongoose.model("Playlist",playlistSchema);