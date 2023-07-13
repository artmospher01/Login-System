import iemail from "../assets/img/letter.png"
import iname from "../assets/img/Name.png"
import ipassword from "../assets/img/lock.png"
import iphone from "../assets/img/phone.png"
import idate from "../assets/img/age.png"
import Layout from "../layout/layout"

import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import iGoogle from "../assets/img/google.png"

function Register() {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")
  const [date, setdate] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8080/auth/register", {
        name, email, phone, password, date
      })

      if (data.success) {
        toast.success("Create account is successfull. \n Please login")

        setTimeout(() => {
          navigate("/login")
        }, 1);


      } else {
        toast("something is wrong")
      }

    } catch (error) {
      if (error?.response?.data) {
        toast.error(error?.response?.data.message)
      }
    }

  }

  return (
    <Layout title={"Register"}>

      <div>

        <h1 className="mb-8 font-satisfy font-bold text-7xl font-outline-1 drop-shadow-xl text-center m-auto">Register</h1>

        <form onSubmit={handleSubmit} className="w-100 m-auto shadow-xl rounded-3xl text-center bg-slate-400 pt-10 pb-6 ">

          <label htmlFor="name" className="flex justify-center mb-7 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={iname} alt="name" width={"40px"} />
            </div>
            <input onChange={((e) => setname(e.target.value))} type="text" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="Your Name " id="name" />
          </label>

          <label htmlFor="email" className="flex justify-center mb-7 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={iemail} alt="email" width={"40px"} />
            </div>
            <input onChange={((e) => setemail(e.target.value))} type="email" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="Your email " id="email" />
          </label>

          <label htmlFor="password" className="flex justify-center mb-7 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={ipassword} alt="email" width={"40px"} />
            </div>
            <input onChange={((e) => setpassword(e.target.value))} type="text" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="Your Password " id="password" />
          </label>

          <label htmlFor="phone" className="flex justify-center mb-7 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={iphone} alt="email" width={"40px"} />
            </div>
            <input onChange={((e) => setphone(e.target.value))} type="tel" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="Your phone number - min 6 letters" id="phone" />
          </label>

          <label htmlFor="date" className="flex justify-center mb-5 bg-slate-500 w-10/12 m-auto overflow-hidden border border-gray-700 rounded-lg shadow-md">
            <div className=" bg-zinc-600 p-1">
              <img src={idate} alt="email" width={"40px"} />
            </div>
            <input onChange={((e) => setdate(e.target.value))} type="date" className="w-full p-1 pl-2 bg-slate-300 rounded-e-lg  focus:outline-none focus:border focus:border-sky-500 invalid:text-red-500 invalid:focus:border-pink-600 text-lg font-semibold placeholder:text-slate-500 placeholder:font-normal" placeholder="date of brith " id="date" />
          </label>

          <div className=" flex  w-10/12 m-auto mb-6">
            <h3 className="items-start ">
              Already have an account? <Link to={"/login"} className="font-bold text-slate-800 hover:text-blue-700 hover:underline">Login</Link>
            </h3>
          </div>


          <button type="submit" className="w-44 mb-1 h-10 rounded-full   border border-slate-800 bg-slate-600 text-white font-semibold  text-lg shadow-lg hover:bg-slate-500 hover:text-sky-300  hover:border-blue-600 font-poppins" >Register</button>


          <h1 className="font-semibold">Or</h1>

          <div className=" font-semibold mt-1 mb-6 text-blue-600 text-lg w-56 m-auto  rounded-full bg-slate-300 hover:ring-2 hover:bg-slate-200">
            <Link to="http://localhost:8080/auth/google" >
              <img src={iGoogle} alt="google" width={"22px"} className="inline-block align-middle mr-2" />
              Login with Google
            </Link>
          </div>
        </form>
      </div >
    </Layout>
  )
}

export default Register
