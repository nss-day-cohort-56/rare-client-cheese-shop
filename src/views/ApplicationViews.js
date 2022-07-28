import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { MyPosts } from "../components/posts/MyPosts"
import { NewPost } from "../components/posts/NewPost"
import { PostDetail } from "../components/posts/PostDetail"
import { Posts } from "../components/posts/Posts"
import { Tags } from "../components/tags/Tags"
import { Authorized } from "./Authorized"
import { CategoryList } from "../components/categories/Categories"
import { CreateTag } from "../components/tags/CreateTag"

export const ApplicationViews = ({ token, setToken }) => {
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
          <Route path="create" element={<CreateTag />} />
        </Route>


        <Route path="/newPost" element={<NewPost/>} />
        <Route path="categories" element={ <CategoryList /> } />
        <Route path="categories" element={<CategoryList />} />
      </Route>
    </Routes>
  </>
}
