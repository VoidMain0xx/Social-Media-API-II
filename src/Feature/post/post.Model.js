export default class postModel{
    constructor(location ,caption, media, id){
        this.location = location,
        this.caption = caption,
        this.media = media,
        this.likes = [],
        this.comments = [],
        this.save = false,
        this.friendRequest = [],
        this.friends = [],
        this._id = id
    }
}