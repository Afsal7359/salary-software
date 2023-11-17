import React,{useEffect, useState} from 'react'
import PageHeader from '../PageHeader'
import SalaryComponent from './SalaryComponent'
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { getallemployeetype } from '../../Apicalls/Employeetype';
import { getallpost } from '../../Apicalls/Post';
import { getallSalary } from '../../Apicalls/salarymaster';
import { Addemployee } from '../../Apicalls/EmployeeMater';
function EditEmployeeMaster({  item, setData, Data,show,setshow }) {
console.log(item);
const [tableRow, settableRow] = useState(item?.tablerow)
	const [employeeTypeData, setEmployeeTypeData]=useState([]);
	const [employeeTypeId, setEmployeeTypeId]=useState('');
	const [isemployeeTypeDataFetch, setisEmployeeTypeDataFetch]=useState(false);

	const handlemployeetypeclick = async()=>{
		try{
			if(!isemployeeTypeDataFetch){
				const response= await getallemployeetype();
				if(response.success){
					setEmployeeTypeData(response.data);
				}else{
					setEmployeeTypeData([]);
				}
			}setisEmployeeTypeDataFetch(true)
		}catch(error){
			toast.error(error.message)
		}
	}
	const handleemployeetypechange = (event)=>{
		setEmployeeTypeId(event.target.value);
	};

	const [postData, setPostData]=useState([]);
	const [postId, setPostId]=useState('');
	const [ispostDataFetched, setIspostDataFetched]=useState(false);

	const handlePostClick= async()=>{
		try{
			if(!ispostDataFetched){
				const response=await getallpost();
				if(response.success){
					setPostData(response.data);
				}else{
					setPostData([]);
				}
			}setIspostDataFetched(true)
		}catch(error){
			toast.error(error.message);
		}
	};
	const handlePostChange=(event)=>{
		setPostId(event.target.value);
	}


	const [issalarymasterDataFetched, setIsSalarymasterDataFetched]=useState(false);
	const [salarymasterData,setSalarymasterData]=useState([]);
	const [salarymasterId, setSalarymasterId]=useState('');

	const handlesalarymasterclick =async()=>{
		try{
			if(!issalarymasterDataFetched){
				const response = await getallSalary();
				if(response.success){
					
					setSalarymasterData(response.data);
					
				}else{
					setSalarymasterData([]);
				}
			}setIsSalarymasterDataFetched(true)
		}catch(error){
			toast.error(error.message)
		}
	}
	const [salarycomponent,setSalaryComponent]=useState([]);

	const handlesalarymasterchange = (event, index) => {
		const updatedTableRows = [...tableRows];
		updatedTableRows[index] = {
		  ...updatedTableRows[index],
		  salarycomponent: event.target.value // Update salaryComponent based on the event value
		  
		};
		
	  console.log(updatedTableRows,"ii");
		settableRows(updatedTableRows); // Update the state with the modified rows
	  }
	// console.log('ghfdgfygfghfghf',salarymasterId);

console.log('salary data : ',salarymasterData);
	
	
	const [name, setName] = useState('');
	const [email, setEmail]=useState('');
	const [phone,setPhone]=useState('');
	const [employeeno, setEmployeeno]=useState('');
	const [address1, setAddress1]=useState('');
	const [address2, setAddress2]=useState('');
	const [address3, setAddress3]=useState('');
	const [bank, setBank]=useState('');
	const [accountno, setAccountno]=useState('');
	const [branch, setBranch]=useState('');
	const [ifsc, setIfsc]=useState('');
	const [panNo,setPanNo]=useState('');
	const [panName, setPanName]=useState('');
	const [dateOfJoining, setDateOfJoining]=useState('');
	const [dateOfBirth,setDateOfBirth]=useState('');
	const [guardianname, setGuardianName]=useState('');
	const [basicsalary, setBasicSalary]=useState(item?.basicSalary);
	const [universalAcNo, setUniversalAcNo]=useState('');
	const [city, setCity]=useState('');
	const [country, setCountry]=useState('');


	const [tableRows, settableRows] = useState([])
	const [percentage, setPercentage]=useState('');
	const [calculatePercentage, setCalculatePercentage]=useState('')
	const [secondInputValue, setSecondInputValue] = useState('');


	const {
		control,
		handleSubmit,
		register,
		setError,
		formState: { errors },
	  } = useForm({
		defaultValues: {
		  name: item.name,
		  employeeno:item.employeeno,
		  email: item.email,
		  phone:item.phone,
		  address1 :item.address1,
		  address2 :item.address2,
		  address3 :item.address3,
		  bank :item.bank,
		  accountNo:item.accountNo,
		  branch:item.branch,
		  ifsc :item.ifsc,
		  panNo:item.panNo,
		  panName :item.panName,
		  dateOfJoining: item.dateOfJoining,
		  dateOfBirth: item.dateOfBirth,
		  guardianName: item.guardianName,
		
		  universalAcNo : item.universalAcNo,
		  city : item.city,
		  country : item.country,
		
		  id : item.tablerow.id,
		  salaryComponent: item.tablerow.salaryComponent,
		  percentage: item.tablerow.percentage,
		  value: item.tablerow.value,
		  price: item.tablerow.price,
		  TotalSalary: item.TotalSalary

		},
	  });
	
	  const onSubmit = async (data) => {
		
	
		try {
			console.log('Afsal :' , data);
		  const response = await Addemployee(data);
		  if (response.success) {
			
			toast.success(response.message);
			setName('');
			setEmployeeTypeId('');
			setPostId('');
			setEmail('');
			setPhone('');
			setEmployeeno('');
			setAddress1('');
			setAddress2('');
			setAddress3('');
			setBank('');
			setAccountno('');
			setBranch('');
			setIfsc('');
			setPanNo('');
			setPanName('');
			setDateOfJoining('');
			setDateOfBirth('');
			setGuardianName('');
			setBasicSalary('');
			setUniversalAcNo('')
			setCity('');
			setCountry('');
			setPercentage('');
			setSecondInputValue('');

		  } else {
			toast.error(response.message);
		  }
		} catch (err) {
		  toast.error(err.message);
		}
	  };
	  


	 
	
	  const handleAddRow = () => {
		settableRows((prevRows) => [
		  ...prevRows,
		  {
			id: Date.now(),
			salaryComponent: '',
			percentage: '',
			value: '',
			price: '',
		  },
		]);
	  };
	
	  const handleRemoveRow = (id) => {
		settableRows((prevRows) => prevRows.filter((row) => row.id !== id));
	  };

	  const [totalAmount, setTotalAmount] = useState(0);
	

	  useEffect(() => {
		
		
		const totalAmount = tableRows.reduce((acc, row) => {
			if (row.salaryComponent === 'Increment') {
			  return acc + parseFloat(row.price);
			} else if (row.salaryComponent === 'Decrement') {
			  return acc - parseFloat(row.price);
			}
			return acc;
		  }, basicsalary); // Initialize accumulator with basicsalary
		  
		  // Use the calculated totalAmount
		  setTotalAmount(totalAmount);


	  }, [tableRows, basicsalary]);
	  


	  const handleChange = (index,percentage) => {
		
		const updatedTableRows = [...tableRows];
		
		
        updatedTableRows[index].percentage = Number(percentage);
       // Recalculate the price based on the updated percentage and basic salary
    const newPrice = (basicsalary * Number(percentage)) / 100;
    updatedTableRows[index].price = newPrice;
    settableRows(updatedTableRows);
	};

	

	const handleSecondInputChange = (index,value) => {
		const updatedTableRows = [...tableRows];
		updatedTableRows[index].percentage ='';
		updatedTableRows[index].value = Number(value);
		const newPrice = (value)
		updatedTableRows[index].price = newPrice;
        settableRows(updatedTableRows);
	};


	const handlebasicsalarychange=(e)=>{
		setBasicSalary(e.target.value)
	}


  return (
    <div>
        <PageHeader/>
     <div className="row">
					<div className="col-sm-12">
					
						<div className="card">
							<div className="card-body">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="row">
										<div className="col-12">
											<div className="form-heading">
												<h4>Employee Master</h4>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
											<label>Employee Id</label>
											<input className="form-control" type="text" placeholder=""   style={{ backgroundColor: "#cbd0d6" }}
												readOnly />
											</div>
										</div>
									
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Name <span className="login-danger">*</span></label>
												<Controller

													name="name"
													control={control}
													render={({ field }) => (
													<input
														{...field}
														className={`form-control ${errors.name ? 'is-invalid' : ''}`}
														type="text"
														placeholder=""
													/>
													)}
													/>
												
											
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Employee Type<span className="login-danger">*</span></label>
												<Controller
													name="EmployeeTypeId"
													control={control}
													defaultValue={item.EmployeeTypeId._id}
													render={({ field }) => (
												<select className="form-control select"
													
												onMouseEnter={handlemployeetypeclick}
												onChange={handleemployeetypechange}
												>
													
													<option value={item.EmployeeTypeId._id}>{item.EmployeeTypeId.name}</option>
													{employeeTypeData.map((option)=>(
														<option value={option._id} key={option._id}>
															{option.name}
														</option>
													))}
												  </select>
												  )}
												  />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Post<span className="login-danger">*</span></label>
												<Controller
													name="EmployeeTypeId"
													control={control}
													defaultValue={item.PostId._id}
													render={({ field }) => (
												<select className="form-control select"
													onMouseEnter={handlePostClick}
													onChange={handlePostChange}
												>
												
													<option value={item.PostId._id}>{item.PostId.designation.name}</option>
													{postData.map((option)=>(
														<option value={option._id} key={option._id}>
															{option.designation.name}
														</option>
													))}
												  </select>
												  )}
												  />
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
													<label>Employee No <span className="login-danger">*</span></label>
													<Controller

														name="employeeno"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.employeeno ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
													{errors.employeeno && errors.employeeno.type === 'required' && (
													<span className="text-danger">Employee No is required</span>
													)}
													{errors.employeeno && errors.employeeno.type === 'minLength' && (
													<span className="text-danger">Employee No must be at least 1 character</span>
													)}
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-2 <span className="login-danger">*</span></label>
												<Controller

														name="address2"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.address2 ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
											</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Address-1 <span className="login-danger">*</span></label>
													<Controller

														name="address1"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.address1 ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
													
													
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group select-gender">
											<label className="gen-label">Gender<span className="login-danger">*</span></label>
											<div className="form-check-inline">
												<label className="form-check-label">
												<input
													type="radio"
													name="gender"
													className="form-check-input mt-0"
													value="Male"
													{...register('gender')}
												/>
												Male
												</label>
											</div>
											<div className="form-check-inline">
												<label className="form-check-label">
												<input
													type="radio"
													name="gender"
													className="form-check-input mt-0"
													value="Female"
													{...register('gender')}
												/>
												Female
												</label>
											</div>
											<div className="form-check-inline">
												<label className="form-check-label">
												<input
													type="radio"
													name="gender"
													className="form-check-input mt-0"
													value="Others"
													{...register('gender')}
												/>
												Others
												</label>
											</div>
											</div>
									    </div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-3 <span className="login-danger">*</span></label>
												<Controller

														name="address3"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.address3 ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Email <span className="login-danger">*</span></label>
												<Controller

														name="email"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.email ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
															
														/>
														)}
														/>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Phone <span className="login-danger">*</span></label>
												<Controller
													name="phone"
													control={control}
													rules={{
													required: 'Phone number is required',
													pattern: {
														value: /^[0-9]{10}$/,
														message: 'Please enter a valid phone number',
													},
													}}
													render={({ field }) => (
													<>
														<input
														{...field}
														className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
														type="number"
														placeholder=""
													
														/>
														{errors.phone && (
														<span className="text-danger">{errors.phone.message}</span>
														)}
													</>
													)}
												/>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Bank <span className="login-danger">*</span></label>
													<Controller

													name="bank"
													control={control}
													render={({ field }) => (
													<input
														{...field}
														className={`form-control ${errors.bank ? 'is-invalid' : ''}`}
														type="text"
														placeholder=""
													/>
													)}
													/>
												</div>
										</div>

                                       <div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Account No<span className="login-danger">*</span></label>
													<Controller

													name="accountNo"
													control={control}
													render={({ field }) => (
													<input
														{...field}
														className={`form-control ${errors.bank ? 'is-invalid' : ''}`}
														type="text"
														placeholder=""
													/>
													)}
													/>
												</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Branch<span className="login-danger">*</span></label>
													<Controller

													name="branch"
													control={control}
													render={({ field }) => (
													<input
														{...field}
														className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
														type="text"
														placeholder=""
													/>
													)}
													/>
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>IFSC<span className="login-danger">*</span></label>
													<Controller

														name="ifsc"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.ifsc ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>PAN No<span className="login-danger">*</span></label>
													<Controller

														name="panNo"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.panNo ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label>Pan Name<span className="login-danger">*</span></label>
												<Controller

														name="panName"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.panName ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
											</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Date Of Joining<span className="login-danger">*</span></label>
													<Controller

														name="dateOfJoining"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label>Date Of Birth<span className="login-danger">*</span></label>
											<Controller

														name="ifsc"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.ifsc ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Guardian Name<span className="login-danger">*</span></label>
												<Controller

														name="guardianName"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.guardianName ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
												</div>
										</div>



										
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Basic Salary<span className="login-danger">*</span></label>
													<input className='form-control' 	type="number"
															placeholder="" value={basicsalary} onChange={handlebasicsalarychange}/>
													
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Universal Account Number<span className="login-danger">*</span></label>
													<Controller

														name="universalAcNo"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.universalAcNo ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
												</div>
										</div>

										
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>City <span className="login-danger">*</span></label>
													<Controller

														name="city"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.city ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Country <span className="login-danger">*</span></label>
													<Controller

														name="country"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.country ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
														/>
														)}
														/>
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
															<th></th>
															</tr>
														</thead>

														<tbody>
															{tableRow.map((row, index) => (
															<tr key={row.id}>
																<td>
																	

												
													
													
													<input
														value={row.id}
														className="form-control"
														type="text"
														placeholder=""
														readOnly
													/>
													
													
																
																</td>
																<td>
																	
														
															<select className="form-control"
															
															onMouseEnter={handlesalarymasterclick}
															onChange={(event) => handlesalarymasterchange(event, index)}
															
															>
																 <option value={row._id}>{row.salaryComponent || 'salaryComponent'}</option>

																{salarymasterData.map((option)=>(
																	
																	<option value={option._id} key={option._id}>
																		{option.name}
																	</option>
																
																))}
															</select>
													
													
																
																</td>
																
																<td>
																<input
																		
																		type="number"
																		className={`form-control ${errors.percentage ? 'is-invalid' : ''}`}
																		placeholder="%"
																		// onChange={handleChange}
																		// value={percentage}
																		// value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e) => handleChange(index, e.target.value)}
																		/>
																	
																		{errors.percentage && errors.percentage.type === 'pattern' && (
																		<span className="text-danger">Please enter a valid percentage</span>
																		)}
															</td>
																<td>
																<input
																	type="text"
																	className="form-control"
																	// value={row.value ? row.value : ''}
																	onChange={(e) => handleSecondInputChange(index, e.target.value)}
																	
																/>
																</td>
																<td>
																<input type="text" className="form-control" 
																 value={row.price?row .price:''}
																 readOnly/>
																</td>
																<td className="add-remove text-end">
																
																	<a href="javascript:void(0);" className="me-2" onClick={handleAddRow}>
																	<i className="fas fa-plus-circle"></i>
																	</a>
															
															
																	<a href="javascript:void(0);" className="remove-btn" onClick={() => handleRemoveRow(row.id)}>
																	<i className="fa fa-trash-alt"></i>
																	</a>
																
																</td>
															</tr>
															))}

															{tableRows.length === 0 && (
															settableRows(prevRows => [...prevRows, {
																id: 1,
																salaryComponent: '',
																percentage: '',
																value: '',
																price: '',
															}])
														)}
														</tbody>
														<tfoot>
															
															<tr>
															<td colSpan="5" className="text-end"><strong>Total Amount:</strong></td>
															<td>
																<Controller

														name="TotalSalary"
														control={control}
														render={({ field }) => (
														<input
															{...field}
															className={`form-control ${errors.TotalSalary ? 'is-invalid' : ''}`}
															type="text"
															placeholder=""
															readOnly/>
														)}
														/>
																{/* <input className="form-control" type="number" value={totalAmount?totalAmount:basicsalary} readOnly/> */}
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
    </div>
    
  )
}

export default EditEmployeeMaster