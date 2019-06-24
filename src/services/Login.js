const fetchLogin = (dataObj) => {
    return fetch(`https://book-api.hypetech.xyz/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'B1tD3V'
        },
        body: JSON.stringify(dataObj)
    })
        .then(res => res.json())
        .then((token) => token)
}

export {
    fetchLogin
}