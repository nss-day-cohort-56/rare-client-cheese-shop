import { getUserById } from "./UserManager"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Users.css"

export const UserDetail = () => {
    // const navigate = useNavigate()
    const [user, setUser] = useState([])
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId)
            .then(setUser)
    }, [userId])

    //function to determine if user is staff
    const staff = (selectedUser) => {
        if (selectedUser.is_staff === 1) {
            return "Staff"
        }
        else {
            return "Customer"
        }
    }

    let userName = user.username
    let firstName = user.first_name
    let lastName = user.last_name
    let email = user.email
    let joinDate = user.created_on
    let profileImg = user.profile_image_url
    let profileType = staff(user)
    return (
        <>
            <div className="user_container">
                <div className="userTitle">Users</div>
                <section className="userBox" key={user.id}>
                    <div className="user" >
                        <div value={user.id}>Name: {firstName} {lastName}</div>
                        <img src={profileImg} alt="userImage" className="userImage" />
                        <div value={user.id}>User Name: {userName}</div>
                        <div value={user.id}>Email: {email}</div>
                        <div value={user.id}>Profile Type: {profileType}</div>
                        <div value={user.id}>Date Joined: {Date(joinDate)}</div>
                    </div>
                    <button className="button" onClick={() => {
                        navigate(`/users`)
                    }}>Back To Users</button>
                </section>
            </div>
        </>
    )

}