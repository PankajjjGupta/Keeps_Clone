import express from "express"
import { PrismaClient } from "@prisma/client";
import { ClientRequest } from "http";
import { isLogin } from "../middleware";
import { keepBodyValidate } from "../schemas";

const client = new PrismaClient();

const Router = express.Router();

interface Keep {
    id : number
    title : string
    text : string
    user_id : number
}

interface userToken {
    id : number 
    username : string
}

Router.get("/",isLogin, async (req: any, res: any) => {
    const user: userToken = req.token;
    const keeps = await client.keep.findMany({
        where : {
            user_id : user.id
        }
    })
    res.json({
        keeps 
    })
})

Router.post("/create",isLogin, keepBodyValidate, async(req: any, res: any) => {
    try {
        const {username} = req.token;
        const {title = " ", text = " "} = req.body;
        const user: any = await client.user.findUnique({
            where : {
                username
            },
            select : {
                id : true
            }
        });
        const user_id = user.id;
        const addKeep = await client.keep.create({
            data : {
                user_id,
                title,
                text
            }
        })
        res.json({
            result : addKeep
        })
    } catch(error) {
        res.status(400).json({
            message : "User does not exist"
        })
    }
    
})



Router.put("/update",isLogin, keepBodyValidate, async(req: any, res: any) => {
    try {
        const {title = "", text = "", id} = req.body;
        const {username} = req.token;
        const result = await client.user.findUnique({
            where : {
                username
            },
            include : {
                keeps : true
            }
        })
        const keep: any = result?.keeps.find((keep: Keep) => {
            if(keep.id == id) {
                return keep
            }
        })
        if(!keep) {
            return res.status(400).json({
                message : "You are not allowed"
            })
        }
        const keepResult = await client.keep.update({
            where : {
                id : keep.id
            },
            data : {
                title,
                text
            }
        })
        res.json({
            message : 'Keep updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something Went Wrong'
        })
    }
})

Router.delete("/", isLogin, async(req: any, res: any) => {
    try {
        const {id} = req.body;
        const user: userToken = req.token;
        const keep = await client.keep.findMany({
            where : {
                user_id : user.id
            }
        });
        const canDelete = keep.find((keep) => {
            console.log(keep)
            if(keep.id == id) {
                return keep;    
            }
        })
        if(!canDelete) {
            return res.status(400).json({
                message : 'You dont have permission'
            })
        }

        const result = await client.keep.delete({
            where : {
                id
            }
        })

        res.json({
            message : "Keep deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something Went Wrong'
        })
    }

})

export const KeepRouter = Router;