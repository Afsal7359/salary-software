import React from 'react'

function Salarybill() {
  return (
    <>
      <div className="page-header">
					<div className="row">
						<div className="col-sm-12">
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><a href="index.html">Salary</a></li>
								<li className="breadcrumb-item"><i className="feather-chevron-right"></i></li>
								<li className="breadcrumb-item active">Salary Bill</li>
							</ul>
						</div>
					</div>
				</div>



				<div className="col-sm-12">
						<div className="card">
								<div className="card-body d-flex">
									<div className="col-12 col-md-6 col-xl-4 d-inline-block m-3">
												<div className="form-group local-forms">
													<label>Country <span className="login-danger">*</span></label>
													<input
													
													type="text"
													className='form-control'
													placeholder=""
													
													/>
													
												</div>
											</div>
											<div className="col-12 col-md-6 col-xl-4 d-inline-block m-3">
												<div className="form-group local-forms">
													<label>Country <span className="login-danger">*</span></label>
													<input
													
													type="text"
													className='form-control'
													placeholder=""
													
													/>
													
												</div>
											</div>
										</div>
								</div>
							</div>
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
															<th>No</th>
															<th>Salary Components</th>
															<th>%</th>
															<th>Value</th>
															<th>Total</th>
														
															</tr>
														</thead>
														<tbody>
															
															<tr>
																<td><input type="text" className="form-control" /></td>
																<td><input type="text" className="form-control" /></td>
																<td><input type="text" className="form-control" /></td>
																<td><input type="text" className="form-control" /></td>
																<td><input type="text" className="form-control" /></td>
															</tr>
														</tbody>
														<tfoot>
															
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
													</div>
												</div>
											</div>
											</div>
										</div>
			
				



    </>
  )
}

export default Salarybill