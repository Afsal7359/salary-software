import React, { useState } from 'react'
import AddEmployeemaster from './AddEmployeemaster';
import { useNavigate } from 'react-router-dom';
import Employeemasterlist from './Employeemasterlist';
import { getallemployeemaster } from '../../Apicalls/EmployeeMater';
import { toast } from 'react-toastify';

function EmployeeView({  item, setData, Data,setShowview ,formdata}){
const [formdatas,setFormdatas]=useState(formdata)
    // const [tableRows, setTablerRows]=useState([])
const navigate=useNavigate()
const [isemployeeData,setIsEmployeeData]=useState('');
const [employeedata,setEmployeeData]=useState('');
    const tableRows = item.tablerow
    const [employeeview,setEmployeeview]=useState(true);
    const [employeelist,setEmployeelist]=useState(false)
    const handleclicktable =()=>{
        setEmployeeview(false)
       setEmployeelist(true)
    }
    
  
  return (
    <>
       {employeeview&& <>        <button className='btn btn-primary submit-form me-2 ' onClick={handleclicktable}>table</button>

                                 <div className="row">
											<div className="col-md-12">
											<div className="card invoices-add-card">
												<div className="card-body">
													<div className="invoice-add-table">
													<h4>Salary component</h4>
													<div className="table-responsive">
														<table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
														<thead>
															<tr>
                                                                <th>Name</th>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                    <th>Employee Type</th>
                                                                    <td>{item.EmployeeTypeId}</td>
                                                            </tr> */}
                                                            {/* <tr>
                                                                <th> Post </th>
                                                                <td>{item.PostId}</td>
                                                            </tr> */}
                                                            <tr>
                                                                <th> Employee N.O </th>
                                                                <td>{item.employeeno}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Address 1 </th>
                                                                <td>{item.address1}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Address 2 </th>
                                                                <td>{item.address2}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Address 3 </th>
                                                                <td>{item.address3}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Gender </th>
                                                                <td>{item.gender}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Email </th>
                                                                <td>{item.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Phone </th>
                                                                <td>{item.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Bank </th>
                                                                <td>{item.bank}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Account Number </th>
                                                                <td>{item.accountNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  IFSC </th>
                                                                <td>{item.ifsc}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Branch </th>
                                                                <td>{item.branch}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Pancard Number </th>
                                                                <td>{item.panNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Pancard Name </th>
                                                                <td>{item.panName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Date Of Joining </th>
                                                                <td>{item.dateOfJoining}</td>
                                                           </tr>
                                                            <tr>
                                                                <th>  Date Of Birth </th>
                                                                <td>{item.dateOfBirth}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Guardian Name </th>
                                                                <td>{item.guardianName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Basic Salary </th>
                                                                <td>{item.basicSalary}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Universal Account Number </th>
                                                                <td>{item.universalAcNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> City </th>
                                                                <td>{item.city}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Country </th>
                                                                <td>{item.country}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Country </th>
                                                                <td>{item.country}</td>
                                                            </tr>
                                                           <tr>
                                                            <th>Id</th>
                                                            <th>Salary Componets</th>
                                                            <th>Percentage</th>
                                                            <th>Value</th>
                                                            <th>price</th>
                                                           </tr>
                                                                {tableRows.map((data)=>(
                                                                   
                                                                    <tr>
                                                                        <td>{data.id}</td>
                                                                        <td>{data.salaryComponent}</td>
                                                                        <td>{data.percentage}</td>
                                                                        <td>{data.value}</td>
                                                                        <td>{data.price}</td>
                                                                    </tr>
                                                                ))}
                                                           <tr>
                                                            <th>Total Salary</th>
                                                            <th>{item.TotalSalary}</th>
                                                           </tr>
														</thead>

														</table>
													</div>
													</div>
												</div>
											</div>
											</div>
										</div></>}
                                        {employeelist&&<Employeemasterlist item={employeelist} formdata={formdata}/>}
                   
                                       
    </>
  )
}

export default EmployeeView