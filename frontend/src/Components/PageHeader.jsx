import React from 'react'

function PageHeader() {
  return (
    <>

				<div className="page-header">
					<div className="row">
						<div className="col-sm-12">
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><a href="index.html">Employee Master</a></li>
								<li className="breadcrumb-item"><i className="feather-chevron-right"></i></li>
								<li className="breadcrumb-item active">Add Employee</li>
							</ul>
						</div>
					</div>
				</div>
    </>
  )
}

export default PageHeader