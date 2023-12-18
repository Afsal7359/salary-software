import React from 'react'
import Dashboard from '../../assets/img/icons/menu-icon-01.svg'
import logouticon from '../../assets/img/icons/logout.svg'
import Doctors from '../../assets/img/icons/menu-icon-02.svg'
import Posts from '../../assets/img/icons/menu-icon-03.svg'
import settings from '../../assets/img/icons/menu-icon-16.svg'
import Bankicon from '../../assets/img/icons/menu-icon-04.svg'
import Company from '../../assets/img/icons/company.png'
// import Report from '../../assets/img/icons/invoices-icon5.png'

import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
    <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                        <li className="menu-title">Main</li>
						<li className="submenu">
							<a href="#"><span className="menu-side"><img src={Dashboard} alt=""/></span> <span> Dashboard </span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
								{/* <li><a className="active" href="index.html">Admin Dashboard</a></li>
								<li><a href="doctor-dashboard.html">Doctor Dashboard</a></li>
								<li><a href="patient-dashboard.html">Patient Dashboard</a></li> */}
							</ul>
						</li>
						<li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span> Employee Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/employee-master">Employee Master</Link></li>
                            
                            {/* <li><Link to="/add-doctor">Add Doctor</Link></li>
                            <li><Link to="/edit-doctor">Edit Doctor</Link></li>
                            <li><Link to="/doctor-profile">Doctor Profile</Link></li> */}
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span> Salary</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/salary-bill">Salary Bill</Link></li>
                            
                            {/* <li><Link to="/add-doctor">Add Doctor</Link></li>
                            <li><Link to="/edit-doctor">Edit Doctor</Link></li>
                            <li><Link to="/doctor-profile">Doctor Profile</Link></li> */}
							</ul>
						</li>

                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Doctors} alt=""/></span> <span> Report</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/report-pf">PF Report</Link></li>
                            
							</ul>
						</li>


                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Bankicon} alt=""/></span> <span> Bank Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-Bankaccount-master">Add BankAccount</Link></li>
                            {/* <li><Link to="/add-Bank-master"> Add Bank</Link></li> */}
                            {/* <li><Link to="/add-doctor">Add Doctor</Link></li>
                            <li><Link to="/edit-doctor">Edit Doctor</Link></li>
                            <li><Link to="/doctor-profile">Doctor Profile</Link></li> */}
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Posts} alt=""/></span> <span> Post Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-post-master">Add Post Master</Link></li>
                            <li><Link to="/add-Designation"> Add Designation</Link></li>
                            
                            {/* <li><Link to="/add-doctor">Add Doctor</Link></li>
                            <li><Link to="/edit-doctor">Edit Doctor</Link></li>
                            <li><Link to="/doctor-profile">Doctor Profile</Link></li> */}
							</ul>
						</li>
                        <li className="submenu">
							<a href="#"><span className="menu-side"><img src={Posts} alt=""/></span> <span> Salary Master</span> <span className="menu-arrow"></span></a>
							<ul style={{ display:'none'}}>
                            <li><Link to="/add-salary-master">Add salary Master</Link></li>
                            {/* <li><Link to="/add-doctor">Add Doctor</Link></li>
                            <li><Link to="/edit-doctor">Edit Doctor</Link></li>
                            <li><Link to="/doctor-profile">Doctor Profile</Link></li> */}
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
                        
                        {/* <li>
                            <a href="settings.html"><span className="menu-side"><img src="assets/img/icons/menu-icon-16.svg" alt=""/></span> <span>Settings</span></a>
                        </li> */}
                        {/* <li className="menu-title">UI Elements</li>
                        <li className="submenu">
                            <a href="#"><i className="fa fa-laptop"></i> <span> Components</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display:'none'}}>
                                <li><a href="uikit.html">UI Kit</a></li>
                                <li><a href="typography.html">Typography</a></li>
                                <li><a href="tabs.html">Tabs</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="submenu">
                            <a href="#"><i className="fa fa-edit"></i> <span> Forms</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display:'none'}}>
                                <li><a href="form-basic-inputs.html">Basic Inputs</a></li>
                                <li><a href="form-input-groups.html">Input Groups</a></li>
                                <li><a href="form-horizontal.html">Horizontal Form</a></li>
                                <li><a href="form-vertical.html">Vertical Form</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="submenu">
                            <a href="#"><i className="fa fa-table"></i> <span> Tables</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display:'none'}}>
                                <li><a href="tables-basic.html">Basic Tables</a></li>
                                <li><a href="tables-datatables.html">Data Table</a></li>
                            </ul>
                        </li> */}
                        {/* <li>
                            <a href="calendar.html"><i className="fa fa-calendar"></i> <span>Calendar</span></a>
                        </li> */}
                        {/* <li className="menu-title">Extras</li>
                        <li className="submenu">
                            <a href="#"><i className="fa fa-columns"></i> <span>Pages</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display:'none'}}>
                                <li><a href="login.html"> Login </a></li>
                                <li><a href="register.html"> Register </a></li>
                                <li><a href="forgot-password.html"> Forgot Password </a></li>
                                <li><a href="change-password2.html"> Change Password </a></li>
                                <li><a href="lock-screen.html"> Lock Screen </a></li>
                                <li><a href="profile.html"> Profile </a></li>
                                <li><a href="gallery.html"> Gallery </a></li>
                                <li><a href="error-404.html">404 Error </a></li>
                                <li><a href="error-500.html">500 Error </a></li>
                                <li><a href="blank-page.html"> Blank Page </a></li>
                            </ul>
                        </li> */}
                        {/* <li className="submenu">
                            <a href="javascript:void(0);"><i className="fa fa-share-alt"></i> <span>Multi Level</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display:'none'}}>
                                <li className="submenu">
                                    <a href="javascript:void(0);"><span>Level 1</span> <span className="menu-arrow"></span></a>
                                    <ul style="display: none;">
                                        <li><a href="javascript:void(0);"><span>Level 2</span></a></li>
                                        <li className="submenu">
                                            <a href="javascript:void(0);"> <span> Level 2</span> <span className="menu-arrow"></span></a>
                                            <ul style={{ display:'none'}}>
                                                <li><a href="javascript:void(0);">Level 3</a></li>
                                                <li><a href="javascript:void(0);">Level 3</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="javascript:void(0);"><span>Level 2</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"><span>Level 1</span></a>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
					<div className="logout-btn">
						<a href="login.html"><span className="menu-side"><img src={logouticon} alt=""/></span> <span>Logout</span></a>
					</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar