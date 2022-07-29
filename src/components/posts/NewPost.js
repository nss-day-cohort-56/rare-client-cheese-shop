import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../categories/CategoryManager"
import { getPostById, updatePostObj } from "./PostManager"


export const NewPost = () => {
    let {postId} = useParams()
    const [categories, setCategories] = useState([])
    const loadUserCategories = () => {
        getCategories()
        .then((categoryArr) => {
            setCategories(categoryArr)
            })
    }
    
    useEffect(
        () => {
            loadUserCategories()
        },
        []
    )
    const [post, updatePost] = useState({
        title: "",
        content: "",
        category_id: "",
        image_url: ""
    })

    useEffect(
        () => {
            if (postId != undefined ) {
                getPostById(postId)
                .then(res => updatePost(res))
            } else {
                updatePost(
                    {
                        title: "",
                        content: "",
                        category_id: "",
                        image_url: ""
                    }
                )
            }
        },
        [postId]
    )

    const navigate = useNavigate()
    const rareUser = localStorage.getItem("auth_token")
    const rareUserObject = JSON.parse(rareUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const postToSendToAPI = {
            user_id: rareUserObject,
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            image_url: post.image_url,
            publication_date: new Date(),
            approved: 1
        }
        return fetch(`http://localhost:8088/posts`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)

        })
            .then(response => response.json())
            .then(() => {
                navigate("/posts")
            })
    }

    const handleUpdateButtonClick = (event) => {
        event.preventDefault()

        const postToSendToAPI = {
            id: post.id,
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            image_url: post.image_url
        }
        updatePostObj(postToSendToAPI)
            .then(() => {
                navigate("/posts")
            })
    }

    return (
        <form className="postForm">
            <div className="postForm__title">
                New Post
            </div>
            <fieldset>
                <div className="postForm_group_1">
                    <label className="post__title" htmlFor="postTitle">
                        Title
                    </label>
                    <input
                        required autoFocus
                        type="text"
                        className="formControl_group_1"
                        placeholder=""
                        value={post.title}
                        onChange={
                            (e) => {
                                const copy = { ...post }
                                copy.title = e.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="postForm_group_2">
                    <label className="post__content" htmlFor="postContent">
                        Content
                    </label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="formControl_group_2"
                        placeholder=""
                        value={post.content}
                        onChange={
                            (e) => {
                                const copy = { ...post }
                                copy.content = e.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="postForm_group_3">
                    <label className="post__category" htmlFor="postCategory">
                        Select a Category
                    </label>
                    <select
                        required autoFocus
                        className="formControl_group_3"
                        value={post.category_id}
                        onChange={
                            (e) => {
                                const copy = { ...post }
                                copy.category_id = e.target.value
                                updatePost(copy)
                            }
                        } >
                        <option>--Select a Category--</option>
                        {categories.map((category) => <option value={category.id}>{category.label}</option>)}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="postForm_group_4">
                    <label className="post__image" htmlFor="postImage">
                        Insert Image
                    </label>
                    <input
                        required autoFocus
                        type="text"
                        className="formControl_group_4"
                        placeholder=""
                        value={post.image_url}
                        onChange={
                            (e) => {
                                const copy = { ...post }
                                copy.image_url = e.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
                <div className="newPost__button_container">
                    {postId != undefined ? <button id="submit_new_post"
                        onClick={
                            (clickEvent) => handleUpdateButtonClick(clickEvent)
                        }
                    >
                        update Post
                    </button>
                    :
                    <button id="submit_new_post"
                        onClick={
                            (clickEvent) => handleSaveButtonClick(clickEvent)
                        }
                    >
                        Submit Post
                    </button>}
                    <div className="abortPost__button_container">
                        <button id="abort_post" onClick={() => navigate("/posts")}>
                            Back to Posts
                        </button>
                    </div>
                </div>
            </fieldset>
        </form>
    )


}