class Comment {
    constructor(id, postId, userId, body, userAvatarUrl) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.body = body;
        this.userAvatarUrl = userAvatarUrl;
    }
}

export {
    Comment
}