import React from 'react'
import PageHeader from '../PageHeader'

function Bankaccount() {
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
                                               <h4>BankAccount Details</h4>
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">  
                                           <div className="form-group local-forms">
                                               <label >Bank Id <span className="login-danger">*</span></label>
                                               <p className="form-control" type="text" placeholder="" />
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
                                           <div className="form-group local-forms">
                                               <label >Account No <span className="login-danger">*</span></label>
                                               <input className="form-control" type="number" placeholder="" />
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
											<div className="form-group local-forms">
												<label >Bank  <span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Bank </option>
													<option>Usa</option>
													<option>Uk</option>
													<option>Italy</option>
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Operational Type  <span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Operational Type </option>
													<option>Usa</option>
													<option>Uk</option>
													<option>Italy</option>
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Cost Centre<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Cost Centre</option>
													<option>Usa</option>
													<option>Uk</option>
													<option>Italy</option>
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Account Type<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Account Type</option>
													<option>Usa</option>
													<option>Uk</option>
													<option>Italy</option>
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Department<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Department</option>
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
  </>
  )
}

export default Bankaccount