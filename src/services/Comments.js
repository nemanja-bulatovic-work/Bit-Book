import { Comment } from "../models/Comment";
import { getToken } from "./Users";

const fetchCommentsByPostId = (id) => {
    return fetch(`https://book-api.hypetech.xyz/v1/comments?postId=${id}&_expand=user`, {
        method: 'GET',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json())
        .then(comments => {
            console.log(comments);
            return comments.map(comment => {
                console.log(comment);
                if (!comment.user) {
                    return new Comment(comment.id, comment.postId, comment.userId, comment.body, 'http://via.placeholder.com/125')
                }
                return new Comment(comment.id, comment.postId, comment.userId, comment.body, comment.user.avatarUrl)
            })
        })
}

const postComment = (data) => {
    return fetch('https://book-api.hypetech.xyz/v1/comments', {
        method: 'POST',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        })
        .then(comment => new Comment(comment.sid, comment.postId, comment.userId, comment.body))
}

const fetchDeleteComment = (id) => {
    return fetch(`https://book-api.hypetech.xyz/v1/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    })
        .then(res => res.json())
        .then(res => res)
}

const fetchNumOfComments = (id) => {
    return fetch(`https://book-api.hypetech.xyz/v1/comments?postId=${id}&_limit=1`, {
        headers: {
            'x-api-key': 'B1tD3V',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.headers.get('x-total-count'))
}

export {
    fetchCommentsByPostId,
    postComment,
    fetchNumOfComments,
    fetchDeleteComment,
}