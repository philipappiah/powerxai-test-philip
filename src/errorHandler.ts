import {Request, Response, NextFunction} from 'express'


export const CatchExpressError = (callFunc:any) => {
    return (req:Request, res:Response, next:NextFunction) => {
        callFunc(req, res, next).catch((err:any)=>{
            res.json({ success: false })
        });
    };
  };



export class ApplicationError extends Error {
    statusCode : number
    status: string
    isOperational: boolean

     constructor(errorMessage:string, code:number){
         super(errorMessage)
         this.statusCode = code
       
         this.status = 'fail'
        
         this.isOperational = true;
         Error.captureStackTrace(this, this.constructor);
         
     }

   

}

