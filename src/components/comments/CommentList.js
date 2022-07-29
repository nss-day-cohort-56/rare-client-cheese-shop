import { useEffect, useState } from "react"
import { getPostsByUserId, deletePost } from "./PostManager"
import { useNavigate } from "react-router-dom"

export const CommentList = () => {
    /*declared an initial state of posts and created a setPosts function which will change the state */
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        const rareUser = localStorage.getItem("auth_token")
        const rareUserObject = JSON.parse(rareUser)
        setCommentList(rareUserObject).then(commentData => setCommentList(commentData))
    }, [])


    const navigate = useNavigate()

    return (
        <>
            <form className="list">
                
            </form>
        </>
    )
}