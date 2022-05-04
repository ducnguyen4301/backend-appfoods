import { Response } from "express";
exports.sendError = (res: Response , error:any,status=401)=>{
    res.status(status).json({success:false,error});
}