import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllPostTags, getAllTags } from "../tags/TagManager"
import { addPost, addPostTags, getPostById } from "./PostManager"
import { CommentForm } from "../comments/CommentForm"
import { CommentList } from "../comments/CommentList"
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

    const PostById = () => {
        getPostById(postId)
            .then(setPost)
    }
    useEffect(() => {
        PostById()
    }, [postId])

    useEffect(() => {
        getAllTags()
            .then(setTags)
    }, [])

    const PostTags = () => {
        getAllPostTags()
        .then(setPostTags)
    }
    useEffect(() => {
        PostTags()
    }, [])

    const showTags = event => {
        setIsShown(true)
    }

    const handleSaveTag = (event) => {
        event.preventDefault()

        addPostTags(post, chosenTags)
            .then(() => {
                PostTags()
                setIsShown(false)
            })
        }


        return (
            <>
                <section className="post">
                    <h3 className="post__name">Title: {post.title}</h3>
                    <div className="post__image"><img src={post.image_url} alt="postImage" /></div>
                    <div className="post__content">Content: {post.content}</div>
                    <div className="post__pub__date">Publication Date: {post.publication_date}</div>
                    <div className="post__author__name">Author's Username: {post?.user?.username}</div>
                    <div className="post__tag">Post Tags:
                        {
                            postTags.map((pt) => {
                                if (parseInt(postId) === pt.post_id) {
                                    return <>
                                        <ul>
                                            {pt.tag.label}
                                        </ul>
                                    </>
                                }
                            })
                        }
                    </div>
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
                                                            setChosenTags(Array.from(copy))
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