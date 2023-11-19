import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PageHeader from '../PageHeader'
import SalaryComponent from './SalaryComponent'
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { getallemployeetype } from '../../Apicalls/Employeetype';
import { getallpost } from '../../Apicalls/Post';
import { getallSalary } from '../../Apicalls/salarymaster';
import { editemployeemaster } from '../../Apicalls/EmployeeMater';
import Employeemasterlist from './Employeemasterlist';
function EditEmployeeMaster({closeEdit,  item, setData, Data,show,setshow }) {
console.log(item);
    const [tableRow, settableRow] = useState(item?.tablerow)
	console.log('kakakakakakakaka',tableRow);
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
		const updatedTableRows = [...tablerow];
		updatedTableRows[index] = {
		  ...updatedTableRows[index],
		  salaryComponent: event.target.value // Update salaryComponent based on the event value
		  
		};
		
	  console.log(updatedTableRows,"ii");
	
	  setTablerow(updatedTableRows); // Update the state with the modified rows
	  }
	// console.log('ghfdgfygfghfghf',salarymasterId);

console.log('salary data : ',salarymasterData);
	
	
	const [name, setName] = useState(item?.name);
	const [email, setEmail]=useState(item?.email);
	const [phone,setPhone]=useState(item?.phone);
	const [employeeno, setEmployeeno]=useState(item?.employeeno);
	const [address1, setAddress1]=useState(item?.address1);
	const [address2, setAddress2]=useState(item?.address2);
	const [address3, setAddress3]=useState(item?.address3);
	const [bank, setBank]=useState(item?.bank);
	const [accountNo, setAccountno]=useState(item?.accountNo);
	const [branch, setBranch]=useState(item?.branch);
	const [ifsc, setIfsc]=useState(item?.ifsc);
	const [panNo,setPanNo]=useState(item?.panNo);
	const [panName, setPanName]=useState(item?.panName);
	const [dateOfJoining, setDateOfJoining]=useState(item?.dateOfJoining);
	const [dateOfBirth,setDateOfBirth]=useState(item?.dateOfBirth);
	const [guardianname, setGuardianName]=useState(item?.guardianName);
	const [basicSalary, setBasicSalary]=useState(item?.basicSalary);
	const [universalAcNo, setUniversalAcNo]=useState(item?.universalAcNo);
	const [city, setCity]=useState(item?.city);
	const [country, setCountry]=useState(item?.country);
	const [tabledata,setTabledata]=useState(item?.tableRow);
	const [TotalSalary,setTotalSalary]=useState(item?.TotalSalary);
	const [gender, setGender]=useState(item?.gender)

	const[employelist,setEmployelist]=useState(false);
	const [editemployee,setEditemployee]=useState(true);

	const [tablerow, setTablerow] = useState(item?.tablerow ? item.tablerow : [{
		id: 1,
		salaryComponent: '',
		percentage: '',
		value: '',
		price: '',
	  }]);
	const [percentage, setPercentage]=useState('');
	const [calculatePercentage, setCalculatePercentage]=useState('')
	const [secondInputValue, setSecondInputValue] = useState('');
	const navigate = useNavigate();
