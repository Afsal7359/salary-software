import React,{ useMemo,useEffect, useState} from 'react'
import PageHeader from '../PageHeader'
import { toast } from 'react-toastify';
import { editemployeemaster, getallemployeemaster } from '../../Apicalls/EmployeeMater';
import { getallSalary } from '../../Apicalls/salarymaster';
import { AddSalaryBill } from '../../Apicalls/salaryBill';
import list_salary_bill from './list_salary_bill';




const MemoizedSalaryBill = React.memo(list_salary_bill);
function Salarybill() {


	const [unit,setUnit]=useState('');
	const [department,setDepartment]=useState('');
	const [EmployeeData, setEmployeeData] = useState([]);
	const [EmployeeId, setEmployeeId] = useState('');
	const [isEmployeeDataFetched, setIsEmployeeDataFetched] = useState(false);
	const [absentvalue,setAbsentValue]=useState('')
	const [allowedleave,setAllowedLeave]=useState('')
	const [tablerow, setTablerow] = useState([]);
	const [basicSalary,setBasicSalary]=useState('')
	const [filterEmployeeData,setFilterEmployeeData]=useState([]);
	const [TotalSalary, setTotalSalary] = useState('');
	const [Totalamount, setTotalAmount] = useState('');
	const [totalrowprice,setTotalRowPrice]=useState([]);
	const [employeeid,setEmployeeid]=useState('');
	const [formdata,setformData]=useState([]);


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
   console.log('ggggggggggggggggggggggg',EmployeeData);
   const handleEmployeeChange = (event) => {
    const newEmployeeId = event.target.value;
    setEmployeeId(newEmployeeId);

    if (EmployeeData) {
        const filteredEmployees = EmployeeData.filter(data => data.name === newEmployeeId);
		setAllowedLeave(filteredEmployees[0]?filteredEmployees[0].allowedleave :"")
		const tablerowData = filteredEmployees[0]?.tablerow;

			if (Array.isArray(tablerowData)) {
			setTablerow(tablerowData);
			} else {
			setTablerow([]);
			}
		setEmployeeid(filteredEmployees[0]?filteredEmployees[0]._id :"")
		setDepartment(filteredEmployees[0]?filteredEmployees[0].PostId.department._id : '')
		setUnit(filteredEmployees[0]?filteredEmployees[0].PostId.unit._id : ""	)
		setBasicSalary(filteredEmployees[0]?filteredEmployees[0].basicSalary :"")
		setTotalSalary(filteredEmployees[0]?filteredEmployees[0].TotalSalary:"")
		
        setFilterEmployeeData(filteredEmployees);

		  console.log('tablerow',tablerow);
    } else {
        setFilterEmployeeData([]);
    }
};	const [itemdata,setitemdata]=useState(filterEmployeeData[0])

console.log('setdata',allowedleave);

console.log("employeeid",EmployeeId);

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



  const [issalarymasterDataFetched, setIsSalarymasterDataFetched] =useState(false);
  const [salarymasterData, setSalarymasterData] = useState([]);
  const [salarymasterId, setSalarymasterId] = useState("");

  
 
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


  
console.log("salary fetch",salarymasterData);

const handlesalarymasterchange = (event, index) => {
	const updatedTableRows = [...tablerow];
	updatedTableRows[index] = {
	  ...updatedTableRows[index],
	  salaryComponent: event.target.value,
	};
	console.log("iiiiiiiiiiiiiiiiiiiiii",updatedTableRows);
	setTablerow(updatedTableRows);
  };
  
  const [salarycomponent, setSalaryComponent] = useState([]);
console.log('totalrssow',totalrowprice);


    // // Function to handle changes in basic salary
    // const handleBasicSalaryChange = (newBasicSalary) => {
    //   setBasicSalary(newBasicSalary);
    //   // Recalculate prices for all rows based on the new basicSalary
    //   const updatedTablerow = tablerow.map((row) => {
    //     const newPrice = (Number(newBasicSalary) * Number(row.percentage)) / 100;
    //     return { ...row, price: newPrice };
    //   });
  
    //   setTablerow(updatedTablerow);
    // };
	const [absentDays, setAbsentDays] = useState('');
	const [perDaySalary, setPerDaySalary] = useState('');
	const [salaryTotal, setSalaryTotal] = useState('');
    const [leaveDifference,setLeaveDifference]=useState('');

useEffect(() => {
try {
  const totalAmount = tablerow.reduce((acc, row) => {
    const salaryType = salarymasterData.find(
      (item) =>
        item._id === row.salaryComponent?._id || item._id === row.salaryComponent
    );

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
  }, parseFloat(basicSalary));
	// Calculate per day salary
	const calculatedPerDaySalary = basicSalary / 30;
	setPerDaySalary(calculatedPerDaySalary)
	console.log("perday Salary",perDaySalary);
	
	  // Calculate the difference between allowed and absent leaves
	  if(absentDays > allowedleave){
		console.log("absentdays",absentDays);
		console.log('alloweddays',allowedleave);
		const leaveDifferences = absentDays - allowedleave  ;
		console.log('LeaveDifferencesss',leaveDifferences);
		
		// setLeaveDifference(leaveDifferences);
		// console.log('LeaveDifference',leaveDifference);
		  const calculatedTotal = totalAmount - (leaveDifferences * perDaySalary);
		  setSalaryTotal(calculatedTotal.toFixed(2));
		  
	  }else {
		  // If the difference is not positive, set the total to basic salary
		  setSalaryTotal({
			...itemdata,
			TotalSalary: totalAmount.toFixed(2),
		  });
		}



	const balanceleave = allowedleave - absentDays
	if(balanceleave < 0){
		setLeaveDifference(0)
	}else{
		setLeaveDifference(balanceleave)
	}
	
 
//   if (!isNaN(totalAmount)) {

	

//     // Check if the calculated totalAmount is a valid number
//     setitemdata({
//       ...itemdata,
//       TotalSalary: totalAmount,
//     });
//   } else {
//     console.error('Invalid totalAmount:', totalAmount);
//   }

  
} catch (error) {
  console.error('Error in useEffect:', error);
}
  }, [tablerow, basicSalary, salarymasterData, allowedleave, absentDays]);


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

// const [balanceleave,setBalanceLeave]=useState('');

// useEffect(()=>{
// 	const handleAllowedLeaveChange = async () => {
// 		console.log('haaaaaaaaaaaaaaaaaaaa');
// 		const LeaveBalance = {
// 			_id: filterEmployeeData[0]._id,
// 			allowedleave: Number(leaveDifference)
// 		};
// 		console.log('formdaaats:', LeaveBalance);
// 		setBalanceLeave(LeaveBalance);
	  
// 	};
// })




const handleformsubmit = async(event)=>{
	event.preventDefault();
		try {
			const LeaveBalance = {
				_id: filterEmployeeData[0]._id,
				allowedleave: Number(leaveDifference)
			};
			console.log('formdaaats:', LeaveBalance);
			const responses = await editemployeemaster(LeaveBalance);
			if (responses.success){
				console.log("sucessfully updated");
			}
			const formdata = {
			employeeid:employeeid,
			departmentid : department,
			unitid : unit,
			basicSalary:basicSalary,
			tablerow: tablerow.map(row => {
				return {
					...row,
					salaryComponent: row.salaryComponent._id ? row.salaryComponent._id : row.salaryComponent // or provide a default value if _id doesn't exist
				};
			}),
			allowedleave:allowedleave,
			absentDays : absentDays,
			totalAmount: salaryTotal?.TotalSalary?salaryTotal.TotalSalary :salaryTotal
			}
			console.log(formdata);

			const response = await AddSalaryBill(formdata);

			 if (response.success){
			setformData(response.data);
			toast.success(response.message);
			}
			else {
				toast.error(response.message);
			  }
			
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}

	}

	
console.log("absent",absentvalue);


console.log('ssssss',basicSalary);
return (
    <>
      <PageHeader headerdata={headerdata}/>


							<form onSubmit={handleformsubmit}>
							<div class="container mt-5">
								<div class="row">
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Salary No <span className="login-danger">*</span></label>
										    <input type="text" className="form-control" style={{backgroundColor:"#cbd0d6"}} readOnly/>
										</div>
									</div>
									
									<div class="col-sm-4">
									   <div className="form-group local-forms">
											<label>Date <span className="login-danger">*</span></label>
										    <input type="date" className="form-control"  />
										</div>
									</div>
								<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Employee Name <span className="login-danger">*</span></label>
										<input list="browsers" name="browser" id="browser" className='form-control' onClick={handleEmployeeclick} onChange={handleEmployeeChange}/>
										<datalist id="browsers">
											{EmployeeData.map((data) => (
												<option value={data.name} key={data._id}>
													{data.name}
												</option>
											))}
										</datalist>
									</div>
								</div>

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
															
													{tablerow.map((row,index)=>(
														<tr key={row.id}>
														<td><input type="text" className="form-control"  value={index+1}  readOnly/></td>
														<td>
														<select
															className="form-control"
															
																onClick={(event) => handlesalarymasterchange(event, index)}
															
															  onChange= {handlesalarymasterclick}
															
															>
															<option
																value={row._id}
																key={row._id}
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
															<tr>
																<td colSpan="4" className='text-end'>Allowed Leaves</td>
																<td><input
																className="form-control"
																type="number"
																value={allowedleave ? allowedleave : ''}
																style={{ backgroundColor: "#cbd0d6" }}
																readOnly
																/>
																</td>
															</tr>
															<tr>
																<td colSpan="4" className='text-end'>Absent</td>
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
														
													</div>
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


			<MemoizedSalaryBill formdata={formdata} setformdata={setformData} />
    </>
  )
}

export default Salarybill