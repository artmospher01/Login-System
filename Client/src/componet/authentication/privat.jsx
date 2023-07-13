import axios from 'axios'
import { useEffect, useState } from 'react'
import { UseAuth } from '../../context/authContext'
import { Outlet } from 'react-router-dom'
import Spiner from '../spiner'


const Privat = () => {

  const [auth, setAuth] = UseAuth()
  const [ok, setok] = useState(false)
  const [message, setmessage] = useState("")



  useEffect(() => {

    const getUser = async () => {

      const { data } = await axios.get("http://localhost:8080/auth/login/success", {
        withCredentials: true,
      })
      if (data?.userfull?.token) {
        setAuth({
          token: data.userfull.token,
          user: data.userfull.user
        })
      }
    }
    getUser()
  }, [setAuth])



  useEffect((() => {

    const CheckLogin = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/auth/user-auth")


        if (data?.ok) {
          setok(true)
        }
        else {
          setok(false)
        }


      } catch (error) {
        console.log(error)
      }
    }

    if (auth?.token) {
      CheckLogin()
    } else {
      setmessage("you are not login yet")
    }

  }), [auth?.token, auth])


  return ok ? (<Outlet />) : (
    <Spiner message={message} />
  )

}

export default Privat
