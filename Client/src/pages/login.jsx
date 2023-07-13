
import { Link, useNavigate } from "react-router-dom"
import iemail from "../assets/img/letter.png"
import ipassword from "../assets/img/lock.png"
import iGoogle from "../assets/img/google.png"
import Layout from "../layout/layout"
import { useState } from "react"
import { UseAuth } from "../context/authContext"
import axios from "axios"
import { toast } from "react-hot-toast"


function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [, setAuth] = UseAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8080/auth/login", {
        email, password
      })

      if (data?.success) {
        setAuth({
          user: data?.user,
          token: data?.token
        })

        localStorage.setItem("auth", JSON.stringify(data))

        setTimeout(() => {
          toast.success("login is successfull")
        }, 1);

        navigate(location.state || "/")

      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={"Login"}>

      <div>

        <h1 className="mb-8 font-satisfy font-bold text-7xl font-outline-1 drop-shadow-xl text-center m-auto">Login</h1>

        <form onSubmit={handleSubmit} className="w-100 m-auto shadow-xl rounded-3xl text-center bg-slate-400 pt-10 h-90">


          <label htmlFor="email" className="flex justify-center mb-7 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={iemail} alt="email" width={"40px"} />
            </div>
            <input onChange={(e) => { setemail(e.target.value) }} type="email" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="Your email " id="email" />
          </label>

          <label htmlFor="password" className="flex justify-center mb-2 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={ipassword} alt="email" width={"40px"} />
            </div>
            <input onChange={(e) => { setpassword(e.target.value) }} type="text" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="Your Password " id="password" />
          </label>

          <div className=" flex  w-10/12 justify-end items-center m-auto">
            <Link className=" font-semibold text-slate-800 text-sm hover:text-blue-700  hover:underline font-poppins">Forget password?</Link>
          </div>


          <button type="submit" className="w-44 mb-1 mt-6 h-10 rounded-full font-poppins  border border-slate-800 bg-slate-600 text-white font-semibold  text-lg shadow-lg hover:bg-slate-500 hover:text-sky-300  hover:border-blue-600">Login</button>

          <h1 className="font-semibold">Or</h1>

          <div className=" mb-4  font-semibold text-blue-600 text-lg w-56 m-auto  rounded-full bg-slate-300 hover:ring-2 hover:bg-slate-200">
            <Link to="http://localhost:8080/auth/google" >
              <img src={iGoogle} alt="google" width={"22px"} className="inline-block align-middle mr-2" />
              Login with Google
            </Link>
          </div>



          <div className=" flex  w-10/12 m-auto mb-4">
            <h3 className="items-start ">don`t have an account yet? <Link to={"/register"} className="font-medium text-slate-800 hover:text-blue-700 cursor-pointer">Register</Link></h3>
          </div>

        </form>
      </div >
    </Layout>
  )
}


export default Login
