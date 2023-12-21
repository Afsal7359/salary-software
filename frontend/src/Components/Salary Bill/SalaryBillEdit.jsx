import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getallSalary } from "../../Apicalls/salarymaster";
import { getallemployeemaster } from "../../Apicalls/EmployeeMater";
import { EditSalaryBill } from "../../Apicalls/salaryBill";
import List_salary_bill from "./List_salary_bill";

import Select from 'react-select';




function SalaryBillEdit({  item, setData, Data, }) {
  console.log(item,"itemddddddddddddddddddddddd");

  const MemoizedSalaryBill = React.memo(List_salary_bill);
 
	const [Editsalary,setEditSalary]=useState(true)
   
	const [salaryList,setSalaryList]=useState(false)
	const [unit,setUnit]=useState('');
  const [unitid,setUnitid]=useState(item.unitid._id);
  const [units,setUnits]=useState(item.unitid.name);
  const [department,setDepartment]=useState('');
	const [departmentid,setDepartmentid]=useState(item.departmentid.name);
  const [departments,setDepartments]=useState(item.departmentid._id);
	const [EmployeeData, setEmployeeData] = useState([]);
	const [EmployeeId, setEmployeeId] = useState(item.employeeid.name);
	const [isEmployeeDataFetched, setIsEmployeeDataFetched] = useState(false);
	const [absentvalue,setAbsentValue]=useState('')
	const [allowedleave,setAllowedLeave]=useState(item.allowedleave)
	const [tablerow, setTablerow] = useState(item.tablerow.slice(2));
	const [basicSalary,setBasicSalary]=useState(item.basicSalary)
	const [filterEmployeeData,setFilterEmployeeData]=useState([]);
  const [SalaryBillNo,setSalaryBillNo]=useState(item.SalaryBillNo)
	const [TotalSalary, setTotalSalary] = useState('');
	const [Totalamount, setTotalAmount] = useState('');
	const [totalrowprice,setTotalRowPrice]=useState([]);
	const [employeeid,setEmployeeid]=useState('');
  const [employeeId,setemployeeId]=useState(item.employeeid._id);
	const [formdata,setformData]=useState([]);
	const [date,setDate]=useState(item.date);
	const[count,setcount]=useState('');
  const [salarymasterData, setSalarymasterData] = useState([]);
  const [absentDays, setAbsentDays] = useState(0);
	const [perDaySalary, setPerDaySalary] = useState('');
	const [salaryTotal, setSalaryTotal] = useState(item.totalAmount);
  const [leaveDifference,setLeaveDifference]=useState('');
  const [issalarymasterDataFetched, setIsSalarymasterDataFetched] =useState(false);
  const [itemid, setitemid] = useState(item._id);
  const [month, setmonth] = useState(item.month)


  
	const [DAPercentage,setDAPercentage]=useState('');
	const [DAValue,setDAValue]=useState('');
	const [DAPrice,setDAPrice]=useState('');
	const [IRPercentage,setIRPercentage]=useState('');
	const [IRValue,setIRValue]=useState('');
	const [IRPrice,setIRPrice]=useState('');
	const [dateOfJoining,setDateOfJoining]=useState(item.employeeid.dateOfJoining); 
	const [employeeTypeId,setEmployeeTypeId]=useState(item.employeeid.EmployeeTypeId._id);
	const [tabledisplay,setTableDisplay]=useState(false);

	const [EPFWage,setEPFWage]=useState('');
	const [EPSWage,setEPSWage]=useState('');
	const [EPSContri,setEPSContri]=useState('');
	const[EPFContri,setEPFContri]=useState('');
	const[EPSEPFDiff,setEPSEPFDiff]=useState('');
	const [EDLIWage, setEDLIWage]=useState('');

useEffect(()=>{
	if(employeeTypeId === "6566be7b0085f19cfbfd00c1"){
		setTableDisplay(true)
	}else{
		setTableDisplay(false)
	}
},[employeeTypeId])
	

    const handleEmployeeclick = async () => {
      console.log('ddddddddddEmployee');
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
console.log('ddddddddddddddddddddddddddddddddddddd',EmployeeData);
 console.log(employeeTypeId,"::EmployeeTypeID");
  

console.log('frfrrrrffrfrffrffrffr',filterEmployeeData);




  const handlesalarymasterchange = (event, index) => {
    const updatedTableRows = [...tablerow];
    updatedTableRows[index] = {
      ...updatedTableRows[index],
      salaryComponent: event.target.value,
    };
    setTablerow(updatedTableRows); // Update the state with the modified rows
  };
 


  const handleAddRow = () => {
    const newRow = {
        id: tablerow.length + 1,
        salaryComponent: "",
        percentage: "",
        value: "",
        price: "",
  };
    setTablerow([...tablerow, newRow]);
   
  };


  const handleRemoveRow = (id) => {
    setTablerow((prevRows) => prevRows.filter((row) => row.id !== id));
  };

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



  
     
 
 	const [totalincrement,setTotalIncrement]=useState(0);
	const [totaldeduction,setTotalDeduction]=useState(0)
	useEffect(() => {
		try {
		  let totalAmount = basicSalary;
		  let totalDeduction = 0;
		  let totalIncrement = 0;
	  
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
			  }
			}
		  });
	  
		  // Calculate the total after deducting deductions and adding increments
		  totalAmount = totalAmount - totalDeduction + totalIncrement;
	  
		  const calculatedPerDaySalary = basicSalary / 30;
		  setPerDaySalary(calculatedPerDaySalary);
	  
		  if (absentDays > allowedleave) {
			const leaveDifferences = absentDays - allowedleave;
			const calculatedTotal = totalAmount - leaveDifferences * perDaySalary;
			setSalaryTotal({
				...itemdata,
				TotalSalary: totalAmount.toFixed(2),
				});;
		  } else {
			setSalaryTotal({
				...itemdata,
				TotalSalary: totalAmount.toFixed(2),
				});
		  }
	  
		  const balanceleave = allowedleave - absentDays;
		  setLeaveDifference(balanceleave < 0 ? 0 : balanceleave);
	  
		  setTotalDeduction(totalDeduction.toFixed(2));
		  setTotalIncrement(parseFloat(basicSalary) + parseFloat(totalIncrement));
		  setTotalAmount(totalAmount.toFixed(2)); // Set the total amount
		  console.log('total deduction:',totalDeduction);
		  console.log('total increment:',totalincrement);
		  console.log('total :',totalAmount);
		} catch (error) {
		  console.error('Error in useEffect:', error);
		}
	  }, [tablerow, basicSalary, salarymasterData, allowedleave, absentDays, perDaySalary]);
	  
    

	
	const [selectedOption, setSelectedOption] = useState([]);
	console.log('selected name',selectedOption);
	const [options, setOptions] = useState(EmployeeData.map((data) => ({ value: data.name, label: data.name })));
   
	 const handleInputChange = (newValue) => {
	   // Implement your search/filter logic here
	   // For example, filter options based on user input
	   console.log("newwwvaluees",newValue);
	   const filteredOptions = EmployeeData.filter((data) =>
		 data.name.toLowerCase().includes(newValue.toLowerCase())
	   ).map((data) => ({ value: data.name, label: data.name }));
	   setOptions(filteredOptions);
	 };
 
		 
 // console.log('opyions',selectedOption.value);
 console.log("employeeid",EmployeeId);
 
	const handleSelectChange = (selected) => {
	 setSelectedOption(selected);
	 // console.log(selected,"haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaai");
	 // console.log(selectedOption,'gggggggggggggggiiiiiiiiiiiiiiiiiiiiiii');
	 // console.log('opyions',selectedOption.value);
	 const select = selected.value
	 console.log(select,"fffffffffffffffffffffdddddddddddddddddddd");
	 if (select) {
		 
		 const filteredEmployees = EmployeeData.filter(data => data.name === select);
		 setAllowedLeave(filteredEmployees[0]?filteredEmployees[0].allowedleave :"")
	
		 setEmployeeTypeId(filteredEmployees[0]?filteredEmployees[0].EmployeeTypeId._id:"");
		 setEmployeeid(filteredEmployees[0]?filteredEmployees[0]._id :"")
		 setDepartment(filteredEmployees[0]?filteredEmployees[0].PostId.department._id : '')
		 setUnit(filteredEmployees[0]?filteredEmployees[0].PostId.unit._id : ""	)
		 setBasicSalary(filteredEmployees[0]?filteredEmployees[0].basicSalary :"")
		 setTotalSalary(filteredEmployees[0]?filteredEmployees[0].TotalSalary:"")
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
			
	 } else {
		 setFilterEmployeeData([]);
	 }
 };	const [itemdata,setitemdata]=useState(filterEmployeeData[0])
 
  
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
			} else if (employeeTypeId === "6566be7b0085f19cfbfd00c1" && (salaryTotal >= 15000)) {
			  setEPSWage(15000);
			} else if(employeeTypeId === "6566be7b0085f19cfbfd00c1" && (salaryTotal < 15000)) {
			  setEPSWage(totalAmount);
			}else{
				setEPSWage('')
			};
		

			if(employeeTypeId === "6566be7b0085f19cfbfd00c1" &&(salaryTotal >= 15000)){
				setEDLIWage(15000)
			}else if(employeeTypeId === "6566be7b0085f19cfbfd00c1" &&(salaryTotal < 15000)){
				setEDLIWage(salaryTotal)
			}else{
				setEDLIWage('')
			}

			console.log(EPFWage,":EPF WAGE");
			console.log(EPSWage,":Eps WAGE");
			console.log(dateOfJoining);
			console.log(EDLIWage,":EDLI WAGE");
			console.log(EDLIWage,"EdliWage");

		  }, [salaryTotal, dateOfJoining,EPSWage,EPFWage,EDLIWage,filterEmployeeData,employeeTypeId]);
		  
  useEffect(() => {

	 // DA row
	 
	 if (DAPercentage !== 0 && !DAValue) {
	   const price = (basicSalary * DAPercentage) / 100;
	   setDAPrice(price);
	 }
   
	 else if (DAValue !== 0 && !DAPercentage) {
	   const prices = DAValue;
	   console.log("Priceeeeeeeeeee",prices);
	   setDAPrice(prices);
	 }

	 // IR row
	 
	 if (IRPercentage !== 0 && !IRValue) {
	   const price = (basicSalary * IRPercentage) / 100;
	   setIRPrice(price);
	 }
   
	 else if (IRValue !== 0 && !IRPercentage) {
	   const prices = IRValue;
	   console.log("Priceeeeeeeeeee",prices);
	   setIRPrice(prices);
	 }
   }, [DAPercentage, DAValue, basicSalary,IRPercentage,IRValue]);
  

