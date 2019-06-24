class User {
    constructor({ id, sid, email, avatarUrl, name, about, comments, posts, createdAt }) {

        const date = new Date(createdAt)

        this.id = id;
        this.sid = sid;
        this.email = email;
        this.avatarUrl = avatarUrl || "http://via.placeholder.com/125";
        this.firstName = name ? name.first : "";
        this.lastName = name ? name.last : "";
        this.biography = about ? about.bio : "No Bio";
        this.comments = comments;
        this.posts = posts;
        this.createdAt = date.toLocaleDateString();
    }
}

export {
    User
}
