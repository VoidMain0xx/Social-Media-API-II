export default class userModel{
    constructor( name , email , password, id ){
        this.name = name,
        this.email = email,
        this.password = password,
        this.friendRequest = [],
        this.friends = [],
        this._id = id;
    }

}