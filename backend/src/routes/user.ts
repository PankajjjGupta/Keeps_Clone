import express, { response } from 'express'
import { PrismaClient } from '@prisma/client';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken'
import { signInBodyValidate, signUpBodyValidate } from '../schemas';
import { isLogin } from '../middleware';

const Router = express.Router();
const prisma = new PrismaClient();

Router.post("/signup",signUpBodyValidate, async(req, res) => {
    try {
        const {username, firstName, lastName, password} = req.body;
        const response: any = await prisma.user.create({
            data : {
                firstName,
                lastName,
                username,
                password
            }
        });
        const token = jwt.sign({
            username,
            id : response.id
        }, JWT_SECRET, {
            expiresIn : 24 * 60 * 60 * 3
        })
        return res.json({
            message : 'User Created Succesfully',
            token,
        })
    } catch(error) {
        return res.status(400).json({
            message : 'Username already exist!'
        })
    }
})

Router.post("/signin",signInBodyValidate, async(req, res) => {
    try {
        const {username, password} = req.body;
        const result = await prisma.user.findUnique({
            where : {
                username,
                AND : {
                    password
                }
            }
        })
        if(result) {
            const token = jwt.sign({
                username,
                id : result.id
            }, JWT_SECRET, {
                expiresIn : 24 * 60 * 60 * 3
            })
            return res.json({
                token
            })
        }
        return res.status(400).json({
            message : "Incorrect username or password"
        })
    } catch (error) {
        return res.json({
           message : 'Something Went Wrong'
        })
    }
})

Router.get('/getuser',isLogin, async(req: any, res: any) => {
    try {
        const user = req.token;
        const result = await prisma.user.findUnique({
        where : {
            id : user.id
        }
        });
        if(!user) {
            res.status(401).json({
                user : false
            })
        }
        return res.json({
            user : result
        })
    } catch (error) {
        return res.status(500).json({
            message : 'Something Went Wrong'
        })
    }
})

export const UserRouter = Router;