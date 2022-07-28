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
                  : <Route path="/posts" element={<Posts />} />
                }
            </Route>
        </Routes>
    </>