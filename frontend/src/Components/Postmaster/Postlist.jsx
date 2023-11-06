import React from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg'
import addicon from '../../assets/img/icons/plus.svg'
import refreshicon  from '../../assets/img/icons/re-fresh.svg'
import pdficon  from '../../assets/img/icons/pdf-icon-01.svg'
import TXticon  from '../../assets/img/icons/pdf-icon-02.svg'
import csvicon  from '../../assets/img/icons/pdf-icon-03.svg'
import Excelicon  from '../../assets/img/icons/pdf-icon-04.svg'
function Postlist() {
  return (
  <>
  <div class="row">
					<div class="col-sm-12">
		<div className="card  card-table show-entire">
			<div className="card-body">
				<div className="page-table-header mb-2">
					<div className="row align-items-center">
						<div className="col">
								<div className="doctor-table-blk">
									<h3>Post List</h3>
										<div className="doctor-search-blk">
											<div className="top-nav-search table-search-blk">
												<form>
													<input type="text" className="form-control" placeholder="Search here"/>
													<a className="btn"><img src={searchicon} alt=""/></a>
												</form>
											</div>
											<div className="add-group">
											<a href="add-doctor.html" className="btn btn-primary add-pluss ms-2"><img src={addicon} alt=""/></a>
											<a href="javascript:;" className="btn btn-primary doctor-refresh ms-2"><img src={refreshicon} alt=""/></a>
											</div>
										</div>
								</div>
						</div>
										<div className="col-auto text-end float-end ms-auto download-grp">
											<a href="javascript:;" className=" me-2"><img src={pdficon} alt=""/></a>
											<a href="javascript:;" className=" me-2"><img src={TXticon} alt=""/></a>
											<a href="javascript:;" className=" me-2"><img src={csvicon} alt=""/></a>
											<a href="javascript:;" ><img src={Excelicon} alt=""/></a>
											
										</div>
									</div>
								</div>
					
								
								<div class="table-responsive">
									<table class="table border-0 custom-table comman-table datatable mb-0">
										<thead>
											<tr>
												<th>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</th>
												<th>Name</th>
												<th>Department</th>
												<th>Specialization</th>
												<th>Degree</th>
												<th>Mobile</th>
												<th>Email</th>
												<th >Joining Date</th>
												<th ></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-01.jpg" class="rounded-circle m-r-5" alt=""/> Andrea Lalema</a></td>
												<td>Otolaryngology</td>
												<td>Infertility</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a6c3dec7cbd6cac3e6c3cbc7cfca88c5c9cb">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-02.jpg" class="rounded-circle m-r-5" alt=""/> Dr.Smith Bruklin</a></td>
												<td>Urology</td>
												<td>Prostate</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0a6f726b677a666f4a6f676b636624696567">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-03.jpg" class="rounded-circle m-r-5" alt=""/> Dr.William Stephin</a></td>
												<td>Radiology</td>
												<td>Cancer</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="086d70696578646d486d65696164266b6765">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-04.jpg" class="rounded-circle m-r-5" alt=""/> Bernardo James</a></td>
												<td>Dentist</td>
												<td>Prostate</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="47223f262a372b2207222a262e2b6924282a">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-06.jpg" class="rounded-circle m-r-5" alt=""/>Cristina Groves</a></td>
												<td>Gynocolgy</td>
												<td>Prostate</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0f6a776e627f636a4f6a626e6663216c6062">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-05.jpg" class="rounded-circle m-r-5" alt=""/> Mark Hay Smith</a></td>
												<td>Gynocolgy</td>
												<td>Prostate</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a8cdd0c9c5d8c4cde8cdc5c9c1c486cbc7c5">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-01.jpg" class="rounded-circle m-r-5" alt=""/> Andrea Lalema</a></td>
												<td>Otolaryngology</td>
												<td>Infertility</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="204558414d504c4560454d41494c0e434f4d">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="form-check check-tables">
														<input class="form-check-input" type="checkbox" value="something"/>
													</div>
												</td>
												<td class="profile-image"><a href="profile.html"><img width="28" height="28" src="assets/img/profiles/avatar-02.jpg" class="rounded-circle m-r-5" alt=""/> Dr.Smith Bruklin</a></td>
												<td>Urology</td>
												<td>Prostate</td>
												<td>MBBS, MS</td>
												<td><a href="javascript:;">+1 23 456890</a></td>
												<td><a href="https://preclinic.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0a6f726b677a666f4a6f676b636624696567">[email&#160;protected]</a></td>
												<td>01.10.2022</td>
												<td class="text-end">
													<div class="dropdown dropdown-action">
														<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a class="dropdown-item" href="edit-doctor.html"><i class="fa-solid fa-pen-to-square m-r-5"></i> Edit</a>
															<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"><i class="fa fa-trash-alt m-r-5"></i> Delete</a>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>	
                        </div>
                        </div>						
			
  </>
  )
}

export default Postlist