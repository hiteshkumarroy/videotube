  // id string pk
  // subscriber objectId users
  // channel objectId users
  // createdAt date
  // updatedAt date

  import mongoose,{Schema} from "mongoose";

  const subscriptionSchema=Schema(
    {
      subscriber:{
        type:Schema.Types.ObjectId,//who is subscribing
        ref:"User"
      },
      channel:{
        type:Schema.Types.ObjectId,
        ref:"User"//one to whom subscriber is subscribing
      },


    },{
      timestamps:true
    }
  )
  export const Subscription=mongoose.model("Subscription",subscriptionSchema);