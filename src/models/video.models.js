

// id string pk*
// videofile string*
// thumbnail string*
// owner objectid*
// title string*
// views number*
// duration string*
// description string*
// ispublished boolean*
// createdAt date*
// updatedAt date*
import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=Schema(
  {

    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    videofile:{
      type:String,//cloudinary url
      required:true
    },
    thumbnail:{
      type:String, //cloudinary url
      required:true,

    },
    title:{
      type:String,
      required:true,
    },
    views:{
      type:Number,
      default:0
    },
    duration:{
      type:Number,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    ispublished:{
      type:Boolean,
      default:true
    }

},
{
  timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate);
export const Video=mongoose.model("Video",videoSchema);