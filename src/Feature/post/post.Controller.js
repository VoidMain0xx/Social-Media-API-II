import postModel from "./post.Model.js";
import postRepository from "./post.repository.js";

export default class postController{
    constructor(){
        this.postRepository = new postRepository();
    }

    async addpost(req, res){
        try {
            const {location , caption , media} = req.body;
            const newPost = new postModel(location , caption , req.file.filename);
            const createdpost = await this.postRepository.add(newPost);
            res.status(201).send(createdpost);
        } catch (error) {
            console.log(error);
            res.status(401).send("Something went Wrong");
        }
    }

    async getAllPost(req, res){
        try {
            const getAllPost = await this.postRepository.getAll();
            res.status(200).send(getAllPost);
        } catch (error) {
            console.log(error);
        }
    }

    async save(req, res){
        try {
            const id = req.params;
            const save = await this.postRepository.save(id);
            res.status(201).send(save);
        } catch (error) {
            console.log(error);
        }
    }

    
}