useEffect(()=>{
try{
	if(EPSWage === 15000){
		setEPSContri(1250)
	}else if(EPSWage === 0){
		setEPSContri(0)
	}else{
		 const EPS = (EPFWage * 8.33)/100
		 console.log(EPS,"eps");
		 setEPSContri(EPS)
	}

	const targetId = '6572ef07fb305bd8c621bcee';
	let foundData = null;
	
	for (let i = 0; i < tablerow.length; i++) {
	  if (tablerow[i].salaryComponent._id === targetId) {
		foundData = tablerow[i];
		break;
	  }
	}

	const EPFs = (EPFWage * 12) / 100;

	if (!foundData) {
	 setEPFContri(EPFs)
	 console.log('ffffffffffffffffffuuuuuuuuuuu');
	} else {
		console.log('ddddddddddddddddddddddddd');
	  const EPFS =( EPFs + foundData.price)
	  setEPFContri(EPFS)
	}
    
	const EPFSS = (EPFWage * 12) / 100;

	if(EPFSS && EPFContri){
		const EPFEPSDIFF = EPFs -EPSContri
		setEPSEPFDiff(EPFEPSDIFF)
	}
	

	

}catch(error){
	console.log(error);
}

	console.log(EPSContri,";;;;;;;EPSContri;;;;;;;");
	console.log(EPFContri,"....................EPFContri.............................");
	console.log(EPSEPFDiff,":EPSEPFDiff:");
},[employeeid,options ])


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
	console.log(updatedFirstRow,"updatedroww");
	console.log(tablerow);

	if (tablerow && tablerow.length > 0 && tablerow[0].price === '') {
	  updatedFirstRow = [...updatedFirstRow];
	  setUpdatedRow(updatedFirstRow)
	}else if( tablerow && tablerow.length > 0 && tablerow[0].price > 0){
	  updatedFirstRow=[...updatedFirstRow, ...tablerow]
	  setUpdatedRow(updatedFirstRow)
	}
	console.log(updatedFirstRow,":::::::::::::::fffff");

  },[tablerow]) 

