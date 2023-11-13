import React from 'react'
import { Link } from 'react-router-dom';
import Logos from '../assets/img/logo.png'
const Logo = () => {
  return (
    <div className="header-left">
    <Link to="/" className="logo">
        <img src={Logos} width="35" height="35" alt=""/> <span>Marketfed</span>
    </Link>
</div>
  )
}

export default Logo