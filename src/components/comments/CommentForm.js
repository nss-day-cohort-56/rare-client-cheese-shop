import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPostById } from "../posts/PostManager"
import { saveComment } from "./CommentManager"

export const CommentForm = ({postId}) => {

    /*assigning default properties to the initial state object */
    const [comment, setComment] = useState({
        content: ""
    })


    // useEffect(() => {
    //     getPostById(postId)
    //         .then(setComment)
    // }, [postId])
    
    /*assigning useNavigate to a new variable*/
    const navigate = useNavigate()

    const rareUser = localStorage.getItem("auth_token")
    const rareUserObject = JSON.parse(rareUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //Creating an object to be saved to the API
        const commentToSendToAPI = {
            author_id: rareUserObject,
            content: comment.content,
            post_id: postId
        }

        saveComment(commentToSendToAPI)
            .then(() => {
                navigate("/posts")
            })
    }
    return (
        <>
            <form className="commentForm">
                {/* <h2>New Comment</h2> */}
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Please enter a comment"
                        value={comment.content}
                        onChange={
                            (event) => {
                                const copy = {...comment}
                                copy.content = event.target.value
                                setComment(copy)
                        }
                        }/>
                </div>
                <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</button>
        </form>
        </>
    )
}

