import React from 'react'
import { NavLink } from 'react-router-dom';
import './HomeNav.css'


const HomeNav = () => {
  return (
      <>


     <div className='HomeNav'>
         <NavLink to="/" className='menu-bars' >Home</NavLink>
         <NavLink to="/signup" className='menu-bars'>Signup</NavLink>
         <NavLink to="/login" className='menu-bars'>Login</NavLink>
         


     </div>

   
    
    </>
  )
}

export default HomeNav