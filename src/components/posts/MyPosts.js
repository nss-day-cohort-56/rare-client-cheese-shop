import { useEffect, useState } from "react"
import { getPostsByUserId } from "./PostManager"

export const MyPosts = () => {
    /*declared an initial state of posts and created a setPosts function which will change the state */
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const rareUser = localStorage.getItem("auth_token")
        const rareUserObject = JSON.parse(rareUser)
        getPostsByUserId(rareUserObject).then(postsData => setPosts(postsData))
    })

    

    

    return (
        <>
        <h2>Post Title Test</h2>
        <div className="Post container">
            <h2>container test</h2>
            {posts.reverse().map((post) => {
                let user = post.user_id  
                let category = post.category_id
                let title = post.title
                let pubDate = post.publication_date
                let image = post.image_url
                let content = post.content
                let approved = post.approved

                return <section className="postBox" key={post.id}>
                    <h3>All Posts Test</h3>
                    <div value={post.id}>User: {user}</div>
                    <div value={post.id}>Category: {category}</div>
                    <div value={post.id}>Title: {title}</div>
                    <div value={post.id}>Date: {pubDate}</div>
                    <img src={image} alt = "postImage" className="postImage"/>
                    <div value={post.id}>Content: {content}</div>
                    <div value={post.id}>Approved: {approved}</div>
                </section>
            })}

        </div>
        </>
    )
}