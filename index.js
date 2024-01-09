// importing Libs
import express from "express";
import postRouter from "./src/Feature/post/post.Routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/Feature/user/user.Routes.js";
import jwtAuth from "./src/Middleware/jwtAuthentication.js";
import {connectToMongoDb} from "./src/config/connectToMongodb.js";
import likeRouter from "./src/Feature/like/like.routes.js";
import multer from "multer";
import commentRouter from './src/Feature/comment/comment.routes.js';
import friendRouter from "./src/Feature/friendship/friend.routes.js";

// creating server
const server = express();

// bodyParse
server.use(bodyParser.json());

// setting up post Routwer
server.use('/api/post/' ,jwtAuth , postRouter);
server.use('/api/user/' , userRouter)
server.use('/api/like' , jwtAuth , likeRouter)
server.use('/api/comment' ,jwtAuth , commentRouter)
server.use('/api/friend' , jwtAuth ,friendRouter)

// setting default
server.get('/' , (req , res) =>{
    res.send("Welcome to Socials (A Social Networking App)")
})



server.listen(3400 , ()=>{
    console.log("the server is listed to 3400");
    connectToMongoDb();
})