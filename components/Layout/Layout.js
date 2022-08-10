import React, {useState} from 'react'
import AdminDashboard from '../Admin/AdminDashboard'
import Auth from '../Auth'

const Layout = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
      <>
        {loggedIn ? <AdminDashboard/> : <Auth setLoggedIn={setLoggedIn} />}
      </>
    ) 
}

export default Layout