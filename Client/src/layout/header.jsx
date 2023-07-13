import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { UseAuth } from "../context/authContext"
import axios from "axios"

function Header() {
  const [auth, setAuth] = UseAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ""
    })
    const checkLS = JSON.parse(localStorage.getItem("auth"))
    localStorage.removeItem("auth")


    axios.get("http://localhost:8080/auth/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200 || checkLS) {
          navigate("/login")
          setTimeout(() => {
            toast.success("log out successfull")
          }, 1);
        } else {
          console.log("someting wnnt wrong")
          setTimeout(() => {
            toast.error("log out failed")
          }, 1);
          // Handle error
        }
      })
      .catch((error) => {
        console.log(error)
        // Handle error
      });
  }


  return (
    <div className=' flex flex-row items-center px-16 w-screen bg-opacity-0 absolute top-0  shadow-xl h-16'>
      <div className='basis-3/5'>
        <Link className="font-satisfy text-5xl text-slate-600" to={"/"}>Home</Link >
      </div>

      <div className='basis-2/5'>
        <ul className="flex justify-end text-xl font-bold text-slate-300  font-poppins">
          {auth?.token ? (
            <li onClick={handleLogout} className=" hover:text-pink-800 cursor-pointer">Logout</li>
          ) : (
            <>
              <li className="mr-8  hover:text-pink-800"><Link to={"/login"}>Log in</Link></li>
              <li className=" hover:text-pink-800"><Link to={"/register"}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
