const delay = (inteval) => {
    return new Promise((accept) => {
        setInterval(() => {
            accept()
        }, inteval)
    })
}

export default delay