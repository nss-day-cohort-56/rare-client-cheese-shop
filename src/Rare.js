import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"



export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [isStaff, setStaff] = useState(localStorage.getItem('is_staff'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken.token)
    localStorage.setItem('is_staff', newToken.is_staff)
    setTokenState(newToken.token)
    setStaff(newToken.is_staff)
  }

  return <>
    <NavBar token={token} setToken={setToken} is_staff={isStaff} />
    <ApplicationViews token={token} setToken={setToken} is_staff={parseInt(isStaff)}/>
  </>
}