console.log(tablerow,"::tableroqw");
  
const handlesubmit =async(event)=>{
  event.preventDefault()
try{
  const formdatas = {

    SalaryBillNo:SalaryBillNo, 
    date:date,	
    employeeid:employeeid?employeeid:employeeId,
    departmentid : department?department:departments,
    unitid : unit?unit:unitid,
    basicSalary:basicSalary,
    tablerow: tablerow.map(row => {
      return {
        ...row,
        salaryComponent: row.salaryComponent._id ? row.salaryComponent._id : row.salaryComponent // or provide a default value if _id doesn't exist
      };
    }),
    allowedleave:allowedleave,
    absentDays : absentDays,
	totaldeduction:totaldeduction,
	totalincrement:totalincrement,
    totalAmount: salaryTotal?.TotalSalary?salaryTotal.TotalSalary :salaryTotal,
  }; console.log("formdataedit",formdatas);


    formdatas._id = itemid;
  const response = await EditSalaryBill(formdatas);

  if (response.success){
 setformData(response.data);
 toast.success(response.message);
 setSalaryList(true);
 setEditSalary(false)
 }
 else {
   toast.error(response.message);
   }

} catch (error) {
  toast.error(error.message);
  console.log(error);
}
   
    
}



  return (
    <div>
     {Editsalary&&
        <div>
         
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                 
                <form onSubmit={handlesubmit}>
							<div class="container mt-5">
								<div class="row">
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Salary No <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" value={SalaryBillNo}  style={{backgroundColor:"#cbd0d6"}} readOnly/>
										</div>
									</div>
									
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Date <span className="login-danger">*</span></label>
											   <input
												
													type='date'
													className={`form-control`}
													placeholder=""
													value={date}
													onChange={(e) => setDate(e.target.value)}
													/>
												
										</div>
									</div>
									

								<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Unit <span className="login-danger">*</span></label>
										<input
											type="text"
											className="form-control" style={{backgroundColor:"#cbd0d6"}}
											value={filterEmployeeData[0] && filterEmployeeData[0].PostId.unit.name ? filterEmployeeData[0].PostId.unit.name:units}

											// style={{ backgroundColor: "#cbd0d6" }}
											readOnly
										/>
									</div>
								</div>

								<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Employee Name <span className="login-danger">*</span></label>
										<Select
										value={selectedOption ==[] ?item.employeeid.name:selectedOption}
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
											value={filterEmployeeData[0] && filterEmployeeData[0].PostId.department.name ? filterEmployeeData[0].PostId.department.name:departmentid}
											readOnly/>
										</div>
									</div>
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Basic Salary <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" 
												style={{backgroundColor:"#cbd0d6"}}
												value={filterEmployeeData[0] && filterEmployeeData[0].basicSalary ? filterEmployeeData[0].basicSalary:basicSalary} readOnly/>
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
																		className={`form-control`}
																		placeholder="%"
																		// onChange={handleChange}
																		value={DAPercentage}
																		// value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e)=>handleDAPercentage(e)}
																		/>
																	{/* {console.log("per",DAPercentage)}
																		{errors.percentage && errors.percentage.type === 'pattern' && (
																		<span className="text-danger">Please enter a valid percentage</span>
																		)} */}
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
																		className={`form-control`}
																		placeholder="%"
																		// onChange={handleChange}
																		value={IRPercentage}
																		// value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e) => handleIRPercentage(e)}
																		/>
{/* 																	
																		{errors.percentage && errors.percentage.type === 'pattern' && (
																		<span className="text-danger">Please enter a valid percentage</span>
																		)} */}
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
										
										</form>

                </div>
              </div>
            </div>
          </div>
        
        </div>
      }

	
        { salaryList&&  <div>
		{/* <button className='btn btn-success' onClick={handleAddClick}> Add </button> */}
			<MemoizedSalaryBill formdata={formdata} setformdata={setformData}/> 	</div>}    
    </div>
  );
}

export default SalaryBillEdit;
