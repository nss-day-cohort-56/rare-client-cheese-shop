import { useEffect, useState } from "react"
import { getAllTags } from "./TagManager"
import "./Tags.css"
export const Tags = () => {
    const [tags, setTags] = useState([])
//gets all tags from database
    useEffect(() => {
        getAllTags().then(data => setTags(data))
    }, [])
    const orderedTags = tags.sort()

//returns a list of all tags in the DOM
    return<> 
        <h2 className="tagTitle">Tag Manager</h2>
        <section className="tag_container">
        {
            orderedTags.map((t) => {
                return <div className="tag" key={t.id}>
                    {t.label}
                </div>
            })
        }
    </section></>
}