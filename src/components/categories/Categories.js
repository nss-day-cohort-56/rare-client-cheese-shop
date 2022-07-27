import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addCategory, deleteCategory, editCategory, getCategories } from "./CategoryManager"
import "./Categories.css"

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({
        label: ""
    })
    const [editing, setEditing] = useState({
        editing: false,
        categoryId: null,
        label: ""
    })

    const navigate = useNavigate()

    const loadUserCategories = () => {
        getCategories()
                .then((categoryArray) => {
                    setTimeout(setCategories(categoryArray), 1000)
                }) 
    }

    useEffect(
        () => {
            loadUserCategories()
        },
        [] 
    )

    const categorySetter = (property, value) => {
        const copy = { ...newCategory }
        copy[property] = value
        setNewCategory(copy)
    }


    return <>

            

        <h2>List of Categories</h2>

        <article className="categories">
            {
                categories.map(
                    (category) => {
                        if (editing.categoryId === category.id) {
                            return <section className="category" key={`category--${category.id}`}>
                                <div className="form-group">
                                    <input
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder={editing?.label}
                                        value={editing?.label}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...editing }
                                                copy.label = evt.target.value
                                                setEditing(copy)
                                            }
                                        } />
                                    <button onClick={() => {
                                        editCategory({
                                            label: editing.label,
                                            id: category.id
                                        })
                                        .then(setEditing({editing: false, categoryId: null, label: ""}))
                                        .then(setTimeout(loadUserCategories, 1000))
                                        }}
                                        >Save</button>
                                </div>
                                </section> 
                        } else {
                            return <section className="category" key={`category--${category.id}`}>
                                <div>{category?.label}<br></br>
                                    <button className="button-55" onClick={() => {
                                        setEditing({editing: true, categoryId: category.id, label: category.label})
                                        loadUserCategories()
                                        }}
                                        >Edit</button>
                                    <button className="button-55" onClick={() => {
                                        deleteCategory(category)
                                        .then(loadUserCategories)
                                        }}
                                    >Delete</button>
                                </div>
                            </section>
                        }
                    }
                    )
                }    
            
        </article>
        <fieldset>
            <div className="form-group">
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Add New Category"
                    value={newCategory?.label}
                    onChange={
                        (evt) => {
                            categorySetter("label", evt.target.value)
                        }
                    } />
            </div>
        <button 
                onClick={() => {
                    addCategory(newCategory)
                    .then(categorySetter("label", ""))
                    .then(loadUserCategories)
                }}
                className="button-55">
                Save Category
            </button>
        </fieldset>

        </>
}