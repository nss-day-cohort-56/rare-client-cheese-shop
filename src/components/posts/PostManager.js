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