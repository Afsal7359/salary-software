import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function EmployeeView({item}){

 const [tableRows, setTablerRows]=useState( item?.tablerow)
    
  
  return (
 
     <>      
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
                                                                <td>{item?.name}</td>
                                                            </tr>

                                                            <tr>
                                                                <th> Employee N.O </th>
                                                                <td>{item?.employeeno}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Address 1 </th>
                                                                <td>{item?.address1}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Address 2 </th>
                                                                <td>{item?.address2}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Address 3 </th>
                                                                <td>{item?.address3}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Pincode </th>
                                                                <td>{item?.pincode}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Gender </th>
                                                                <td>{item?.gender}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Email </th>
                                                                <td>{item?.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Phone </th>
                                                                <td>{item?.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Bank </th>
                                                                <td>{item?.bank}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Account Number </th>
                                                                <td>{item?.accountNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  IFSC </th>
                                                                <td>{item?.ifsc}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Branch </th>
                                                                <td>{item?.branch}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Pancard Number </th>
                                                                <td>{item?.panNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Pancard Name </th>
                                                                <td>{item?.panName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Date Of Joining </th>
                                                                <td>{item?.dateOfJoining}</td>
                                                           </tr>
                                                            <tr>
                                                                <th>  Date Of Birth </th>
                                                                <td>{item?.dateOfBirth}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> Age Of Retierment </th>
                                                                <td>{item?.ageOfRetierment}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Date Of Retierment </th>
                                                                <td>{item?.dateOfRetierment}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Guardian Name </th>
                                                                <td>{item?.guardianName}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Basic Salary </th>
                                                                <td>{item?.basicSalary}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>  Universal Account Number </th>
                                                                <td>{item?.universalAcNo}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>IP Number</th>
                                                                <td>{item?.Ipnumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <th> City </th>
                                                                <td>{item?.city}</td>
                                                            </tr>
                                                      
                                                            <tr>
                                                                <th>  Country </th>
                                                                <td>{item?.country}</td>
                                                            </tr>
                                                          
                                                            </thead>
                                                            {tableRows && tableRows.length > 0 ? (
    tableRows.map((data, index) => (
        <thead key={index}>
            <tr>
                <th>Id:</th> <td>{data.id}</td>
            </tr>
            <tr>
            <th>Salary Components:</th> <td> {data.salaryComponent && data.salaryComponent.name}</td>
            </tr>
            <tr>
                <th>Percentage:</th> <td> {data.percentage}</td>
            </tr>
            <tr>
                <th>Value:</th> <td>{data.value}</td>
            </tr>
            <tr>
                <th>Price:</th> <td>{data.price}</td>
            </tr>
        </thead>
    ))
) : (
    <tbody>
        <tr>
            <td style={{color:"red"}} colSpan="1">salary component not available</td>
        </tr>
    </tbody>
)}


<thead>
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
										</div></>
                   
                                       
   
  )
}

export default EmployeeView