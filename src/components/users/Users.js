import { getAllUsers } from "./UserManager"
import { useState } from "react"
import { useEffect } from "react"
import "./Users.css"

export const Users = () => {
    // const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then(usersData => setUsers(usersData))
    }, [])

    //function to determine if user is staff
    const staff = (selectedUser) => {
        if (selectedUser.is_staff === 1) {
            return "Staff"
        }
        else {
            return "Customer"
        }
    }

    return (
        <>
            
            <div className="user_container">
                <div className="userTitle">Users</div>
                {users.map((user) => {
                    let userName = user.username
                    let firstName = user.first_name
                    let lastName = user.last_name
                    let email = user.email
                    let bio = user.bio
                    let joinDate = user.created_on
                    let profileImg = user.profile_image_url
                    let profileType = staff(user)

                    return <section className="userBox" key={user.id}>
                        <div className="user" >

                        <div value={user.id}>Name: {firstName} {lastName}</div>
                        <img src={profileImg} alt="userImage" className="userImage" />
                        <div value={user.id}>Display Name: {userName}</div>
                        <div value={user.id}>Email: {email}</div>
                        <div value={user.id}>Profile Type: {profileType}</div>
                        <div value={user.id}>Date Joined: {Date(joinDate)}</div>
                        </div>
                    </section>
                })}

            </div>
        </>
    )

}