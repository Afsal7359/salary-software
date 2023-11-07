import React from 'react'
import Logos from '../assets/img/logo.png'
const Logo = () => {
  return (
    <div className="header-left">
    <a href="index.html" className="logo">
        <img src={Logos} width="35" height="35" alt=""/> <span>Marketfed</span>
    </a>
</div>
  )
}

export default Logo