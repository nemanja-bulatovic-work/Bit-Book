import { User } from '../models/User'
import jwtDecode from "jwt-decode";

const getDecodedId = () => {
    const decoded = jwtDecode(localStorage.getItem('user'))
    console.log(decoded);
    return decoded.id;
}

const getToken = () => localStorage.getItem('user');

const fetchUserById = (userId) => {
    return fetch(`https://book-api.hypetech.xyz/v1/users/${userId}?_embed[]=posts&_embed[]=comments`, {
        method: 'GET',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(result => result.json())
        .then(user => new User(user)
        )
}

const fetchLoggedInUser = () => {
    return fetch(`https://book-api.hypetech.xyz/v1/users/${getDecodedId()}?_embed[]=posts&_embed[]=comments`, {
        method: 'GET',
        headers: {
            'x-api-key': 'B1tD3V',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(result => result.json())
        .then(user => {
            console.log(user);
            return new User(user)
        })
        .catch(err => console.log(err));
}

const fetchUsers = () => {
    return fetch('https://book-api.hypetech.xyz/v1/users', {
        method: 'GET',
        headers: {
            'x-api-key': 'B1tD3V',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json())
        .then(users => users.map(user => new User(user))
        )
}

export {
    fetchUserById,
    fetchUsers,
    fetchLoggedInUser,
    getDecodedId,
    getToken,
}