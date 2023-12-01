import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getallemployeetype } from "../../Apicalls/Employeetype";
import { getallpost } from "../../Apicalls/Post";
import { getallSalary } from "../../Apicalls/salarymaster";
import { getallemployeemaster } from "../../Apicalls/EmployeeMater";
import { EditSalaryBill } from "../../Apicalls/salaryBill";
import List_salary_bill from "./List_salary_bill";





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
	const [tablerow, setTablerow] = useState(item.tablerow);
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
console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',EmployeeData);
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
  
  
const handlesubmit =async(event)=>{
  event.preventDefault()
try{
  const formdatas = {

    SalaryBillNo:SalaryBillNo, 
    date:date,	
    employeeid:employeeid?employeeid:employeeId,
    date:date,
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
										<label>Employee Name <span className="login-danger">*</span></label>
										<input list="browsers" name="browser" id="browser" className='form-control' value={EmployeeId}   onClick={handleEmployeeclick} onChange={handleEmployeeChange}/>
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
											value={filterEmployeeData[0] && filterEmployeeData[0].PostId.unit.name ? filterEmployeeData[0].PostId.unit.name:units}

											// style={{ backgroundColor: "#cbd0d6" }}
											readOnly
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
															className="form-control "
															
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
																value={allowedleave ? allowedleave : allowedleave}
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
