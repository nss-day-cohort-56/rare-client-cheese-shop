import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addTag } from "./TagManager"

export const CreateTag = () => {
    const navigate = useNavigate()
    const [newTag, setNewTag] = useState({
        label: ""
    })

    const saveNewTag = (event) => {
        event.preventDefault()

        const tagToAPI = {
            label: newTag.label
        }

        return addTag(tagToAPI)
            .then(() => {
                navigate("/tags")
            })
    }

    return <>
        <form className="tagForm">
            <h2 className="tagTitle">New Tag</h2>
            <fieldset className="tagFormGroup">
                <label htmlFor="label">Tag:</label>
                <input
                    required autoFocus
                    type="text"
                    placeholder="New Tag"
                    value={newTag.label}
                    onChange={
                        (evt) => {
                            const copy = { ...newTag }
                            copy.label = evt.target.value
                            setNewTag(copy)
                        }
                    }
                />
            </fieldset>
            <button
                onClick={(clickEvent) => saveNewTag(clickEvent)} className="button">Save Tag</button>
        </form>
    </>
}