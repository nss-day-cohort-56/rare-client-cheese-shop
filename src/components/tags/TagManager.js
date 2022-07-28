export const getAllTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(res => res.json())
};

export const addTag = (tag) => {
    return fetch(`http://localhost:8088/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag)

    })
        .then(response => response.json())
}

export const deleteTag = (tagObjectId) => {
    return fetch(`http://localhost:8088/tags/${tagObjectId}`, {
        method: "DELETE"
    })
        
}