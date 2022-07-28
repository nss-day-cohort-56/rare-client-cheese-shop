import { getAllUsers } from "./UserManager"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Users = () => {
    // const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then(usersData => setUsers(usersData))
    }, [])

    // //function to determine if user is staff
    // const staff = (selectedUser) => {
    //     if (selectedUser.is_staff = 1)
    //     return "Yes"
    //     else if (selectedUser.isStaff = 0)
    //     return "No"

    // }
    return (
        <>
        <h2>User Title Test</h2>
        <div className="post_container">
            <h2>container test</h2>
            {users.map((user) => {
                let userName = user.username  
                let firstName = user.first_name
                let lastName = user.last_name
                let email = user.email
                let bio = user.bio
                let password = user.password
                let profileImg = user.profile_image_url

                    return <section className="userBox" key={user.id}>
                        <h3>All users Test</h3>
                        <img src={profileImg} alt="userImage" className="userImage" />
                        <div value={user.id}>User: {userName}</div>
                        <div value={user.id}>Name: {firstName} {lastName}</div>
                        <div value={user.id}>Email: {email}</div>
                        <div value={user.id}>bio: {bio}</div>
                        <div value={user.id}>password: {password}</div>
                    </section>
                })}

            </div>
        </>
    )

}