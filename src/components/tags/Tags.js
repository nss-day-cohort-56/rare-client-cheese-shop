import { useEffect, useState } from "react"
import { getAllTags, deleteTag } from "./TagManager"
import { useNavigate } from "react-router-dom"
import "./Tags.css"
export const Tags = () => {
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    //gets all tags from database

    const loadTags = () => {
        getAllTags().then(data => setTags(data))
    }
    useEffect(() => {
        loadTags()
    }, [])
    //returns a list of all tags in the DOM
    return <>
        <h2 className="tagTitle">Tag Manager</h2>
        <section className="tag_container">
            {
                tags?.map((t) => {
                    return <div className="tag" key={t.id}>
                        {t.label}
                        <button className="" onClick={() => {
                            deleteTag(t.id)
                                .then(loadTags)
                        }}>Delete</button>
                    </div>
                })
            }
        </section>
        <button className="button" onClick={() => {
            navigate(`/tags/create`)
        }}>Create Tag</button>
    </>
}