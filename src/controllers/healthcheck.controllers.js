import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
//rather than using try catch use async handler to avoid inconvinience
const healthcheck=asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(new ApiResponse(200,"ok","health check passed")) //to standarize api data send in apiresponse it will do that
})
export {healthcheck}