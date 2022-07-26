export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
};

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE"
    })
};

export const getPostsByUserId = (id) => {
    return fetch(`http://localhost:8088/posts?user_id=${id}`)
        .then(res => res.json())
};

//fetches post by id
export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
        .then(res => res.json())
};

export const addPostTags = (postObject, chosenTags) => {
    return fetch(`http://localhost:8088/postTags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            post_id: postObject.id,
            tags: chosenTags
        })

    })
        .then(response => response.json())
}


export const updatePostObj = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
};

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
        .then(res => res.json())
}



