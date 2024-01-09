import frirndRepository from "./friend.repository.js"

export default class friendController{
    constructor(){
        this.respository = new frirndRepository()
    }

    async FriendAdd(req , res){
        try {
            const userid = req.params.userid;
            const result = await this.respository.friendReq(userid);
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    async FriendReqAccept(req , res){
        try {
            const userid = req.params.userid;
            const reqid = req.params.reqid;
            const result = await this.respository.acceptFriend(reqid , userid);
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteReq(req , res){
        try {
            const reqid =  req.params.reqid;
            const result = await this.respository.delete(reqid);
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
        const reqid =  req.params.reqid;

    }
}