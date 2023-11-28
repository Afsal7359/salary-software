import React,{useEffect, useMemo, useState} from 'react'
import PageHeader from '../PageHeader'

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { getallemployeetype } from '../../Apicalls/Employeetype';
import { getallpost } from '../../Apicalls/Post';
import { getallSalary } from '../../Apicalls/salarymaster';
import { Addemployee, getallemployeemastercount } from '../../Apicalls/EmployeeMater';
import Employeemasterlist from './Employeemasterlist';
const AddEmployeemaster = () => {
	const [count,setcount]=useState(0)
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
	const [basicsalary, setBasicSalary]=useState('');
	const [allowedLeave, setAllowedLeave]=useState('');
	const [universalAcNo, setUniversalAcNo]=useState('');
	const [city, setCity]=useState('');
	const [country, setCountry]=useState('');
	const [tableRows, settableRows] = useState([])
	const [percentage, setPercentage]=useState('');
	// const [calculatePercentage, setCalculatePercentage]=useState('')
	const [secondInputValue, setSecondInputValue] = useState('');
	const [employeelist,setemployeelist]=useState(true)
	const [employeeTypeData, setEmployeeTypeData]=useState([]);
	const [employeeTypeId, setEmployeeTypeId]=useState('');
	const [isemployeeTypeDataFetch, setisEmployeeTypeDataFetch]=useState(false);
	const [postData, setPostData]=useState([]);
	const [postId, setPostId]=useState('');
	const [ispostDataFetched, setIspostDataFetched]=useState(false);
	const [issalarymasterDataFetched, setIsSalarymasterDataFetched]=useState(false);
	const [salarymasterData,setSalarymasterData]=useState([]);
	const [salarymasterId, setSalarymasterId]=useState('');
	const [formdata , setFormdata]=useState([])


	// Usage in useEffect
	useEffect(() => {
	  const fetchUniqueSixCharacterID = async () => {
		try {
		  const response = await getallemployeemastercount();
		  setcount( response.data.count+1);
		} catch (error) {
		  console.error("Error:", error);
		}
	  };
	
	  fetchUniqueSixCharacterID();
	}, []);
  

	
	  

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
	const handlesalarymasterchange = (event, index) => {
		const updatedTableRows = [...tableRows];
		updatedTableRows[index] = {
		  ...updatedTableRows[index],
		  salaryComponent: event.target.value // Update salaryComponent based on the event value
		  
		};
	  console.log(updatedTableRows,"ii");
		settableRows(updatedTableRows);
	  }



	const {
		
		register,
		handleSubmit,
		formState: { errors },
	  } = useForm({
		criteriaMode: 'all',
		
	  });
	  const onSubmit = async (data) => {
		data.employeeid=`ME${count.toString().padStart(3, '0')}`
	     data.EmployeeTypeId=employeeTypeId
		 data.PostId=postId
		 data.previousAllowedleave=allowedLeave
		//  data.tablerow=tableRows
		data.tablerow = (tableRows && Array.isArray(tableRows) && tableRows.length === 1 &&
  tableRows[0].value === '' &&
  tableRows[0].percentage === '' &&
  tableRows[0].price === '')
  ? []
  : (tableRows || []);
		
		 data.TotalSalary=totalAmount?totalAmount:basicsalary
		try {
			console.log('Afsal :' , data);
		  const response = await Addemployee(data);
		  console.log(response,"ii");
		  if (response.success) {
			setcount((prevCount) => prevCount + 1);
			setFormdata(response.data);
			toast.success(response.message);
			setstate(false)
			setemployeelist(true)
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
		try {
		  const totalAmount = tableRows.reduce((acc, row) => {
			const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
	  
			if (salaryType && (salaryType.type === 'Increment' || salaryType.type === 'Decrement')) {
			  const price = parseFloat(row.price);
	  
			  if (!isNaN(price)) {
				// Check if the parsed price is a valid number
				return acc + (salaryType.type === 'Increment' ? price : -price);
			  } else {
				console.error('Invalid price for row:', row);
			  }
			}
	  
			return acc;
		  }, parseFloat(basicsalary));
	  
		  if (!isNaN(totalAmount)) {
			// Check if the calculated totalAmount is a valid number
			setTotalAmount(totalAmount);
		  } else {
			console.error('Invalid totalAmount:', totalAmount);
		  }
		} catch (error) {
		  console.error('Error in useEffect:', error);
		}
	  }, [tableRows, basicsalary, salarymasterData]);
	  
	  


	  const handleChange = (index,percentage) => {
		const updatedTableRows = [...tableRows];
        updatedTableRows[index].percentage = Number(percentage);
       // Recalculate the price based on the updated percentage and basic salary
    const newPrice = (Number(basicsalary) * Number(percentage)) / 100;
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
const [state,setstate]=useState(false)
const [tablestate,settablestate]=useState(false)

	const handleclick=()=>{
		setstate(!state)
		setemployeelist(!employeelist)
		
	}
	const handletableclick=()=>{
		setstate(!state)
		setemployeelist(!employeelist)
	}
	const headerdata = useMemo(() => {
		return {
		  data:"Employee master",
		  page:"Add Employeemaster"
		};
	  }, []);
	  const handleBasicSalaryChange = (newBasicSalary) => {
		setBasicSalary(newBasicSalary);
		// Recalculate prices for all rows based on the new basicSalary
		const updatedTablerow = tableRows.map((row) => {
		  // Calculate the new price based on percentage and fallback to value if percentage is not available
		  const newPrice = Number(row.percentage || 0)
			? (Number(newBasicSalary) * Number(row.percentage)) / 100
			: Number(row.value || 0);
		  return { ...row, price: newPrice };
		});
	  
		settableRows(updatedTablerow);
	  };
  

  return (
   <>
   <PageHeader headerdata={headerdata}/>
   {!state ?<button className='btn btn-success submit-form mb-4 ' onClick={handleclick} >Add Employee</button>: <button className='btn btn-success submit-form mb-4' onClick={handletableclick} >View Table</button>}
  
   {state&& <>  
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
											<input className="form-control" type="text" placeholder="" value={`ME${count.toString().padStart(3, '0')}`} style={{ backgroundColor: "#cbd0d6" }} 
												readOnly />
											</div>
										</div>
									
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Name <span className="login-danger">*</span></label>
												<input
													{...register('name', { required: true, minLength: 4 })}
													type="text"
													className={`form-control ${errors.name ? 'is-invalid' : ''}`}
													placeholder=""
													value={name}
													onChange={(e) => setName(e.target.value)}
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
												<label >Employee Type<span className="login-danger">*</span></label>
												<select className="form-control select"
													
												onMouseEnter={handlemployeetypeclick}
												onChange={handleemployeetypechange}
												>
													<option>Select Type</option>
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
													<option>Select Post</option>
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
														{...register('employeeno', { required: true, minLength: 1 })}
														type="text"
														className={`form-control ${errors.employeeno ? 'is-invalid' : ''}`}
														placeholder=""
														value={employeeno}
														onChange={(e) => setEmployeeno(e.target.value)}
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
													<label>Address-1 <span className="login-danger">*</span></label>
													<input
													{...register('address1', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.address1 ? 'is-invalid' : ''}`}
													placeholder=""
													value={address1}
													onChange={(e) => setAddress1(e.target.value)}
													/>
													{errors.address1 && errors.address1.type === 'required' && (
													<span className="text-danger">Address-1 is required</span>
													)}
													{errors.address1 && errors.address1.type === 'minLength' && (
													<span className="text-danger">Address-1 must be at least 2 characters</span>
													)}
												</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-2 <span className="login-danger">*</span></label>
												<input
													{...register('address2')}
													type="text"
													className={`form-control ${errors.address2 ? 'is-invalid' : ''}`}
													placeholder=""
													value={address2}
													onChange={(e) => setAddress2(e.target.value)}
												/>
											</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Address-3 <span className="login-danger">*</span></label>
												<input
													{...register('address3')}
													type='text'
													className={`form-control ${errors.address3 ? 'is-nvalid' : ''}`}
													placeholder=''
													value={address3}
													onChange={(e)=> setAddress3(e.target.value)}
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
												<label >Email <span className="login-danger">*</span></label>
												<input
												{...register('email', {
													required: 'Email is required',
													pattern: {
													  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													  message: 'Invalid email address',
													},
												  })}
													type="text"
													className={`form-control ${errors.employeeno ? 'is-invalid' : ''}`}
													placeholder=""
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
												 {errors.email && (
														<span className="text-danger">{errors.email.message}</span>
													)}
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Phone <span className="login-danger">*</span></label>
												<input
													{...register('phone', {
														required: true,
														pattern: /^[0-9]{0,10}$/,
													})}
													className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
													type="text" // Using type="text" for numeric input with max length
													placeholder=""
													value={phone}
													onChange={(e) => {
														const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
														if (onlyNumbers.length <= 10) {
														setPhone(onlyNumbers);
														}
													}}
													/>
												{errors.phone && (
													<span className="text-danger">{errors.phone.message}</span>
												)}
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Bank <span className="login-danger">*</span></label>
													<input
													{...register('bank', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.bank ? 'is-invalid' : ''}`}
													placeholder=""
													value={bank}
													onChange={(e) => setBank(e.target.value)}
													/>
													{errors.bank && errors.bank.type === 'required' && (
													<span className="text-danger">Bank name is required</span>
													)}
													{errors.bank && errors.bank.type === 'minLength' && (
													<span className="text-danger">Bank name must be at least 2 characters</span>
													)}
												</div>
										</div>

                                       <div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Account No<span className="login-danger">*</span></label>
													<input
													{...register('accountNo', { required: true, minLength: 5 })}
													type="number"
													className={`form-control ${errors.accountNo ? 'is-invalid' : ''}`}
													placeholder=""
													value={accountno}
													onChange={(e) => setAccountno(e.target.value)}
													/>
													{errors.accountNo && errors.accountNo.type === 'required' && (
													<span className="text-danger">Account number is required</span>
													)}
													{errors.accountNo && errors.accountNo.type === 'minLength' && (
													<span className="text-danger">Account number must be at least 5 characters</span>
													)}
												</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Branch<span className="login-danger">*</span></label>
													<input
													{...register('branch', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
													placeholder=""
													value={branch}
													onChange={(e) => setBranch(e.target.value)}
													/>
													{errors.branch && errors.branch.type === 'required' && (
													<span className="text-danger">Branch name is required</span>
													)}
													{errors.branch && errors.branch.type === 'minLength' && (
													<span className="text-danger">Branch name must be at least 2 characters</span>
													)}
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>IFSC<span className="login-danger">*</span></label>
													<input
													{...register('ifsc', { required: true, minLength: 5 })}
													type="text"
													className={`form-control ${errors.ifsc ? 'is-invalid' : ''}`}
													placeholder=""
													value={ifsc}
													onChange={(e) => setIfsc(e.target.value)}
													/>
													{errors.ifsc && errors.ifsc.type === 'required' && (
													<span className="text-danger">IFSC code is required</span>
													)}
													{errors.ifsc && errors.ifsc.type === 'minLength' && (
													<span className="text-danger">IFSC code must be at least 5 characters</span>
													)}
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>PAN No<span className="login-danger">*</span></label>
													<input
													{...register('panNo', { required: true })}
													type="text"
													className={`form-control ${errors.panNo ? 'is-invalid' : ''}`}
													placeholder=""
													value={panNo}
													onChange={(e) => setPanNo(e.target.value)}
													/>
													{errors.panNo && errors.panNo.type === 'required' && (
													<span className="text-danger">PAN No is required</span>
													)}
													
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label>Pan Name<span className="login-danger">*</span></label>
												<input
												{...register('panName', { required: true, minLength: 2 })}
												type="text"
												className={`form-control ${errors.panName ? 'is-invalid' : ''}`}
												placeholder=""
												value={panName}
												onChange={(e) => setPanName(e.target.value)}
												/>
												{errors.panName && errors.panName.type === 'required' && (
												<span className="text-danger">Pan Name is required</span>
												)}
												{errors.panName && errors.panName.type === 'minLength' && (
												<span className="text-danger">Pan Name must be at least 2 characters</span>
												)}
											</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Date Of Joining<span className="login-danger">*</span></label>
													<input
													{...register('dateOfJoining', { required: true })}
													type='date'
													className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
													placeholder=""
													value={dateOfJoining}
													onChange={(e) => setDateOfJoining(e.target.value)}
													/>
													{errors.dateOfJoining && errors.dateOfJoining.type === 'required' && (
													<span className="text-danger">Date Of Joining is required</span>
													)}
												</div>
										</div>

                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label>Date Of Birth<span className="login-danger">*</span></label>
												<input
												{...register('dateOfBirth', { required: true })}
												type="date"
												className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
												placeholder=""
												value={dateOfBirth}
												onChange={(e) => setDateOfBirth(e.target.value)}
												/>
												{errors.dateOfBirth && errors.dateOfBirth.type === 'required' && (
												<span className="text-danger">Date Of Birth is required</span>
												)}
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Guardian Name<span className="login-danger">*</span></label>
													<input
													{...register('guardianName', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.guardianName ? 'is-invalid' : ''}`}
													placeholder=""
													value={guardianname}
													onChange={(e) => setGuardianName(e.target.value)}
													/>
													{errors.guardianName && errors.guardianName.type === 'required' && (
													<span className="text-danger">Guardian Name is required</span>
													)}
													{errors.guardianName && errors.guardianName.type === 'minLength' && (
													<span className="text-danger">Guardian Name must be at least 2 characters</span>
													)}
												</div>
										</div>



										
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Basic Salary<span className="login-danger">*</span></label>
													<input
													{...register('basicSalary', { required: true, min: 0 })}
													type="number"
													className={`form-control ${errors.basicSalary ? 'is-invalid' : ''}`}
													placeholder=""
													value={basicsalary}
													onChange={(e) => handleBasicSalaryChange(e.target.value)}
													/>
													{errors.basicSalary && errors.basicSalary.type === 'required' && (
													<span className="text-danger">Basic Salary is required</span>
													)}
													{errors.basicSalary && errors.basicSalary.type === 'min' && (
													<span className="text-danger">Basic Salary must be a positive number</span>
													)}
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Allowed Leave<span className="login-danger">*</span></label>
													<input
													{...register('allowedleave', { required: true, min: 0 })}
													type="number"
													className={`form-control ${errors.basicSalary ? 'is-invalid' : ''}`}
													placeholder=""
													value={allowedLeave}
													onChange={(e) => setAllowedLeave(e.target.value)}
													/>
													{errors.basicSalary && errors.basicSalary.type === 'required' && (
													<span className="text-danger">Allowed Leave is required</span>
													)}
													{errors.basicSalary && errors.basicSalary.type === 'min' && (
													<span className="text-danger">Allowed Leave must be a positive number</span>
													)}
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-4">
												<div className="form-group local-forms">
													<label>Universal Account Number<span className="login-danger">*</span></label>
													<input
													{...register('universalAcNo', { required: true, minLength: 6 })}
													type="text"
													className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
													placeholder=""
													value={universalAcNo}
													onChange={(e) => setUniversalAcNo(e.target.value)}
													/>
													{errors.accountNumber && errors.accountNumber.type === 'required' && (
													<span className="text-danger">Account Number is required</span>
													)}
													{errors.accountNumber && errors.accountNumber.type === 'minLength' && (
													<span className="text-danger">Account Number should be at least 6 characters</span>
													)}
												</div>
										</div>

										
										<div className="col-12 col-md-6 col-xl-4">
												<div className="form-group local-forms">
													<label>City <span className="login-danger">*</span></label>
													<input
													{...register('city', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.city ? 'is-invalid' : ''}`}
													placeholder=""
													value={city}
													onChange={(e) => setCity(e.target.value)}
													/>
													{errors.city && errors.city.type === 'required' && (
													<span className="text-danger">City is required</span>
													)}
													{errors.city && errors.city.type === 'minLength' && (
													<span className="text-danger">City should be at least 2 characters</span>
													)}
												</div>
										</div>

										<div className="col-12 col-md-6 col-xl-4">
												<div className="form-group local-forms">
													<label>Country <span className="login-danger">*</span></label>
													<input
													{...register('country', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.country ? 'is-invalid' : ''}`}
													placeholder=""
													value={country}
													onChange={(e) => setCountry(e.target.value)}
													/>
													{errors.country && errors.country.type === 'required' && (
													<span className="text-danger">Country is required</span>
													)}
													{errors.country && errors.country.type === 'minLength' && (
													<span className="text-danger">Country should be at least 2 characters</span>
													)}
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
															{tableRows.map((row, index) => (
															<tr key={row.id}>
																<td>
																<input type="text" className="form-control" value={index + 1} readOnly />
																</td>
																<td>
																<select className="form-control"
																onMouseEnter={handlesalarymasterclick}
																onChange={(event) => handlesalarymasterchange(event, index)}
																>
																	<option>Select</option>
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
																		value={row.percentage ? row.percentage : ''}
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
															<td><input className="form-control" type="number" value={totalAmount} readOnly/>
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
				</div></>}

				{employeelist&&<Employeemasterlist   formdata={formdata} setformdata={setFormdata} />}
   </>
  )
}

export default AddEmployeemaster