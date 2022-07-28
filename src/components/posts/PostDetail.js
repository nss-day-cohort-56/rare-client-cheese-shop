import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CommentForm } from "../comments/CommentForm"
import { getPostById } from "./PostManager"
//allows user to see details of an individual post and navigate back to posts
export const PostDetail = () => {
    const [post, setPost] = useState([])
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId)
            .then(setPost)
    }, [postId])



    return (
        <>
        <section className="post">
            <h3 className="post__name">Title: {post.title}</h3>
            <div className="post__image"><img src={post.image_url} alt="postImage" /></div>
            <div className="post__content">Content: {post.content}</div>
            <div className="post__pub__date">Publication Date: {post.publication_date}</div>
            <div className="post__author__name">Author's Username: {post?.user?.username}</div>

            <button className="button" onClick={() => {
                navigate(`/posts`)
            }}>Back To Posts</button>
            
        </section>
        {<CommentForm postId={postId} />}
        </>
    )
}