import React, { useState ,useEffect} from 'react';
import PageHeader from '../PageHeader'
import { getallPurposee } from '../../Apicalls/Purpose';
import { toast } from 'react-toastify';
import { getallType } from '../../Apicalls/Type';
import { useForm } from 'react-hook-form';
import { Addsalarymaster } from '../../Apicalls/salarymaster';
import Salarylist from './Salarylist';

const MemoizedSalarylist = React.memo(Salarylist);

function Salarycreation() {

	const [salarymasterId, setSalarymasterId] = useState('');

	const generateUniqueSixLetterID = () => {
		const characters = '765464565434354364564560123456789';
		let id = '';
		for (let i = 0; i < 6; i++) {
		  const randomIndex = Math.floor(Math.random() * characters.length);
		  id += characters[randomIndex];
		}
		return id;
	  };
	  
	  
	  useEffect(() => {
		const uniqueSixCharacterID = generateUniqueSixLetterID();
		setSalarymasterId(uniqueSixCharacterID);
	  }, []);
	
	const [PurposeData, setPurposeData] = useState([]);
	const [type, setType]=useState([]);
	const [name, setName] = useState([]);
	const [PurposeId, setPurposeId]=useState('');
	const [TypeId, setTypeId]=useState('');
	const [formdata, setformdata] = useState([]);

	const [isPurposeDataFetched, setIsPurposeDataFetched] = useState(false);
	const [isTypeDataFetched, setIsTypeDataFetched] = useState(false);


	const {
		register,
		formState: { errors },
	  } = useForm();

	const handlePurposeClick = async () => {
		console.log(PurposeData,"iiiiii");
		try {
		  if (!isPurposeDataFetched) {
			const response = await getallPurposee();
			if (response.success) {
			  setPurposeData(response.data);
			} else {
			  setPurposeData([]);
			}
			setIsPurposeDataFetched(true);
		  }
		} catch (error) {
		  toast.error(error.message);
		}
	  };

	//   const handleTypeClick = async () =>{
	// 	try {
	// 		if(!isTypeDataFetched){
	// 			const response = await getallType();
	// 			if(response.success){
	// 				setTypeData(response.data);
	// 			}else{
	// 				setTypeData([]);
	// 			}
	// 			setIsTypeDataFetched(true);
	// 		}
	// 	}catch(error){
	// 		toast.error(error.message);
	// 	}
	//   }



	  const handlePurposeChange = (event) => {
		setPurposeId(event.target.value);
	  };
	//   const handleTypeChange = (event)=>{
	// 	setType(event.target.value);
	//   }

	// Function to handle change in the dropdown
	const handleSelectChange = (event) => {
	  setType(event.target.value); // Update the selected value in the state
	};
	console.log('ifffffffif : ',type);
	  const handleSubmit = async (event) => {
		event.preventDefault();
		const uniqueSixCharacterID = generateUniqueSixLetterID(); // Reusing the same function
		setSalarymasterId(uniqueSixCharacterID);
		// Use unitId, departmentId, designationId as needed
		console.log('Purpose ID:', PurposeId);
	
		const formdatas = {
			name,
			PurposeId,
			type,
			salarymasterId
		  };
		  console.log(formdatas);
		  try {
		
	  
			// Example usage:
	  
			const response = await Addsalarymaster(formdatas);
			console.log(response, 'tereresponse');
			if (response.success) {
			  setformdata(response.data);
			  setName('');
			  setType('');
			  setPurposeId('');
			  setSalarymasterId
			  toast.success(response.message);
			} else {
			  toast.error(response.message);
			}
		  } catch (err) {
			console.log(err);
		  }
		};

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
												<input className="form-control" type="text" placeholder="" value={salarymasterId}  style={{ backgroundColor: "#cbd0d6" }} readOnly/>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
                                              <label >Name<span className="login-danger">*</span></label>
                                              <input
                                             {...register('name', { required: true, minLength: 4 })}
                                            type="text"
                                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                           placeholder=""
                                          value={name}
                                           onChange={(e)=>setName(e.target.value)}
                                          />
                                         {errors.name && errors.name.type === 'required' && (
                                        <span className="text-danger">Name is required</span>
                                          )}
                                          {errors.name && errors.name.type === 'minLength' && (
                                         <span className="text-danger">Name must be at least 4 characters</span>
                                         )}
                                          </div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Purpose<span className="login-danger">*</span></label>
												<select className="form-control select"
												onMouseEnter={handlePurposeClick}
												onChange={handlePurposeChange}>

													<option value="">Select Purpose</option>
														{PurposeData.map((option) => (
														<option key={option._id} value={option._id}>
															{option.name}
														</option>
														))}
												  </select>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Type<span className="login-danger">*</span></label>
												<select
													className="form-control select"
													value={type} // Set the value of the select to the state
													onChange={handleSelectChange} // Handle change in the select
												>
													<option value="">Select Type</option>
													<option value="Increment">Increment</option>
													<option value="Decrement">Decrement</option>
												</select>
											</div>
										</div>
									
										<div className="col-12">
											<div className="doctor-submit text-end">
												<button type="submit" className="btn btn-primary submit-form me-2" onClick={handleSubmit}>Submit</button>
												<button type="submit" className="btn btn-primary cancel-form">Cancel</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>							
					</div>					
				</div>
				<MemoizedSalarylist  formdata={formdata} setformdata={setformdata} />
   </>
  )
}

export default Salarycreation