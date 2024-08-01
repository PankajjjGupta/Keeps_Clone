import jwt, { JwtPayload } from "jsonwebtoken"
import express from "express"
import { JWT_SECRET } from "./config";


export function isLogin(req: any,res: any, next: any) {
    try {
        const authToken = req.headers["authorization"].split(" ")[1];
        if(!authToken) {
            return res.status(401).json({
                message : "You're not authenticated"
            }) 
        } 
        const token: any = jwt.verify(authToken, JWT_SECRET);
        req.token = {
            id : token.id,
            username : token.username
        };
        return next();
    } catch (error) {
        console.log("error");
        return res.status(401).json({
            message : "You're not authenticated"
        }) 
    }
}