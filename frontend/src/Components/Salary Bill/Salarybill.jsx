import React,{ useMemo,useEffect, useState} from 'react'
import PageHeader from '../PageHeader'
import { toast } from 'react-toastify';
import { editemployeemaster, getallemployeemaster } from '../../Apicalls/EmployeeMater';
import { getallSalary } from '../../Apicalls/salarymaster';
import { AddSalaryBill, GetSalaryBillCount } from '../../Apicalls/salaryBill';
import list_salary_bill from './List_salary_bill';
import { useForm } from 'react-hook-form';

import Select from 'react-select';

const MemoizedSalaryBill = React.memo(list_salary_bill);
function Salarybill() {
	

	const [unit,setUnit]=useState('');
	const [department,setDepartment]=useState('');
	const [EmployeeData, setEmployeeData] = useState([]);
	const [EmployeeId, setEmployeeId] = useState('');
	const [isEmployeeDataFetched, setIsEmployeeDataFetched] = useState(false);
	const [absentvalue,setAbsentValue]=useState('')
	const [allowedleave,setAllowedLeave]=useState(0)
	const [tablerow, setTablerow] = useState([]);
	const [tablerows, setTablerows] = useState([]);
	const [basicSalary,setBasicSalary]=useState('')
	const [filterEmployeeData,setFilterEmployeeData]=useState([]);
	const [TotalSalary, setTotalSalary] = useState('');
	const [totalAmount, setTotalAmount] = useState('');
	const [totalrowprice,setTotalRowPrice]=useState([]);
	const [employeeid,setEmployeeid]=useState('');
	const [formdata,setformData]=useState([]);
	
	const [EPFWage,setEPFWage]=useState('');
	const [EPSWage,setEPSWage]=useState('');
	const [EPSContri,setEPSContri]=useState('');
	const[EPFContri,setEPFContri]=useState('');
	const[EPSEPFDiff,setEPSEPFDiff]=useState('');
	const [EDLIWage, setEDLIWage]=useState('');

	const[count,setcount]=useState('');
	const[salarybill,setSalarybill]=useState(false);
	const [salaryList,setSalaryList]=useState(true)


	const [DAPercentage,setDAPercentage]=useState('');
	const [DAValue,setDAValue]=useState('');
	const [DAPrice,setDAPrice]=useState('');
	const [IRPercentage,setIRPercentage]=useState('');
	const [IRValue,setIRValue]=useState('');
	const [IRPrice,setIRPrice]=useState('');
	const [dateOfJoining,setDateOfJoining]=useState(''); 
	const [employeeTypeId,setEmployeeTypeId]=useState('');
	const [tabledisplay,setTableDisplay]=useState(false);

	const {
		
		register,
		handleSubmit,
		formState: { errors },
		reset,
	  } = useForm({
		criteriaMode: 'all',
	
	  });


	  useEffect(() => {
		const fetchUniqueSixCharacterID = async () => {
		  try {
			const response = await GetSalaryBillCount();
			setcount( response.data.count+1);
		  } catch (error) {
			console.error("Error:", error);
		  }
		};
	  
		fetchUniqueSixCharacterID();
	  }, []);
	

	const handleEmployeeclick = async () => {
	
	 try {
	   if (!isEmployeeDataFetched) {
		 const response = await getallemployeemaster ();
		 if (response.success) {
		   setEmployeeData(response.data);
		 } else {
		   setEmployeeData([]);
		 }
		 setIsEmployeeDataFetched(true);
	   }
	 } catch (error) {
	   toast.error(error.message);
	 }
   };
   useEffect(()=>{
	handleEmployeeclick()
  },[])

  

   const [selectedOption, setSelectedOption] = useState(null);
   const [options, setOptions] = useState(EmployeeData.map((data) => ({ value: data.name, label: data.name })));
  
	const  handleInputChange = (newValue) => {
	
	  const filteredOptions = EmployeeData.filter((data) =>
		data.name.toLowerCase().includes(newValue.toLowerCase())
	  ).map((data) => ({ value: data.name, label: data.name }));
	  setOptions(filteredOptions);
	};



   const handleSelectChange = (selected) => {

	const select = selected.value

	
    if (select) {
		
        const filteredEmployees = EmployeeData.filter(data => data.name === select);
       console.log(filteredEmployees,":FilterEmployeeees");
	
		setEmployeeTypeId(filteredEmployees[0]?filteredEmployees[0].EmployeeTypeId._id:"");
		setEmployeeid(filteredEmployees[0]?filteredEmployees[0]._id :"")
		setDepartment(filteredEmployees[0]?filteredEmployees[0].PostId.department._id : '')
		setUnit(filteredEmployees[0]?filteredEmployees[0].PostId.unit._id : ""	)
		setBasicSalary(filteredEmployees[0]?filteredEmployees[0].basicSalary :"")
		setTotalSalary(filteredEmployees[0]?filteredEmployees[0].TotalSalary:"")
// Check if tablerow exists and has elements before accessing properties
if (
	filteredEmployees[0].tablerow &&
	filteredEmployees[0].tablerow.length > 0 &&
	filteredEmployees[0].tablerow[0]
  ) {
	setDAPrice(
	  filteredEmployees[0].tablerow[0].price
		? filteredEmployees[0].tablerow[0].price
		: ""
	);
	setDAValue(
	  filteredEmployees[0].tablerow[0].value
		? filteredEmployees[0].tablerow[0].value
		: ""
	);
	setDAPercentage(
	  filteredEmployees[0].tablerow[0].percentage
		? filteredEmployees[0].tablerow[0].percentage
		: ""
	);
  }
  
  if (
	filteredEmployees[0].tablerow &&
	filteredEmployees[0].tablerow.length > 1 &&
	filteredEmployees[0].tablerow[1]
  ) {
	setIRPrice(
	  filteredEmployees[0].tablerow[1].price
		? filteredEmployees[0].tablerow[1].price
		: ""
	);
	setIRValue(
	  filteredEmployees[0].tablerow[1].value
		? filteredEmployees[0].tablerow[1].value
		: ""
	);
	setIRPercentage(
	  filteredEmployees[0].tablerow[1].percentage
		? filteredEmployees[0].tablerow[1].percentage
		: ""
	);
  }
  
		setDateOfJoining(filteredEmployees[0].dateOfJoining?filteredEmployees[0].dateOfJoining:"");
        setFilterEmployeeData(filteredEmployees);
		const tablerowData = filteredEmployees[0]?.tablerow;
		if (Array.isArray(tablerowData)) {
		setTablerow(tablerowData.slice(2));
		} else {
		setTablerow([]);
		}
		  console.log('tablerow',tablerow);
    }
};	const [itemdata,setitemdata]=useState(filterEmployeeData[0])

 


console.log('filtered data :',filterEmployeeData);
const headerdata = useMemo(() => {
	return {
	  data:"Salary master",
	  page:"salary bill"
	};
  }, []);



  const handleAddRow = () => {
    setTablerow((prevRows) => [
      ...prevRows,
      {
        id: Date.now(),
        salaryComponent: "",
        percentage: "",
        value: "",
        price: "",
      },
    ]);
  };
  const handleRemoveRow = (id) => {
    setTablerow((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const [month, setmonth] = useState('')
  

  const [issalarymasterDataFetched, setIsSalarymasterDataFetched] =useState(false);
  const [salarymasterData, setSalarymasterData] = useState([]);
  const [salarymasterId, setSalarymasterId] = useState("");

  const data = tablerow.slice(2)
  
 
  const handlesalarymasterclick = async () => {
    try {
      if (!issalarymasterDataFetched) {
        const response = await getallSalary();
        if (response.success) {
          setSalarymasterData(response.data);
        } else {
          setSalarymasterData([]);
        }
      }
      setIsSalarymasterDataFetched(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(()=>{
	handlesalarymasterclick()
  },[])




const handlesalarymasterchange = (event, index) => {
	const updatedTableRows = [...tablerow];
	updatedTableRows[index] = {
	  ...updatedTableRows[index],
	  salaryComponent: event.target.value,
	};
	setTablerow(updatedTableRows);
  };
  
  const [salarycomponent, setSalaryComponent] = useState([]);

   
	const [absentDays, setAbsentDays] = useState(0);
	const [perDaySalary, setPerDaySalary] = useState('');
	const [salaryTotal, setSalaryTotal] = useState('');
    const [leaveDifference,setLeaveDifference]=useState('');
 	const [totalincrement,setTotalIncrement]=useState(0);

	const [totaldeduction,setTotalDeduction]=useState(0)
	const [totalcontribution,setTotalContributions]=useState(0)
	useEffect(() => {
		try {
		  let 	totalAmount = basicSalary;
		  let totalDeduction = 0;
		  let totalIncrement = 0;
		  let totalcontribution =0;
	  

		  // Your existing logic for calculating totalAmount
	  
		  tablerow.forEach((row) => {
			const salaryType = salarymasterData.find(
			  (item) =>
				item._id === row.salaryComponent?._id || item._id === row.salaryComponent
			);
	  
			if (salaryType) {
			  if (salaryType.type === 'Increment') {
				totalIncrement += parseFloat(row.price) || 0;
			  } else if (salaryType.type === 'Decrement') {
				totalDeduction += parseFloat(row.price) || 0;
			  } else if (salaryType.type === 'nill') {
				setTotalContributions(totalcontribution += parseFloat(row.price) || 0)
			  }
			}
		  });
	  
		  // Calculate the total after deducting deductions and adding increments
		  totalAmount = totalAmount - totalDeduction + totalIncrement + parseFloat(DAPrice) + parseFloat(IRPrice);
	  
		  const calculatedPerDaySalary = basicSalary / 30;
		  setPerDaySalary(calculatedPerDaySalary);
	  
		  if (absentDays > allowedleave) {
			const leaveDifferences = absentDays - allowedleave;
			const calculatedTotal = totalAmount - leaveDifferences * perDaySalary;
			setSalaryTotal(calculatedTotal.toFixed(2));
		  } else {
			setSalaryTotal(totalAmount.toFixed(2));
		  }
	  
		  const balanceleave = allowedleave - absentDays;
		  setLeaveDifference(balanceleave < 0 ? 0 : balanceleave);
		  setTotalDeduction(totalDeduction.toFixed(2));
		//   const TotalIncrements=(basicSalary)+parseFloat(totalIncrement);
		  setTotalIncrement(parseFloat(basicSalary) + parseFloat(totalIncrement));
		  setTotalAmount(totalAmount.toFixed(2)); 
		} catch (error) {
		  console.error('Error in useEffect:', error);
		}
	  }, [tablerow, basicSalary, salarymasterData, allowedleave, absentDays, perDaySalary,IRPrice,DAPrice]);
	  
	  


  const handleSecondInputChange = (index, value) => {
    const updatedTableRows = [...tablerow];
    updatedTableRows[index].percentage = "";
    updatedTableRows[index].value = value.trim() !== "" ? Number(value) : "";
    const newPrice = value.trim() !== "" ? value : "";
    updatedTableRows[index].price = newPrice;
    setTablerow(updatedTableRows);
  };

  const   handleChange = (index, percentage) => {
    const updatedTableRows = [...tablerow];
    updatedTableRows[index].percentage = Number(percentage);

    // Reset second field's value when first field is updated
    updatedTableRows[index].value = "";

    // Recalculate the price based on the updated percentage and basic salary
    const newPrice = basicSalary
      ? (basicSalary * Number(percentage)) / 100
      : "";
    updatedTableRows[index].price = newPrice || "";

    setTablerow(updatedTableRows);
  };




  const handleDAPercentage = (event)=>{
	 const value= event.target.value;
	 setDAPercentage(value)
	 setDAValue('')
   }
   const handleDAValue = (event)=>{
	 const value= event.target.value;
	 setDAValue(value)
	 setDAPercentage('')
   }
   const handleIRPercentage = (event)=>{
	 const value= event.target.value;
	 setIRPercentage(value)
	 setIRValue('')
   }
   const handleIRValue = (event)=>{
	 const value= event.target.value;
	 setIRValue(value)
	 setIRPercentage('')
   }

   useEffect(() => {

	// DA row
	
	if (DAPercentage !== 0 && !DAValue) {
	  const price = (basicSalary * DAPercentage) / 100;
	  setDAPrice(price);
	}
  
	else if (DAValue !== 0 && !DAPercentage) {
	  const prices = DAValue;
	  setDAPrice(prices);
	}

	// IR row
	
	if (IRPercentage !== 0 && !IRValue) {
	  const price = (basicSalary * IRPercentage) / 100;
	  setIRPrice(price);
	}
  
	else if (IRValue !== 0 && !IRPercentage) {
	  const prices = IRValue;
	  setIRPrice(prices);
	}

   
  }, [DAPercentage, DAValue, basicSalary,IRPercentage,IRValue]);


  




const firstrow =[
	{
		id:1,
		salaryComponent:"6581128dc32bc7fefb3b2e30",
		percentage:DAPercentage?DAPercentage:"",
		value:DAValue?DAValue:"",
		price:DAPrice
	},
	{
		id:2,
		salaryComponent:"658112c9c32bc7fefb3b2e3b",
		percentage:IRPercentage?IRPercentage:"",
		value:IRValue?IRValue:"",
		price:IRPrice
	}
  ]
  const[updatedRow,setUpdatedRow]=useState('');

  useEffect(()=>{
	let updatedFirstRow = [...firstrow];

	if (tablerow && tablerow.length > 0 && tablerow[0].price === '') {
	  updatedFirstRow = [...updatedFirstRow];
	  setUpdatedRow(updatedFirstRow)
	}else if( tablerow && tablerow.length > 0 && tablerow[0].price > 0){
	  updatedFirstRow=[...updatedFirstRow, ...tablerow]
	  setUpdatedRow(updatedFirstRow)
	}

  },[tablerow,DAPrice,IRPrice]) 

console.log(updatedRow,"::tableroqw");


useEffect(() => {

	if(employeeTypeId === "6566be7b0085f19cfbfd00c1"){
		setTableDisplay(true)
	}else{
		setTableDisplay(false)
	}

	if(employeeTypeId === "6566be7b0085f19cfbfd00c1" && basicSalary ){
		const EPF = parseFloat(basicSalary) + parseFloat(DAPrice) + parseFloat(IRPrice)
		setEPFWage(EPF)
	}else{
		setEPFWage('')
	};



const joiningDate = new Date(dateOfJoining);
const comparisonDate = new Date('2014-01-01');

	if (employeeTypeId === "6566be7b0085f19cfbfd00c1" && (joiningDate >= comparisonDate)) {
	  setEPSWage(0);
	} else if (employeeTypeId === "6566be7b0085f19cfbfd00c1" && (totalAmount >= 15000)) {
	  setEPSWage(15000);
	} else if(employeeTypeId === "6566be7b0085f19cfbfd00c1" && (totalAmount < 15000)) {
	  setEPSWage(totalAmount);
	}else{
		setEPSWage('')
	};


	if(employeeTypeId === "6566be7b0085f19cfbfd00c1" &&(totalAmount >= 15000)){
		setEDLIWage(15000)
	}else if(employeeTypeId === "6566be7b0085f19cfbfd00c1" &&(totalAmount < 15000)){
		setEDLIWage(totalAmount)
	}else{
		setEDLIWage('')
	}

	
if(EPSWage === 15000){
setEPSContri(1250)
}else if(EPSWage === 0){
setEPSContri(0)
}else{
 const EPS = (EPFWage * 8.33)/100
 setEPSContri(EPS)
}

const targetId = '658112ecc32bc7fefb3b2e3f';
let foundData = null;

for (let i = 0; i < tablerow.length; i++) {
if (tablerow[i].salaryComponent._id ?tablerow[i].salaryComponent._id :tablerow[i].salaryComponent === targetId) {
foundData = tablerow[i];
break;
}
}
const EPFcontribution = (EPFWage * 12) / 100;
console.log(EPFcontribution,"::EPFSSS");
if (!foundData) {
setEPFContri(EPFcontribution)
console.log('ffffffffffffffffffuuuuuuuuuuu');
} else {
console.log('ddddddddddddddddddddddddd');
const EPFS =( EPFcontribution + foundData.price)
setEPFContri(EPFS)
}

const EPFSS = (EPFWage * 12) / 100;

if( EPFContri){
const EPFEPSDIFF = EPFSS -EPSContri
setEPSEPFDiff(EPFEPSDIFF)
}


	console.log(EPSContri,";;;;;;;EPSContri;;;;;;;");
	console.log(EPFContri,"....................EPFContri.............................");
	console.log(EPSEPFDiff,":EPSEPFDiff::::::");
	console.log(EPFWage,":EPF WAGE");
	console.log(EPSWage,":Eps WAGE");
	console.log(dateOfJoining);
	console.log(EDLIWage,":EDLI WAGE");
	console.log(EDLIWage,"EdliWage");

  }, [totalAmount, dateOfJoining,EPSWage,EPFWage,EDLIWage,filterEmployeeData,employeeTypeId,,employeeid,options,tablerow,DAPrice,IRPrice,updatedRow]);
  



const handleformsubmit = async(event)=>{
	// event.preventDefault();
	console.log(tablerow,":tablerow:");
	reset
		try {
			// const LeaveBalance = {
			// 	_id: filterEmployeeData[0]._id,
			// 	allowedleave: Number(leaveDifference)
			// };
			// console.log('formdaaats:', LeaveBalance);
			// const responses = await editemployeemaster(LeaveBalance);
			// if (responses.success){
			// 	console.log("sucessfully updated");
			// }
			const formdata = {
			SalaryBillNo:`ME${count.toString().padStart(3, '0')}`, 
			date:date,	
			employeeid:employeeid,
			departmentid : department,
			unitid : unit,
			basicSalary:basicSalary,
			totaldeduction:totaldeduction,
			totalcontribution:totalcontribution?totalcontribution:"",
			totalincrement:totalincrement,
			employeeTypeId:employeeTypeId,
			EPFWage,
			EPSWage,
			EDLIWage,
			EPFContri,
			EPSContri,
			EPSEPFDiff,
			tablerow:updatedRow||[],
			allowedleave:allowedleave,
			absentDays : absentDays,
			totalAmount: salaryTotal?.TotalSalary?salaryTotal.TotalSalary :salaryTotal
			}
			console.log(formdata,"foooooooooooooooorm datasssssssssssssssssssssss");
			setcount((prevCount) => prevCount + 1);
			setFilterEmployeeData([])
			setTablerow([])
			setSalaryTotal([])
			setAbsentDays(0)
			setAllowedLeave('')
			setEmployeeId([])
			setBasicSalary([])
			setSalaryTotal([])
			setUpdatedRow([])
			setDAPercentage('')
			setDAPrice('');
			setIRPercentage('');
			setIRPrice('');
			setDAValue('');
			setIRValue('');
			setTotalContributions([])
			const response = await AddSalaryBill(formdata);

			 if (response.success){
			setformData(response.data);
			toast.success(response.message);
			setSalarybill(false);
			setSalaryList(true)
			reset
			}
			else {
				toast.error(response.message);
			  }
			
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}

	}
const handleAddClick =()=>{
	setSalarybill(true);
	setSalaryList(false)
}
const handleTableClick =()=>{
	setSalarybill(false);
	setSalaryList(true)
}

console.log("absent",absentvalue);


const [date, setDate] = useState(() => {
	const today = new Date();
	const year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
  
	// Pad the month and day with leading zeros if needed
	month = month < 10 ? `0${month}` : month;
	day = day < 10 ? `0${day}` : day;
  
	// Format the date as 'YYYY-MM-DD' (required by input type='date')
	return `${year}-${month}-${day}`;
  });

console.log('ssssss',basicSalary);
	
return (
    <>
      <PageHeader headerdata={headerdata}/>

							{salarybill&& <div>	<button className='btn btn-success' onClick={handleTableClick}> Table </button>
							<form onSubmit={handleSubmit(handleformsubmit)}>
							<div class="container mt-5">
								<div class="row">
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Salary No <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" value={`MSB${count.toString().padStart(3, '0')}`}  style={{backgroundColor:"#cbd0d6"}} readOnly/>
										</div>
									</div>
									
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Date <span className="login-danger">*</span></label>
											   <input
													{...register('date', { required: true })}
													type='date'
													className={`form-control ${errors.date ? 'is-invalid' : ''}`}
													placeholder=""
													value={date}
													onChange={(e) => setDate(e.target.value)}
													/>
													{errors.date && errors.date.type === 'required' && (
													<span className="text-danger">Date  is required</span>
													)}
										</div>
									</div>
									{/* <div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Month <span className="login-danger">*</span></label>
											  
												  <select
                                                   className="form-control select"
                                                   {...register('month', { required: 'Please select a month' })}
												   value={month}
												   onChange={(e) => setmonth(e.target.value)}
                                                      >
                                                         <option value="">Select Type</option>
														 <option value="january">January</option>
                                                      	 <option value="february">Feburary</option>
														<option value="march">March</option>
														<option value="april">April</option>
														<option value="may">May</option>
														<option value="june">June</option>
														<option value="july">July</option>
														<option value="august">August</option>
														<option value="september">September</option>
														<option value="october">October</option>
														<option value="november">November</option>
														<option value="december">December</option>
                                                     </select>
                                                       {errors.month && <p className="text-danger">{errors.month.message}</p>}
											
										</div>
									</div> */}
								

								<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Unit <span className="login-danger">*</span></label>
										<input
											type="text"
											className="form-control" style={{backgroundColor:"#cbd0d6"}}
											value={filterEmployeeData[0] && filterEmployeeData[0].PostId.unit.name ? filterEmployeeData[0].PostId.unit.name:""}

											// style={{ backgroundColor: "#cbd0d6" }}
											readOnly
										/>
									</div>
								</div>

								<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Employee Name <span className="login-danger">*</span></label>
										<Select
										onChange={handleSelectChange}
										options={options}
										onInputChange={handleInputChange}
										
										placeholder="Search...."
										/>
									</div>
								</div>
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Department <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" style={{backgroundColor:"#cbd0d6"}}
											value={filterEmployeeData[0] && filterEmployeeData[0].PostId.department.name ? filterEmployeeData[0].PostId.department.name:""
											}
											readOnly/>
										</div>
									</div>
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Basic Salary <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" 
												style={{backgroundColor:"#cbd0d6"}}
												value={basicSalary} readOnly/>
										</div>
									</div>
								</div>	
							</div>

				
								<div className="row">
									
											<div className="col-md-12">
											<div className="card invoices-add-card">
												<div className="card-body">
													<div className="invoice-add-table">
													{tabledisplay &&
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
													
															<tr key={1454}>
																<td>
																<input type="text" className="form-control" value={ 1} readOnly 
																onChange={(e) => setRowId1(e.target.value)}/>
																</td>
																<td>
																<select className="form-control"
																// onKeyDown={handlesalarymasterclick}
																// onMouseEnter={handlesalarymasterclick}
																onChange={(event) => handlesalarymasterchange(event, index)}
																>
																
																	
																		<option value={salarymasterData[0]._id} key={salarymasterData[0]._id}>
																			{salarymasterData[0].name}
																		</option>
																	
																	
																</select>
																</td>
																
																<td>
																<input
																		
																		type="number"
																		className={`form-control ${errors.percentage ? 'is-invalid' : ''}`}
																		placeholder="%"
																		// onChange={handleChange}
																		value={DAPercentage}
																		// value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e)=>handleDAPercentage(e)}
																		/>
																	{console.log("per",DAPercentage)}
																		{errors.percentage && errors.percentage.type === 'pattern' && (
																		<span className="text-danger">Please enter a valid percentage</span>
																		)}
															</td>
																<td>
																<input
																	type="text"
																	className="form-control"
																	value={DAValue ? DAValue : ''}
																	onChange={(e) => handleDAValue( e)}
																	
																/>
																</td>
																<td>
																<input type="text" className="form-control" 
																 value={DAPrice?DAPrice:''}
																 readOnly/>
																</td>
																<td className="add-remove text-end">
																
																
																
																</td>
															</tr>
														

														
														</tbody>
														<tbody>
															
															<tr key={235435}>
																<td>
																<input type="text" className="form-control" value={ 2 } readOnly 
																onChange={(e) => setRowId2(e.target.value)}/>
																</td>
																<td>
																<select className="form-control"
																// onKeyDown={handlesalarymasterclick}
																// onMouseEnter={handlesalarymasterclick}
																onChange={(event) => handlesalarymasterchange(event, index)}
																>
																
																	
																		<option value={salarymasterData[1]._id} key={salarymasterData[0]._id}>
																			{salarymasterData[1].name}
																		</option>
																	
																	
																</select>
																</td>
																
																<td>
																<input
																		
																		type="number"
																		className={`form-control ${errors.percentage ? 'is-invalid' : ''}`}
																		placeholder="%"
																		// onChange={handleChange}
																		value={IRPercentage}
																		// value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e) => handleIRPercentage(e)}
																		/>
																	
																		{errors.percentage && errors.percentage.type === 'pattern' && (
																		<span className="text-danger">Please enter a valid percentage</span>
																		)}
															</td>
																<td>
																<input
																	type="text"
																	className="form-control"
																	value={IRValue}
																	onChange={(e) => handleIRValue(e)}
																	
																/>
																</td>
																<td>
																<input type="text" className="form-control" 
																 value={IRPrice?IRPrice:''}
																 readOnly/>
																</td>
																<td className="add-remove text-end">
																
																
																
																</td>
															</tr>
													

														
														</tbody>
														<tbody>
															
													{tablerow.map((row,index)=>(
														<tr key={row.id}>
														<td><input type="text" className="form-control"  value={index+2+1}  readOnly/></td>
														<td>
														<select
															className="form-control "
															
																onClick={(event) => handlesalarymasterchange(event, index)}
															
															  onChange= {handlesalarymasterclick}
															
															>
															<option value={row._id} key={row._id}
															>
																{row.salaryComponent.name}
															</option>
															{salarymasterData.map(
																(option) => (
																<option
																	value={option._id}
																	key={option._id}
																>
																	{option.name}
																</option>
																)
															)}
															</select>
															</td>
														<td><input type="text" className="form-control" value={row.percentage ? row.percentage : ""}   onChange={(e) =>
																	handleChange(
																	index,
																	e.target.value
																	)
																}/></td>
														<td><input type="text" className="form-control" value={row.value ? row.value : ""}   onChange={(e) =>
																	handleSecondInputChange(
																	index,
																	e.target.value
																	)
																}/></td>
														<td><input type="text" className="form-control"   value={row.price ? row.price : ""} onChange={(e)=>setTotalRowPrice(index,e.target.value)} readOnly/></td>
														 <td className="add-remove text-end">
															<a
															href="javascript:void(0);"
															className="me-2"
															onClick={handleAddRow}
															>
															<i className="fas fa-plus-circle"></i>
															</a>

															<a
															href="javascript:void(0);"
															className="remove-btn"
															onClick={() =>
																handleRemoveRow(row.id)
															}
															>
															<i className="fa fa-trash-alt"></i>
															</a>
														</td>
													</tr>
													))}
														  {tablerow.length === 0 &&
															setTablerow((prevRows) => [
															...prevRows,
															{
																id: 1,
																salaryComponent: "",
																percentage: "",
																value: "",
																price: "",
															},
															])}	
														</tbody>
														<tfoot>
															{/* <tr>
																 <td colSpan="4" className='text-end'>Allowed Leaves</td>
																 <td><input
																className="form-control"
																type="number"
																value={allowedleave ? allowedleave : ''}
																style={{ backgroundColor: "#cbd0d6" }}
																readOnly
																/>
																</td>
															</tr> */}
															<tr>
																<td colSpan="4" className='text-end mt-4'>Absent</td>
																<input
																className="form-control"
																type="number"
																min={0}
																onChange={(e) => setAbsentDays(e.target.value)}
																value={absentDays}
    />
															</tr>
															<div style={{display:"none"}}>balance Leave</div>
															<tr>
															<td colSpan="4" className="text-end"><strong>Total Amount:</strong></td>
															<td><input type="number" className="form-control"   value={salaryTotal?.TotalSalary?salaryTotal.TotalSalary :salaryTotal} readOnly/></td>
															{/* <td><input className="form-control" type="number" value={itemdata?.TotalSalary?itemdata.TotalSalary :TotalSalary}  readOnly/>
															
															</td> */}
															
															</tr>
															<tr>
																<td><input type="text" style={{display:"none"}} value={leaveDifference}/></td>
															</tr>
														</tfoot>
														</table>
														
													</div>}
													<div className="col-12">
											<div className="doctor-submit text-end m-3">
												<button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
												<button type="submit" className="btn btn-primary cancel-form">Cancel</button>
											</div>
										</div>
													</div>
												</div>
											</div>
											</div> 
										</div>
										
										</form></div>	}

	
			{ salaryList&&  <div>
		<button className='btn btn-success' onClick={handleAddClick}> Add </button>
			<MemoizedSalaryBill formdata={formdata} setformdata={setformData}/> 	</div>}
		
    </>
  )
}

export default Salarybill