// id string pk*
// video objectid videos
// owner objectid users
// content string
// createdAt date
// updatedAt date

import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commentSchema=Schema(
  {
video:{
  type:Schema.Types.ObjectId,
  ref:"Video"
},
owner:{
  type:Schema.Types.ObjectId,
  ref:"User"
},
content:{
  type:String,
  required:true
}
  },
  {
    timestamps:true
  }
)
commentSchema.plugin(mongooseAggregatePaginate);
export const Comment=mongoose.model("Comment",commentSchema);