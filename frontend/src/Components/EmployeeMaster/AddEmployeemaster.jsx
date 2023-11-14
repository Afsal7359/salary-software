import React from 'react'
import PageHeader from '../PageHeader'
import SalaryComponent from './SalaryComponent'

const AddEmployeemaster = () => {
  return (
   <>
   <PageHeader/>
     <div className="row">
					<div className="col-sm-12">
					
						<div className="card">
							<div className="card-body">
								<form>
									<div className="row">
										<div className="col-12">
											<div className="form-heading">
												<h4>Doctor Details</h4>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">  
											<div className="form-group local-forms">
												<label >Employee Id <span className="login-danger">*</span></label>
												<p className="form-control" type="text" placeholder="" />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Name <span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Employee Type<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Type</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
												  </select>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Post<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Post</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
												  </select>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Employee No <span className="login-danger">*</span></label>
												<input className="form-control" type="number" placeholder="" />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-2 <span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-1 <span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group select-gender">
												<label className="gen-label">Gender<span className="login-danger">*</span></label>
												<div className="form-check-inline">
													<label className="form-check-label">
														<input type="radio" name="gender" className="form-check-input mt-0"/>Male
													</label>
												</div>
												<div className="form-check-inline">
													<label className="form-check-label">
														<input type="radio" name="gender" className="form-check-input mt-0"/>Female
													</label>
												</div>
                                                <div className="form-check-inline">
													<label className="form-check-label">
														<input type="radio" name="gender" className="form-check-input mt-0"/>others
													</label>
												</div>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-3 <span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Email <span className="login-danger">*</span></label>
												<input className="form-control" type="email" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Phone <span className="login-danger">*</span></label>
												<input className="form-control" type="number" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Bank <span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Account No<span className="login-danger">*</span></label>
												<input className="form-control" type="number" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Branch<span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >IFSC<span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >PAN No<span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Pan Name<span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms cal-icon">
												<label >Date Of joining  <span className="login-danger">*</span></label>
												<input className="form-control datetimepicker" type="text"  placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms cal-icon">
												<label >Date Of Birth  <span className="login-danger">*</span></label>
												<input className="form-control datetimepicker" type="text"  placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Guardian Name<span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Basic Salary<span className="login-danger">*</span></label>
												<input className="form-control" type="number" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Universal Account Number<span className="login-danger">*</span></label>
												<input className="form-control" type="text" placeholder="" />
											</div>
										</div>
										
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >City <span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select City</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
												  </select>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Country  <span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Country </option>
													<option>Usa</option>
													<option>Uk</option>
													<option>Italy</option>
												  </select>
											</div>
										</div>
										<div className="col-12">
											<div className="doctor-submit text-end">
												<button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
												<button type="submit" className="btn btn-primary cancel-form">Cancel</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>							
					</div>					
				</div>

				<SalaryComponent/>
   </>
  )
}

export default AddEmployeemaster