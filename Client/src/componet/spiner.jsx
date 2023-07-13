/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../layout/layout'

const Spiner = ({ message }) => {
  const [count, setcount] = useState(3)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setcount(prevVal => --prevVal)
    }, 1000);

    count === 0 && navigate("/login", { state: location.pathname })

    return () => clearInterval(interval)
  }, [count, navigate])

  return (
    <Layout>
      <div className='text-center'>
        <svg className='h-12 w-12 border-4 inline-block border-black animate-spin border-r-transparent rounded-full'>
        </svg>
        <h1 className='font-poppins font-bold text-3xl'>{message}</h1>
        <h1 className='text-xl font-semibold'>Redirect to Login in {count} second</h1>
      </div>
    </Layout>
  )
}

export default Spiner
