// id string pk
// owner objectid users
// content string
// createdAt date
// updatedAt date

import mongoose,{Schema} from "mongoose";

const tweetSchema=Schema(
  {
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    content:{
      type:String,
      required:true,
    },

  },
  {
    timestamps:true

  }
)

export const Tweet=mongoose.model("Tweet",tweetSchema);