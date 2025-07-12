// id string pk
// comment objectId comments
// video objectId videos
// tweets objectId tweets
// likedBy objectId users
// createdAt date
//  updatedAt date

import mongoose,{Schema} from "mongoose";
const likesSchema=Schema(
  {
    comment:{
      type:Schema.Types.ObjectId,
      ref:"Comment"
    },
    video:{
      type:Schema.Types.ObjectId,
      ref:"Video"
    },
    tweet:{
      type:Schema.Types.ObjectId,
      ref:"Tweet"
    },
    likedby:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }

  },{
    timestamps:true
  }
)
export const Like=mongoose.model("Like",likesSchema);