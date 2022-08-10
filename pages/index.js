import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Auth'
import { useState } from 'react'
import AdminDashboard from '../components/Admin/AdminDashboard'

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {loggedIn ? <AdminDashboard/> : <Auth setLoggedIn={setLoggedIn} />}
      
    </>
  )   
}
