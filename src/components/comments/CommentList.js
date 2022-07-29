import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCommentsByPostId, editComment, deleteComment } from "./CommentManager"

export const CommentList = ({postId}) => {
    /*declared an initial state of posts and created a setPosts function which will change the state */
    const [commentList, setCommentList] = useState([])

    const [editing, setEditing] = useState({
        editing: false,
        commentId: null,
        content: ""
    })

    const loadUserComments = () => {
        getCommentsByPostId(postId)
                .then((commentArray) => {
                    setTimeout(setCommentList(commentArray), 1000)
                }) 
    }

    useEffect(
        () => {
            loadUserComments()
        },
        [] 
    )


    // const commentSetter = (property, value) => {
    //     const copy = { ...newComment }
    //     copy[property] = value
    //     setNewComment(copy)
    // }


    return <>

            

        <h2>List of Comments</h2>

        <article className="comment">
            {
                commentList?.map(
                    (comment) => {
                        if (editing.commentId === comment.id) {
                            return <section className="comment" key={`comment--${comment.id}`}>
                                <div className="form-group">
                                    <input
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder={editing?.content}
                                        value={editing?.content}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...editing }
                                                copy.content = evt.target.value
                                                setEditing(copy)
                                            }
                                        } />
                                    <button onClick={() => {
                                        editComment({
                                            content: editing.content,
                                            id: comment.id
                                        })
                                        .then(setEditing({editing: false, commentId: null, content: ""}))
                                        .then(setTimeout(loadUserComments, 1000))
                                        }}
                                        >Save</button>
                                </div>
                                </section> 
                        } else {
                            return <section className="comment" key={`comment--${comment.id}`}>
                                <div>{comment?.content}<br></br>
                                    <button className="button-55" onClick={() => {
                                        setEditing({editing: true, commentId: comment.id, content: comment.content})
                                        loadUserComments()
                                        }}
                                        >Edit</button>
                                    <button className="button-55" onClick={() => {
                                        deleteComment(comment)
                                        .then(loadUserComments)
                                        }}
                                    >Delete</button>
                                </div>
                            </section>
                        }
                    }
                    )
                }    
            
        </article>


        </>


}