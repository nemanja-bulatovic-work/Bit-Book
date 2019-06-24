const fetchRegister = (dataObj) => {
    return fetch(`https://book-api.hypetech.xyz/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'B1tD3V'
        },
        body: JSON.stringify(dataObj)
    })
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(token => token)
}

export {
    fetchRegister,
}