const [formdata,setFormdata]=useState('')
	// const {
	// 	control,
	// 	handleSubmit,
	// 	register,
	// 	field
	//   } = useForm
	  const [itemid, setitemid] = useState(item._id);
	  const handleclick = async (event) => {
		event.preventDefault(); // Prevent default form submission

		// Prepare formData with all necessary fields
		const formData = {
		  name,
		  email,
		  phone,
		  gender,
		  employeeno,
		  address1,
		  address2,
		  address3,
		  bank,
		  accountNo,
		  ifsc,
		  branch,
		  panNo,
		  panName,
		  dateOfJoining,
		  dateOfBirth,
		  guardianname,
		  basicSalary,
		  universalAcNo,
		  city,
		  country,
		  tablerow,
		  TotalSalary,

		};
		setFormdata(formData)
		console.log('ffffooooorrrrrmmmmdddaaatttaaa',formData);
		// Update Data array if itemid matches
		const updatedData = Data.map((dataItem) => {
		  if (dataItem._id === item._id) {
			return { ...dataItem, name: formData.name }; // Update the relevant field here
		  }
		  return dataItem;
		});
		setData(updatedData);
	  
		formData._id = itemid;
		try {
		  const response = await editemployeemaster(formData);
		  if (response.success) {
			toast.success(response.message);
			setEditemployee(false)
			setEmployelist(true)
			
			// Update any state or flags to manage component visibility
			// For example, setVisibility(false);
		  } else {
			toast.error(response.message);
		  }
		} catch (err) {
		  toast.error(err.message);
		}
	  };
	
	  

	  
	 
	
	  const handleAddRow = () => {
		setTablerow((prevRows) => [
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
		setTablerow((prevRows) => prevRows.filter((row) => row.id !== id));
	  };

	

	
	 
	  

	  useEffect(() => {
	
		console.log('haaaaaaiaaaaaaaaaaia');
		const TotalSalary = tablerow.reduce((acc, row) => {
			console.log('frrrrrrrrrrrrrrrrrrrrrrrrrrr',row.salaryComponent);
			console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',salarymasterData);
			// const Salarytype = row.salaryComponent.type
			const salarytype = salarymasterData.filter((item) => {
				return item._id=== row.salaryComponent;
			});
			
			console.log('Filtered salary type:', salarytype);
			
			
		
			if (salarytype[0]?.type === 'Increment') {
			  return acc + parseFloat(row.price);
			} else if (salarytype[0]?.type === 'Decrement') {
			  return acc - parseFloat(row.price);
			}
			
			
			return acc;
		  }, basicSalary); // Initialize accumulator with basicsalary
		  setTotalSalary(TotalSalary);
	console.log('ooooolaaaa',TotalSalary,tabledata);
	  }, [tablerow, basicSalary]);
	  


	  const handleSecondInputChange = (index, value) => {
		const updatedTableRows = [...tablerow];
		updatedTableRows[index].percentage = '';
		updatedTableRows[index].value = value.trim() !== '' ? Number(value) : '';
		const newPrice = value.trim() !== '' ? value : '';
		updatedTableRows[index].price = newPrice;
		setTablerow(updatedTableRows);
	};
	
	const handleChange = (index, percentage) => {
		const updatedTableRows = [...tablerow];
		updatedTableRows[index].percentage = Number(percentage);
	
		// Reset second field's value when first field is updated
		updatedTableRows[index].value = '';
	
		// Recalculate the price based on the updated percentage and basic salary
		const newPrice = basicSalary ? (basicSalary * Number(percentage)) / 100 : '';
		updatedTableRows[index].price = newPrice || '';
	
		setTablerow(updatedTableRows);
	};
	
	//   const [editpage,setEditpage]=useState('')
	//   const [tablelist,setTablelist]=useState(false)
	  
	//   if(setEditpage(false)){
	// 	setTablelist(true)
	//   }
	const handleclicktable =()=>{
		setEditemployee(false);
		setEmployelist(true);
	}
	  

  return (
    <div>
    

     {editemployee&& <div>   <button className='btn btn-primary submit-form  ' style={{marginRight:0}} onClick={handleclicktable}>View Table</button><div className="row">
					<div className="col-sm-12">
					
						<div className="card">
							<div className="card-body">
								<form onSubmit={handleclick}>
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
												
													<input
														className={`form-control`}
														type="text"
														placeholder=""
														value={name}
														onChange={(e) => setName(e.target.value)}
													/>
													
												
											
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Employee Type<span className="login-danger">*</span></label>
												
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
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Post<span className="login-danger">*</span></label>
												
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
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
													<label>Employee No <span className="login-danger">*</span></label>
													
														<input
														
															className={`form-control`}
															type="text"
															placeholder=""
															value={employeeno}
															onChange={(e) => setEmployeeno(e.target.value)}
														/>
													
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-2 <span className="login-danger">*</span></label>
											
														<input
														onChange={(e) => setAddress2(e.target.value)}
															className={`form-control `}
															type="text"
															placeholder=""
															value={address2}
														/>
													
											</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Address-1 <span className="login-danger">*</span></label>
											
														<input
															onChange={(e) => setAddress1(e.target.value)}
															className={`form-control `}
															type="text"
															placeholder=""
															value={address1}
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
													name={gender}
													className="form-check-input mt-0"
													value="Male"
													onChange={(e) => setGender(e.target.value)}
												/>
												Male
												</label>
											</div>
											<div className="form-check-inline">
												<label className="form-check-label">
												<input
													type="radio"
													name={gender}
													className="form-check-input mt-0"
													value="Female"
													onChange={(e) => setGender(e.target.value)}
												/>
												Female
												</label>
											</div>
											<div className="form-check-inline">
												<label className="form-check-label">
												<input
													type="radio"
													name={gender}
													className="form-check-input mt-0"
													value="Others"
													onChange={(e) => setGender(e.target.value)}
												/>
												Others
												</label>
											</div>
											</div>
									    </div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-3 <span className="login-danger">*</span></label>
												
													
														<input
															value={address3}
															className={`form-control`}
															type="text"
															placeholder=""
															onChange={(e) => setAddress3(e.target.value)}
														/>
														
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Email <span className="login-danger">*</span></label>
											
														<input
															value={email}
															className={`form-control`}
															type="text"
															placeholder=""
															onChange={(e) => setEmail(e.target.value)}
														/>
														
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Phone <span className="login-danger">*</span></label>
											
														<input
													value={phone}
														className={`form-control`}
														type="number"
														placeholder=""
														onChange={(e) => setPhone(e.target.value)}
														/>
														
													
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Bank <span className="login-danger">*</span></label>
													
													<input
													onChange={(e) => setBank(e.target.value)}
														className={`form-control`}
														type="text"
														placeholder=""
														value={bank}
													/>
													
												</div>
										</div>

                                       <div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Account No<span className="login-danger">*</span></label>
													
													<input
												onChange={(e) => setAccountno(e.target.value)}
														className={`form-control`}
														type="text"
														placeholder=""
														value={accountNo}
													/>
												
												</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Branch<span className="login-danger">*</span></label>
													
													<input
														onChange={(e) => setBranch(e.target.value)}
														className={`form-control`}
														type="text"
														placeholder=""
														value={branch}
													/>
													
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>IFSC<span className="login-danger">*</span></label>
													
														<input
															onChange={(e) => setIfsc(e.target.value)}
															className={`form-control `}
															type="text"
															placeholder=""
															value={ifsc}
														/>
														
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>PAN No<span className="login-danger">*</span></label>
													
														<input
															onChange={(e) => setPanNo(e.target.value)}
															className={`form-control `}
															type="text"
															placeholder=""
															value={panNo}
														/>
														
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label>Pan Name<span className="login-danger">*</span></label>
												
														<input
															onChange={(e) => setPanName(e.target.value)}
															className={`form-control `}
															type="text"
															placeholder=""
															value={panName}
														/>
														
											</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Date Of Joining<span className="login-danger">*</span></label>
													
														<input
														onChange={(e) => setDateOfJoining(e.target.value)}
															className={`form-control `}
															type="date"
															placeholder=""
															value={dateOfJoining}
														/>
														
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label>Date Of Birth<span className="login-danger">*</span></label>
										
														<input
															className={`form-control`}
															type="date"
															placeholder=""
															value={dateOfBirth}
															onChange={(e) => setDateOfBirth(e.target.value)}
														/>
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Guardian Name<span className="login-danger">*</span></label>
											
														<input
															onChange={(e) => setGuardianName(e.target.value)}
															className={`form-control`}
															type="text"
															placeholder=""
															value={guardianname}
														/>
														
												</div>
										</div>



										
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Basic Salary<span className="login-danger">*</span></label>
													<input className='form-control' 	type="number"
															placeholder="" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)}/>
													
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Universal Account Number<span className="login-danger">*</span></label>
													<input
													onChange={(e) => setUniversalAcNo(e.target.value)}
															className={`form-control`}
															type="text"
															placeholder=""
															value={universalAcNo}
														/>
												</div>
										</div>

										
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>City <span className="login-danger">*</span></label>
													<input
															onChange={(e) => setCity(e.target.value)}
															className={`form-control`}
															type="text"
															placeholder=""
															value={city}
														/>
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Country <span className="login-danger">*</span></label>
													<input
															onChange={(e) => setCountry(e.target.value)}
															className={`form-control`}
															type="text"
															placeholder=""
															value={country}
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
															{tablerow.map((row, index) => (
															
															<tr key={row.id}>
																<td>
																<input type="text" className="form-control" value={index + 1} readOnly />
																</td>
																<td>
																<select className="form-control"
																onMouseEnter={handlesalarymasterclick}
																onChange={(event) => handlesalarymasterchange(event, index)}
																>
																	<option value={row._id} key={row._id}>{row.tabledata}</option>
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
																		className={`form-control`}
																		placeholder="%"
																		// onChange={handleChange}
																		// value={percentage}
																		value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e) => handleChange(index, e.target.value)}
																		/>
																	
																		
															</td>
																<td>
																<input
																	type="text"
																	className="form-control"
																	value={row.value ? row.value : ''}
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

															{tablerow.length === 0 && (
															setTablerow(prevRows => [...prevRows, {
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
															<td><input className="form-control" type="number" value={TotalSalary?TotalSalary:basicSalary} readOnly/>
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
				</div></div> }
				
				{employelist&&<Employeemasterlist   formdata={formdata} setformdata={setFormdata} />}

    </div>
    
  )
}

export default EditEmployeeMaster