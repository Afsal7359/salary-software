import React from 'react'
import Logo from '../Logo'
import search from '/assets/img/icons/search-normal.svg'
import menu1 from '/assets/img/icons/bar-icon.svg'
import menu2 from '/assets/img/icons/bar-icon.svg'
import book from '/assets/img/icons/note-icon-02.svg'
import user from '/assets/img/profiles/avatar-03.jpg'
import notification from '/assets/img/icons/note-icon-01.svg'
import settings from '/assets/img/icons/setting-icon-01.svg'
const Header = () => {
  return (
    <>
    <div className="header">
   <Logo/>
    <a id="toggle_btn" href="javascript:void(0);"><img src={menu1}  alt=""/></a>
    <a id="mobile_btn" className="mobile_btn float-start" href="#sidebar"><img src={menu2}  alt=""/></a>
    <div className="top-nav-search mob-view">
        <form>
            <input type="text" className="form-control" placeholder="Search here"/>
            <a className="btn" ><img src={search} alt=""/></a>
        </form>
    </div>
  
</div>

</>
  )
}

export default Header