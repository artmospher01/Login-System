import { UseAuth } from "../context/authContext"
import Layout from "../layout/layout"


function Dashboard() {
  const [auth] = UseAuth()

  return (
    <Layout >

      {auth.user ? (<>
        <h1 className="mb-8 font-satisfy font-bold text-7xl font-outline-1 drop-shadow-xl text-center m-auto">Welcome {auth.user.name}</h1>

        <div className="text-xl font-semibold m-8">
          <h1>Name:<span className=" ms-2 font-bold">{auth.user.name}</span></h1>
          <h1>Email:<span className=" ms-2 font-bold"> {auth.user.email}</span></h1>

        </div>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </>) : (<h1>wait</h1>)}

    </Layout>

  )
}

export default Dashboard
