import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { MyPosts } from "../components/posts/MyPosts"
import { PostDetail } from "../components/posts/PostDetail"
import { Posts } from "../components/posts/Posts"
import { Tags } from "../components/tags/Tags"
import { Authorized } from "./Authorized"
import { CategoryList } from "../components/categories/Categories"
import { Users } from "../components/users/Users";


export const ApplicationViews = ({is_staff, token, setToken}) => {

  // const rareUser = localStorage.getItem("auth_token")
  // const rareUserObject = JSON.parse(rareUser)

  // const [users, setUsers] = useState([])
  // const [currentUser, setCurrentUser] = useState({})

  // useEffect(() => {
  //   getAllUsers().then(usersData => setUsers(usersData))
  // }, [])

  // useEffect (() => {
  //   const user = users.find(user => user.id === rareUserObject)
  //   setCurrentUser(user)
  // }, [users])


  return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route element={<Authorized token={token} />}>
                {/* Add Routes here */}
                <Route path="/posts" element={<Posts />} />
                <Route path="/MyPosts" element={<MyPosts />} />
                <Route path="/posts">
                    {/* added posts and post detail routing */}
                    <Route index element={<Posts />} />
                    <Route path=":postId" element={<PostDetail />} />
                </Route>
                {/* added tags route */}
                <Route path="/tags">
                    <Route index element={<Tags />} />
                </Route>
                <Route path="categories" element={<CategoryList />} />
                {
                  is_staff === 1
                  ? <Route path="/users" element={<Users />} />
                  : <Route path="/users" element={<Navigate to="/posts" replace />} />
                }
            </Route>
        </Routes>
    </>
}

