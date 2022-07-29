
/*Getter Functions*/
export const getAllComments = () => {
    return fetch(` http://localhost:8088/comments`)
    .then(response => response.json())
}

export const getSingleComments = (id) => {
    return fetch(`http://localhost:8088/comments/${id}`)
    .then(response => response.json())
}

export const getCommentsByPostId = (post_id) => {
    return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
    .then(response => response.json())
}

/*Post Functions*/
export const saveComment = (commentToSendToAPI) => {
    return fetch(`http://localhost:8088/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentToSendToAPI)
    })
        .then(response => response.json())
}

/*Put Functions*/
export const editComment = (commentObject) => {
    return fetch(`http://localhost:8088/comments/${commentObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObject)
    })
    .then(response => response.json())
}

/*Delete Functions*/
export const deleteComment = (commentObject) => {
    return fetch(`http://localhost:8088/comments/${commentObject.id}`, {
        method: "DELETE"
    })
        
}