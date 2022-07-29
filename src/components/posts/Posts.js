import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getPosts } from "./PostManager"

export const Posts = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts().then(postsData => setPosts(postsData))
    }, [])

    return (
        <>
        <h2>Post Title Test</h2>
        <div className="post_container">
            <h2>container test</h2>
            {posts.reverse().map((post) => {
                let userName = post?.user?.username  
                let category = post.category_id
                let title = post.title
                let pubDate = post.publication_date
                let image = post.image_url
                let content = post.content
                let approved = post.approved

                    return <section className="postBox" key={post.id}>
                        <h3>All Posts Test</h3>
                        <div value={post.id}>User: {userName}</div>
                        <div value={post.id}>Category: {category}</div>
                        {/* added link to post details */}
                        <Link to={`/posts/${post.id}`}>
                            <div value={post.id}>Title: {title}</div>
                        </Link>
                        <div value={post.id}>Date: {pubDate}</div>
                        <img src={image} alt="postImage" className="postImage" />
                        <div value={post.id}>Content: {content}</div>
                        <div value={post.id}>Approved: {approved}</div>
                        <div className="button_container">
                            <button id={post.id} onClick= {
                                (e) => navigate(`/newPost/${e.target.id}`)
                            }>Edit</button>
                        
                    </div>
                    </section>
                    
                })}

            </div>
        </>
    )

}
