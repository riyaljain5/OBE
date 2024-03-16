import { Link } from 'react-router-dom';
import React from 'react'


function Navbar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
       
    </nav>
    
  )
}

export default Navbar