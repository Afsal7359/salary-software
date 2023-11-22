import React, { useState ,useEffect} from 'react'
import PageHeader from '../PageHeader'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddDesignation, getallDesignationcount } from '../../Apicalls/Designation';
import Designationlist from './Designationlist';
function Designation() {
	const [formData, setFormData] = useState('');
	// const [render, setrender] = useState(false);
	const [formdata, setformdata] =useState([]);
	const {
	  register,
	  handleSubmit,
	  formState: { errors },
	} = useForm();
	
	const [count,setcount]=useState(0)


	// Usage in useEffect
	useEffect(() => {
	  const fetchUniqueSixCharacterID = async () => {
		try {
		  const response = await getallDesignationcount();
		  setcount( response.data.count+1);
		} catch (error) {
		  console.error("Error:", error);
		}
	  };
	
	  fetchUniqueSixCharacterID();
	}, []);

	const onSubmit = async (data) => {

		data.designationid=`MD${count.toString().padStart(3, '0')}`
	  try {
		const response = await AddDesignation(data);
		if (response.success) {
			setcount((prevCount) => prevCount + 1);
		  setformdata(response.data)
		  toast.success(response.message);
		  setFormData('');
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
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="row">
										<div className="col-12">
											<div className="form-heading">
												<h4>Designation Details</h4>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Designation Id<span className="login-danger">*</span></label>
                      <input
                        type="text"
                        className={`form-control ${errors.designationId ? 'is-invalid' : ''}`}
                        placeholder=""
						value={`MD${count.toString().padStart(3, '0')}`}
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
                        onChange={(e)=>setFormData(e.target.value)}
                      />
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
												<button type="submit" className="btn btn-primary cancel-form">Cancel</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>							
					</div>					
				</div>
				<Designationlist  formdata={formdata} setformdata={setformdata} />
    </>
  )
}

export default Designation