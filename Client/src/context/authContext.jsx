
/* eslint-disable react/prop-types */

import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    user: null,
    token: ""
  })

  axios.defaults.headers.common["Authorization"] = auth?.token

  useEffect(() => {

    const dataAuth = localStorage.getItem("auth")
    if (dataAuth) {
      const parseDataAuth = JSON.parse(dataAuth)
      setAuth({
        user: parseDataAuth.user,
        token: parseDataAuth.token
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

const UseAuth = () => useContext(AuthContext)

export { UseAuth, AuthProvider }