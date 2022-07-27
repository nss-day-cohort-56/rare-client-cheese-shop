export const getCategories = () => {
    return fetch("http://localhost:8088/categories")
        .then(res => res.json())
};

export const addCategory = (category) => {
    return fetch(`http://localhost:8088/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)

    })
        .then(response => response.json())
}

export const deleteCategory = (categoryObject) => {
    return fetch(`http://localhost:8088/categories/${categoryObject.id}`, {
        method: "DELETE"
    })
        
}

// for later possible stretch goal
export const editCategory = (categoryObject) => {
    return fetch(`http://localhost:8088/categories/${categoryObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryObject)
    })
        .then(response => response.json())
}
