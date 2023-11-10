import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddUnit } from '../../Apicalls/Unit';
import Unitlist from './Unitlist';
function Unit() {
	const [formData, setFormData] = useState('');
  // const [render, setrender] = useState(false);
  const [formdata, setformdata] =useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    function generateUniqueSixLetterID() {
      const currentDate = new Date();
      const year = String(currentDate.getFullYear()).slice(-2);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      
      // Combine the date and time components to create a 6-letter ID
      const id = `${year}${month}${day}${hours}${minutes}${seconds}`;
      
      return id;
      }
      
      // Example usage:
      const uniqueSixLetterID = generateUniqueSixLetterID();
        data.unitid=uniqueSixLetterID
    try {
      const response = await AddUnit(data);
      if (response.success) {
        setformdata(response.data)
        toast.success(response.message);
        setFormData(''); // Clear the form data after a successful submission
        // setrender(!render)
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <PageHeader/>
    <div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-body">
								<form  onSubmit={handleSubmit(onSubmit)}>
									<div className="row">
										<div className="col-12">
											<div className="form-heading">
												<h4>Unit Details</h4>
											</div>
										</div>
                                        {/* <div className="col-12 col-md-6 col-xl-4">  
											<div className="form-group local-forms">
												<label >Unit Id<span className="login-danger">*</span></label>
												<p className="form-control" type="text" placeholder="" />
											</div>
										</div> */}
										 <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Unit Id<span className="login-danger">*</span></label>
                      <input
                        type="text"
                        className={`form-control ${errors.unitid ? 'is-invalid' : ''}`}
                        placeholder=""
                        style={{ backgroundColor: "#cbd0d6" }}
                        readOnly // Make the input field non-editable
                      />
                    </div>
                  </div>
                                        <div className="col-12 col-md-6 col-xl-4">  
											<div className="form-group local-forms">
												<label >Name<span className="login-danger">*</span></label>
												<input 
												      {...register('name', { required: true, minLength: 4 })}
                                                      type="text"
                                                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                      placeholder=""
                                                      value={formData}
                                                      onChange={(e)=>setFormData(e.target.value)} />
													    {errors.name && errors.name.type === 'required' && (
                        <span className="text-danger">Name is required</span>
                      )}
                      {errors.name && errors.name.type === 'minLength' && (
                        <span className="text-danger">Name must be at least 4 characters</span>
                      )}
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-4">  
											<div className="doctor-submit text-end">
												<button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
												<button type="submit" className="btn btn-primary cancel-form"  onClick={() => setFormData('')}>Cancel</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>							
					</div>					
				</div>
				<Unitlist  formdata={formdata} setformdata={setformdata} />
    </>
  )
}

export default Unit