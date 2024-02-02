import React from 'react'
import Dashboard from '../../assets/img/icons/menu-icon-01.svg'
import logouticon from '../../assets/img/icons/logout.svg'
import Doctors from '../../assets/img/icons/menu-icon-02.svg'
import Posts from '../../assets/img/icons/menu-icon-03.svg'
import settings from '../../assets/img/icons/menu-icon-16.svg'
import Bankicon from '../../assets/img/icons/menu-icon-04.svg'
import Company from '../../assets/img/icons/company.png'
// import Report from '../../assets/img/icons/invoices-icon5.png'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth } from '../../Store/AuthSlice'
import { adminlogout } from '../../Store/Adminauth'
const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { admintoken } = useSelector((state)=>state.admin);
    console.log(admintoken,"tttttto");
    const {superAdmin} = useSelector(selectAuth)

    const handlelogout =()=>{
        try {
           dispatch(logout())
            // localStorage.removeItem('token')
           
        } catch (error) {
            console.log(error);
        }
    }
    const handleAdminLogout =()=>{
        try {
            dispatch(adminlogout())
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    {admintoken? (<ul>
                        <li className="menu-title">Main</li>
						<li className="submenu">
							<a href="#"><span className="menu-side"><img src={Dashboard} alt=""/></span> <span> Dashboard </span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
								
							</ul>
						</li>
						<li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span> Employee Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/employee-master">Employee Master</Link></li>
                       
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span> Salary</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/salary-bill">Salary Bill</Link></li>
                            
							</ul>
						</li>

                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span> Report</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/pf-report">PF Report</Link></li>
                            <li><Link to="/esi-report">ESI Report</Link></li>
                            <li><Link to="/salary-report">Salary Monthly Report</Link></li>
                            <li><Link to="/bank-report">Bank Report</Link></li>
							</ul>
						</li>


                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Bankicon} alt=""/></span> <span> Bank Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-Bankaccount-master">Add BankAccount</Link></li>
                           
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Posts} alt=""/></span> <span> Post Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-post-master">Add Post Master</Link></li>
                            <li><Link to="/add-Designation"> Add Designation</Link></li>
                            
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Posts} alt=""/></span> <span> Salary Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-salary-master">Add salary Master</Link></li>
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Company} alt=""/></span> <span>Company Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/company-master">Add Company</Link></li>
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={settings} alt=""/></span> <span> Settings </span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-employeetype"> Add EmployeeType</Link></li>
                            <li><Link to="/add-Department"> Add Department</Link></li>
                            <li><Link to="/add-unit"> Add unit</Link></li>
                         
                            <li><Link to="/add-Bank-master"> Add Bank</Link></li>
                            <li><Link to="/add-purpose"> Add purpose</Link></li>
                            <li><Link to="/add-Type"> Add Type</Link></li>
                            <li><Link to="/add-operationalType"> Add OperationalType</Link></li>
                            <li><Link to="/add-accounttype"> Add AccountType</Link></li>
							
							</ul>
						</li>

                      
                        <li className="submenu mb-5">
							<a href="#"><span className="menu-side"><img src={logouticon} ></img></span> <span>   <li><Link onClick={handleAdminLogout}> Logout</Link></li></span></a>
							
						</li>
                      
                       
                    </ul>):(<ul> 
                        
                        <li className="submenu">
							<a href="#"><span className="menu-side"></span> <span>   <li><Link to="/superadmin"> Dashboard</Link></li></span></a>
							
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"></span> <span>   <li><Link to="/add-admin"> Add Admin</Link></li></span></a>
							
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"></span> <span>   <li><Link onClick={handlelogout}> Logout</Link></li></span></a>
							
						</li>
                     </ul>)}
					{/* <div className="logout-btn">
						<a><span className="menu-side btn-submit"  ><img src={logouticon} alt=""/></span> <span>Logout</span></a>
					</div> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar