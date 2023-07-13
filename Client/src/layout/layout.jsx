
/* eslint-disable react/prop-types */

import { Toaster } from "react-hot-toast"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from "./header"

function Layout({ children, title, description, keyords, author, viewport }) {

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyords} />
        <meta name="author" content={author} />
        <meta name="viewport" content={viewport} />
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main className="container bg-gradient-to-br from-cyan-400 via-pink-600 to-green-300 min-h-screen pt-28 pb-10 min-w-full overflow-x-auto ">
        {children}
        <Toaster />
      </main>
    </HelmetProvider>
  )
}

Layout.defaultProps = {
  title: "login/register",
  description: "autentication login",
  keyords: "react, node js ,MERN, Fullstack, Javascript authentication login register",
  author: "Khoirul Anwar",
  viewport: "width=device-width, initial-scale=1.0"
}


export default Layout
