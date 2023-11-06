import React from 'react'
import PageHeader from '../PageHeader'
import Postlist from './Postlist'

const Postmaster = () => {
  return (
    <>
    <PageHeader/>
    <div class="row">
					<div class="col-sm-12">
					
						<div class="card">
							<div class="card-body">
								<form>
									<div class="row">
										<div class="col-12">
											<div class="form-heading">
												<h4>Post Details</h4>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">  
											<div className="form-group local-forms">
												<label >Post Id<span className="login-danger">*</span></label>
												<p className="form-control" type="text" placeholder="" />
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Department<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Department</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Unit <span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Unit</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
												  </select>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Designation  <span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Designation </option>
													<option>Usa</option>
													<option>Uk</option>
													<option>Italy</option>
												  </select>
											</div>
										</div>
										<div class="col-12">
											<div class="doctor-submit text-end">
												<button type="submit" class="btn btn-primary submit-form me-2">Submit</button>
												<button type="submit" class="btn btn-primary cancel-form">Cancel</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>							
					</div>					
				</div>
                <Postlist/>
              
                </>
  )
}

export default Postmaster