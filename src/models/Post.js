class Post {
    constructor(id, userId, type, comments) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.comments = comments;
    }

    isVideo() {
        return this.type === 'video'
    }

    isPicture() {
        return this.type === 'image'
    }

    isText() {
        return this.type === 'text'
    }
}

class VideoPost extends Post {
    constructor(id, userId, type, comments, videoUrl) {
        super(id, userId, type, comments)
        this.videoUrl = videoUrl;
    }
}

class ImagePost extends Post {
    constructor(id, userId, type, comments, imageUrl) {
        super(id, userId, type, comments)
        this.imageUrl = imageUrl;
    }
}

class TextPost extends Post {
    constructor(id, userId, type, comments, text) {
        super(id, userId, type, comments)
        this.text = text;
    }
}

export {
    VideoPost,
    ImagePost,
    TextPost
}