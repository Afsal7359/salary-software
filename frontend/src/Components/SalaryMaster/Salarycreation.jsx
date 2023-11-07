import React from 'react'
import PageHeader from '../PageHeader'

function Salarycreation() {
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
												<h4>Salary Details</h4>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">  
											<div className="form-group local-forms">
												<label >Salary Component Id<span className="login-danger">*</span></label>
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
												<label >Purpose<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Purpose</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
												  </select>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Type<span className="login-danger">*</span></label>
												<select className="form-control select">
													<option>Select Type</option>
													<option>Alaska</option>
													<option>Los Angeles</option>
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

export default Salarycreation