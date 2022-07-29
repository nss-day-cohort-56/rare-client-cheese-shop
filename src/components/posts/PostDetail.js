import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllPostTags, getAllTags } from "../tags/TagManager"
import { addPost, getPostById } from "./PostManager"
import { CommentForm } from "../comments/CommentForm"
import { CommentList } from "../comments/CommentList"
import { getPostById } from "./PostManager"
//allows user to see details of an individual post and navigate back to posts
export const PostDetail = () => {
    const [post, setPost] = useState([])
    const [postTags, setPostTags] = useState([])
    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState([])
    const [isShown, setIsShown] = useState(false)
    const { postId } = useParams()
    const navigate = useNavigate()
    const rareUser = localStorage.getItem("auth_token")
    const rareUserObject = JSON.parse(rareUser)

    useEffect(() => {
        getPostById(postId)
            .then(setPost)
    }, [postId])

    useEffect(() => {
        getAllTags()
            .then(setTags)
    }, [])

    useEffect(() => {
        getAllPostTags()
            .then(setTags)
    }, [])

    const showTags = event => {
        setIsShown(true)
    }

    const handleSaveTag = (event) => {
        event.preventDefault()

        addPost(post, chosenTags)
        .then(getPostById(postId))
        .then(setIsShown(false))
    }

    return (


    return (
        <>
        <section className="post">
            <h3 className="post__name">Title: {post.title}</h3>
            <div className="post__image"><img src={post.image_url} alt="postImage" /></div>
            <div className="post__content">Content: {post.content}</div>
            <div className="post__pub__date">Publication Date: {post.publication_date}</div>
            <div className="post__author__name">Author's Username: {post?.user?.username}</div>
            {
                postTags.map((pt) => {
                    postId === pt.post_id
                    ? <>
                    
                    </>
                    : ""
                })
            }
            {
                rareUserObject === post.user_id
                    ? <><button className="button" onClick={showTags}>Manage Tabs</button>
                        {isShown && (<div id="checkedTags">
                            {
                                tags.map((tag) => {
                                    return <>
                                        <input key={`tag--${tag.id}`}
                                            onChange={
                                                (evt) => {
                                                    const copy = new Set(chosenTags)
                                                    const id = evt.target.id
                                                    if (evt.target.checked) {
                                                        copy.add(parseInt(id))
                                                    } else {
                                                        copy.delete(parseInt(id))
                                                    }
                                                    setChosenTags(copy)
                                                }
                                            }
                                            type="checkbox"
                                            name="tag"
                                            id={tag.id}
                                        />
                                        {tag.label}
                                    </>
                                })
                            }
                            <button className="button" onClick={(clickEvent) => handleSaveTag(clickEvent)}>Save Tags To Post</button>
                        </div>)}
                    </>
                    : ""
            }
            <button className="button" onClick={() => {
                navigate(`/posts`)
            }}>Back To Posts</button>
            
        </section>
        {<CommentForm postId={postId} />}
        {<CommentList postId={postId} />}
        </>
    )
}