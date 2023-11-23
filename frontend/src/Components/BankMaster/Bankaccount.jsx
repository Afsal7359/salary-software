import React ,{useState,useEffect, useMemo}from 'react'
import PageHeader from '../PageHeader'
import { getallOperationalType } from '../../Apicalls/Operational';
import { getallbank } from '../../Apicalls/Bank';
import { getallUnite } from '../../Apicalls/Unit';
import { getallAccountType } from '../../Apicalls/Accounttype';
import { getallDepartment } from '../../Apicalls/Department';
import { AddbankAccount, getallbankAccountcount } from '../../Apicalls/BankAccount';
import { toast } from 'react-toastify';
import BankAccountlist from './BankAccountlist';

const MemoizedBankAccountlist = React.memo(BankAccountlist);

function Bankaccount() {
	const [count,setcount]=useState(0)


  // Usage in useEffect
  useEffect(() => {
    const fetchUniqueSixCharacterID = async () => {
      try {
        const response = await getallbankAccountcount();
        setcount( response.data.count+1);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUniqueSixCharacterID();
  }, []);
	  

	const [isOperationalDataFetched, setIsOperationalDataFetched] = useState(false);
	const [OperationalData, setOperationalData] = useState([]);
	const [OperationalId, setOperationalId] = useState('');

	const handleOperationalTypeClick = async () => {
		console.log('ooooooooooopreational');
		try {
		  if (!isOperationalDataFetched) {
			const response = await getallOperationalType();
			if (response.success) {
			  setOperationalData(response.data);
			} else {
			  setOperationalData([]);
			}
			setIsOperationalDataFetched(true);
		  }
		} catch (error) {
		  toast.error(error.message);
		}
	  };

	 const handleOperationalTypeChange = (event)=>{
		setOperationalId(event.target.value);
	 }
	
	 const [isBankDataFetched, setIsBankDataFetched] = useState(false);
	const [BankData, setBankData] = useState([]);
	const [BankId, setBankId] = useState('');

	const handleBankClick = async () => {
		console.log('bbbbbbbbbbbbbbank');
		try {
		  if (!isBankDataFetched) {
			const response = await getallbank();
			if (response.success) {
			  setBankData(response.data);
			} else {
			  setBankData([]);
			}
			setIsBankDataFetched(true);
		  }
		} catch (error) {
		  toast.error(error.message);
		}
	  };

	 const handleBankChange = (event)=>{
		setBankId(event.target.value);
	 }

	 const [isUnitDataFetched, setIsUnitDataFetched] = useState(false);
	 const [unitData, setUnitData] = useState([]);
	 const [unitId, setUnitId] = useState('');

	 const handleUnitClick = async () => {
		console.log('uuuuuuuuuuuuunit');
		try {
		  if (!isUnitDataFetched) {
			const response = await getallUnite();
			if (response.success) {
			  setUnitData(response.data);
			} else {
			  setUnitData([]);
			}
			setIsUnitDataFetched(true);
		  }
		} catch (error) {
		  toast.error(error.message);
		}
	  };
	
	  const handleUnitChange = (event) => {
		setUnitId(event.target.value);
	  };

	  const [isaccountTypeDataFetched, setIsAccountTypeDataFetched] = useState(false);
	  const [accountTypeData, setAccountTypeData] = useState([]);
	  const [accountTypeId, setAccountTypeId] = useState('');
 
	  const handleAccountTypeClick = async () => {
		console.log('aaaaaaaaaacountttttttttypoe');
		 try {
		   if (!isaccountTypeDataFetched) {
			 const response = await getallAccountType();
			 if (response.success) {
				setAccountTypeData(response.data);
			 } else {
				setAccountTypeData([]);
			 }
			 setIsAccountTypeDataFetched(true);
		   }
		 } catch (error) {
		   toast.error(error.message);
		 }
	   };
	 
	   const handleAccountTypeChange = (event) => {
		 setAccountTypeId(event.target.value);
	   };


	   const [departmentData, setDepartmentData] = useState([]);
	   const [departmentId, setDepartmentId] = useState('');
	   const [isDepartmentDataFetched, setIsDepartmentDataFetched] = useState(false);

	   const handleDepartmentClick = async () => {
		console.log('dddddddddddepartment');
		try {
		  if (!isDepartmentDataFetched) {
			const response = await getallDepartment();
			if (response.success) {
			  setDepartmentData(response.data);
			} else {
			  setDepartmentData([]);
			}
			setIsDepartmentDataFetched(true);
		  }
		} catch (error) {
		  toast.error(error.message);
		}
	  };
	  const handleDepartmentChange = (event) => {
		setDepartmentId(event.target.value);
	  };


	  const [accountNo,setAccountNo]=useState('')
	  const [formData,setFormData]=useState('');

	  const formdatas = useMemo(() => {
		return {
		  accountNo,
		  BankId,
		  OperationalId,
		  unitId,
		  accountTypeId,
		  departmentId,
		  bankAccountId:`MB${count.toString().padStart(3, '0')}`,
		};
	  }, [accountNo, BankId, OperationalId, unitId, accountTypeId, departmentId,count]);
	
	  // Your existing logic for form submission
	  const handleSubmit = async (event) => {
		event.preventDefault();
		try {
		  // Example usage:
		  console.log('formdatass:', formdatas);
		  const response = await AddbankAccount(formdatas);
		  console.log(response, 'tereresponse');
		  if (response.success) {
			setcount((prevCount) => prevCount + 1);
			setFormData(response.data);
			setUnitId('');
			setDepartmentId('');
			setAccountNo('');
	
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
                               <form  onSubmit={handleSubmit}>
                                   <div className="row">
                                       <div className="col-12">
                                           <div className="form-heading">
                                               <h4>BankAccount Details</h4>
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">  
                                           <div className="form-group local-forms">
                                               <label >Bank Id <span className="login-danger">*</span></label>
                                               <input className="form-control" type="text" value={`MB${count.toString().padStart(3, '0')}`} placeholder="" style={{ backgroundColor: "#cbd0d6" }}  readOnly/>
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
                                           <div className="form-group local-forms">
                                               <label >Account No <span className="login-danger">*</span></label>
                                               <input className="form-control" type="number" placeholder="" 
											    onChange={(e)=>setAccountNo(e.target.value)} />
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
											<div className="form-group local-forms">
												<label >Bank  <span className="login-danger">*</span></label>
												<select className="form-control select"   
												onKeyDown={handleBankClick} 
												onMouseEnter={handleBankClick}
												onChange={handleBankChange}>
												<option value="">Select Bank</option>
											    {BankData.map((option)=>(
													<option  key={option._id} value={option._id}>
														{option.name}
													</option>
												))}
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Operational Type  <span className="login-danger">*</span></label>
												<select className="form-control select"
												onKeyDown={handleOperationalTypeClick}
												onMouseEnter={handleOperationalTypeClick}
												onChange={handleOperationalTypeChange}>
													<option value="">Select Operational Type</option>
													{OperationalData.map((option) => (
													<option key={option._id} value={option._id}>
														{option.name}
													</option>
													))}
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Unit<span className="login-danger">*</span></label>
												<select className="form-control select"
												onKeyDown={handleUnitClick}
												onMouseEnter={handleUnitClick}
												onChange={handleUnitChange}>
													<option>Select Unit</option>
													{unitData.map((option)=>(
														<option value={option._id} key={option._id}>
															{option.name}
														</option>
													))}
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Account Type<span className="login-danger">*</span></label>
												<select className="form-control  "
												onKeyDown={handleAccountTypeClick}
												onMouseEnter={handleAccountTypeClick}
												onChange={handleAccountTypeChange}>

													<option>Select Account Type</option>
													{accountTypeData.map((option)=>(
														<option value={option._id} key={option._id}>
															{option.name}
														</option>
													))}
												  </select>
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-3">
											<div className="form-group local-forms">
												<label >Department<span className="login-danger">*</span></label>
												<select className="form-control select"
												onKeyDown={handleDepartmentClick}
												onMouseEnter={handleDepartmentClick}
												onChange={handleDepartmentChange}>
													<option>Select Department</option>
													{departmentData.map((option)=>(
														<option value={option._id} key={option._id}>
															{option.name}
														</option>
													))}
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
			   <MemoizedBankAccountlist  formdata={formData} setformdata={setFormData} />
  </>
  )
}

export default Bankaccount