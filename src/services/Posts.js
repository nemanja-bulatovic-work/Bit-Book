import { TextPost, ImagePost, VideoPost } from "../models/Post";
import { getToken } from "./Users";

const fetchPosts = () => {
    return fetch('https://book-api.hypetech.xyz/v1/posts?_embed=comments', {
        method: 'GET',
        headers: {
            'x-api-key': 'B1tD3V',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json())
        .then(posts => {
            return posts.map((post) => {
                if (post.type === 'text') {
                    return new TextPost(post.id, post.userId, post.type, post.comments, post.text)
                } else if (post.type === 'image') {
                    return new ImagePost(post.id, post.userId, post.type, post.comments, post.imageUrl)
                } else if (post.type === 'video') {
                    return new VideoPost(post.id, post.userId, post.type, post.comments, post.videoUrl)
                }
                return null
            });
        })
}

const fetchSinglePost = (id) => {
    return fetch(`https://book-api.hypetech.xyz/v1/posts/${id}`, {
        method: 'GET',
        headers: {
            'x-api-key': 'B1tD3V',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json())
        .then((singlePost) => {
            if (singlePost.type === 'text') {
                return new TextPost(singlePost.id, singlePost.userId, singlePost.type, singlePost.comments, singlePost.text)
            } else if (singlePost.type === 'image') {
                return new ImagePost(singlePost.id, singlePost.userId, singlePost.type, singlePost.comments, singlePost.imageUrl)
            } else if (singlePost.type === 'video') {
                return new VideoPost(singlePost.id, singlePost.userId, singlePost.type, singlePost.comments, singlePost.videoUrl)
            }
            return null
        })
}

const fetchCreatePost = (dataObj) => {
    return fetch('https://book-api.hypetech.xyz/v1/posts', {
        method: 'POST',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(dataObj)
    })
        .then(res => res.json())
        .then(post => post)
}

const fetchDeletePost = (id) => {
    return fetch(`https://book-api.hypetech.xyz/v1/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then((res) => {
            console.log(res);
        })
}

export {
    fetchPosts,
    fetchSinglePost,
    fetchCreatePost,
    fetchDeletePost,
}