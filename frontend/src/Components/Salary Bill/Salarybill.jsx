import React,{useEffect, useState} from 'react'
import PageHeader from '../PageHeader'
import { toast } from 'react-toastify';
import { getallemployeemaster } from '../../Apicalls/EmployeeMater';




function Salarybill() {

	
	const [EmployeeData, setEmployeeData] = useState([]);
	const [EmployeeId, setEmployeeId] = useState('');
	const [isEmployeeDataFetched, setIsEmployeeDataFetched] = useState(false);

	const [filterEmployeeData,setFilterEmployeeData]=useState('');
	const handleEmployeeclick = async () => {
	 console.log('ddddddddddEmployee');
	 try {
	   if (!isEmployeeDataFetched) {
		 const response = await getallemployeemaster ();
		 if (response.success) {
		   setEmployeeData(response.data);
		 } else {
		   setEmployeeData([]);
		 }
		 setIsEmployeeDataFetched(true);
	   }
	 } catch (error) {
	   toast.error(error.message);
	 }
   };
   console.log('ggggggggggggggggggggggg',EmployeeData);
   const handleEmployeeChange = (event) => {
	 setEmployeeId(event.target.value);
	 filteredEmployees();
	 if (EmployeeData) {
		const filteredEmployees = EmployeeData.filter(data => data.name === EmployeeId);
		setFilterEmployeeData(filteredEmployees);
	} else {
		setFilterEmployeeData([]);
	}
	
   };
console.log('employeee name',EmployeeId);





console.log('filtered data :',filterEmployeeData);

  return (
    <>
      <PageHeader/>


							<form>
							<div class="container mt-5">
								<div class="row">
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Salary No <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" style={{backgroundColor:"#cbd0d6"}} readOnly/>
										</div>
									</div>
									
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Date <span className="login-danger">*</span></label>
										    <input type="date" className="form-control"  />
										</div>
									</div>
								<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Employee Name <span className="login-danger">*</span></label>
										<input list="browsers" name="browser" id="browser" className='form-control' onClick={handleEmployeeclick} onChange={handleEmployeeChange}/>
										<datalist id="browsers">
											{EmployeeData.map((data) => (
												<option value={data.name} key={data._id}>
													{data._id}
												</option>
											))}
										</datalist>
									</div>
								</div>

									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Unit <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" style={{backgroundColor:"#cbd0d6"}} readOnly/>
										</div>
									</div>
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Employee <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" style={{backgroundColor:"#cbd0d6"}}  readOnly/>
										</div>
									</div>
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Basic Salary <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" style={{backgroundColor:"#cbd0d6"}}  readOnly/>
										</div>
									</div>
								</div>	
							</div>

				
								<div className="row">
											<div className="col-md-12">
											<div className="card invoices-add-card">
												<div className="card-body">
													<div className="invoice-add-table">
													
													<div className="table-responsive">
														<table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
														<thead>
															<tr>
															<th>No</th>
															<th>Salary Components</th>
															<th>%</th>
															<th>Value</th>
															<th>Total</th>
														
															</tr>
														</thead>
														<tbody>
															
															<tr>
																<td><input type="text" className="form-control"  style={{backgroundColor:"#cbd0d6"}}  readOnly/></td>
																<td><input type="text" className="form-control"  style={{backgroundColor:"#cbd0d6"}}  readOnly/></td>
																<td><input type="text" className="form-control"  style={{backgroundColor:"#cbd0d6"}}  readOnly/></td>
																<td><input type="text" className="form-control"  style={{backgroundColor:"#cbd0d6"}}  readOnly/></td>
																<td><input type="text" className="form-control"  style={{backgroundColor:"#cbd0d6"}}  readOnly/></td>
															</tr>
														</tbody>
														<tfoot>
															<tr>
																<td colSpan="4" className='text-end'>Allowed Leaves</td>
																<td><input className="form-control" type="number" value={10} style={{backgroundColor:"#cbd0d6"}} readOnly/></td>
															</tr>
															<tr>
																<td colSpan="4" className='text-end'>Absent</td>
																<td><input className="form-control" type="number" /></td>
															</tr>
															<div style={{display:"none"}}>balance Leave</div>
															<tr>
															<td colSpan="4" className="text-end"><strong>Total Amount:</strong></td>
															<td><input className="form-control" type="number" value={210} readOnly/>
																{/* Display the total amount here */}
																{/* You can use the 'calculateTotalAmount' function to get the total */}
															</td>
															
															</tr>
														</tfoot>
														</table>
														
													</div>
													<div className="col-12">
											<div className="doctor-submit text-end m-3">
												<button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
												<button type="submit" className="btn btn-primary cancel-form">Cancel</button>
											</div>
										</div>
													</div>
												</div>
											</div>
											</div>
										</div>
										
										</form>



    </>
  )
}

export default Salarybill