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
	const [allowedleave,setAllowedLeave]=useState("")
	const [tablerow, setTablerow] = useState([]);
	const [tablerows, setTablerows] = useState([]);
	const [basicSalary,setBasicSalary]=useState(0)
	const [basicSalaryold,setBasicSalaryold]=useState('')
	const [filterEmployeeData,setFilterEmployeeData]=useState([]);
	const [TotalSalary, setTotalSalary] = useState('');
	// const [totalAmount, setTotalAmount] = useState('');
	const [totalrowprice,setTotalRowPrice]=useState([]);
	const [employeeid,setEmployeeid]=useState('');
	const [formdata,setformData]=useState([]);
	const [eligiblePay,setEligiblePay]=useState('');

	
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
	const [DAValue,setDAValue]=useState(0);
	const [DAPrice,setDAPrice]=useState(0);
	const [IRPercentage,setIRPercentage]=useState('');
	const [IRValue,setIRValue]=useState(0);
	const [IRPrice,setIRPrice]=useState(0);
	const [dateOfJoining,setDateOfJoining]=useState(''); 
	const [employeeTypeId,setEmployeeTypeId]=useState('');
	const [tabledisplay,setTableDisplay]=useState(false);

	const [LeaveDeduction,setLeaveDeduction]=useState('')

	const [incrementtable,SetIncrementTable]=useState([])
	const [decrementtable,SetDecrementTable]=useState([]);
	const [niltable,SetNilTable]=useState([]);

	const [rowid ,setRowId]=useState('')
	const [rowid1,setRowId1]=useState('')
	const [rowid2 ,setRowId2]=useState('')
	const[updatedRow,setUpdatedRow]=useState('');
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [selectedOptionsd, setSelectedOptionsd] = useState([]);
	const [selectedOptionsN, setSelectedOptionsN] = useState([]);
	const [filteredSalarydatain,setFilteredSalaryDatain]=useState([]);
  const [filteredSalarydatade,setFilteredSalaryDatade]=useState([]);
  const [filteredSalarydataNil,setFilteredSalaryDataNil]=useState([]);
  const [salarycomponent, setSalaryComponent] = useState([]);
  
	 
  const [absentDays, setAbsentDays] = useState();
  const [lossOfPay, setLossOfPay] = useState();
  const [daysinMonth, setDaysinMonth] = useState();
  const [CurrentMonthSalary, setCurrentMonthSalary] = useState();
  
  const [perDaySalary, setPerDaySalary] = useState('');
  const [salaryTotal, setSalaryTotal] = useState('');
  const [leaveDifference,setLeaveDifference]=useState('');
   const [totalincrement,setTotalIncrement]=useState(0);
  
  const [totaldeduction,setTotalDeduction]=useState(0)
  const [totalcontribution,setTotalContributions]=useState(0)
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountd, setTotalAmountd] = useState(0);
  const [totalAmountN, setTotalAmountN] = useState(0);

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
  
   const handleUpdatedRow =()=>{
	try {
		let UpdatedRowss = [...incrementtable,...decrementtable,...niltable]
		let filteredRows = UpdatedRowss.filter(row => row.price !== ''|| 0);
		setUpdatedRow(filteredRows)
		console.log(updatedRow,":::::::::::::::fffff UpdatedRRRRRRRRooooew");
		// if (incrementtable.length < 0 && decrementtable.length <0 && niltable.length < 0) {
		// 	let updatedrow = [...incrementtable,...decrementtable,...niltable ];
		// 	setUpdatedRow(updatedrow)	
		// }else{
		// 	setUpdatedRow([])
		//   }
		  if(updatedRow){
			updatedRow.forEach((row, index) => {
				row.id = index + 1;
			});
		  }
	} catch (error) {
		console.log(error);
	}
}
useEffect(()=>{
handleUpdatedRow();
  console.log(updatedRow,":::::::::::::::fffff UpdatedRRRRRRRRooooew");
},[incrementtable,decrementtable,niltable,tablerow,basicSalary ]) 

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
		SetIncrementTable([]); SetDecrementTable([]);  SetNilTable([]);
		setEmployeeTypeId(filteredEmployees[0]?filteredEmployees[0].EmployeeTypeId._id:"");
		setEmployeeid(filteredEmployees[0]?filteredEmployees[0]._id :"")
		setDepartment(filteredEmployees[0]?filteredEmployees[0].PostId.department._id : '')
		setUnit(filteredEmployees[0]?filteredEmployees[0].PostId.unit._id : ""	)
		setBasicSalary(filteredEmployees[0]?filteredEmployees[0].basicSalary :"")
		setBasicSalaryold(filteredEmployees[0]?filteredEmployees[0].basicSalary :"")
		setTotalSalary(filteredEmployees[0]?filteredEmployees[0].TotalSalary:"")

		setDateOfJoining(filteredEmployees[0].dateOfJoining?filteredEmployees[0].dateOfJoining:"");
        setFilterEmployeeData(filteredEmployees);
		const tablerowData = filteredEmployees[0]?.tablerow;
		console.log(select,"111111111111111111111111111111111111111111111111111111111111111");
		const incrementData = tablerowData.filter(e =>e.salaryComponent.type === "Increment")
		const decrementData = tablerowData.filter(e =>e.salaryComponent.type === "Decrement")
		const nilData = tablerowData.filter(e =>e.salaryComponent.type === "nil")
		console.log(incrementData,"Increment Data....");
		console.log(decrementData,"Decrement Data....");
		console.log(nilData,"Nil Data....");
		SetIncrementTable(incrementData)
		SetDecrementTable(decrementData)
		SetNilTable(nilData)
		setTablerow(tablerowData)

	
		console.log(tablerowData,"Table row Data");
		// if (Array.isArray(tablerowData)) {
		// setTablerow(tablerowData);
		// } else {
		// setTablerow([]);
		// }
		  console.log('tablerow',tablerow);
		  console.log("tableRows",tablerows);
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
	SetIncrementTable((prevRows) => [
	  ...prevRows,
	  {
		id: prevRows.length + 1, // Incrementing ID
		salaryComponent: '',
		percentage: '',
		value: '',
		price: '',
	  },
	]);
  };
  

  const handleRemoveRow = (id) => {
	SetIncrementTable((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const handleAddRowd = () => {
	SetDecrementTable((prevRows) => [
	  ...prevRows,
	  {
		id: prevRows.length + 1, // Incrementing ID
		salaryComponent: '',
		percentage: '',
		value: '',
		price: '',
	  },
	]);
  };
  

  const handleRemoveRowd = (id) => {
	SetDecrementTable((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const handleAddRowNil = () => {
	SetNilTable((prevRows) => [
	  ...prevRows,
	  {
		id: prevRows.length + 1, 
		salaryComponent: '',
		percentage: '',
		value: '',
		price: '',
	  },
	]);
  };
  

  const handleRemoveRowNil = (id) => {
	SetNilTable((prevRows) => prevRows.filter((row) => row.id !== id));
  };


  const [month, setmonth] = useState('')
  

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
  




  const handlesalarymasterchange = (event, index) => {
	const updatedTableRows = [...incrementtable];
	updatedTableRows[index] = {
	  ...updatedTableRows[index],
	  salaryComponent: event.target.value,
	  id: Number(index + 2 + 1)
	};
  
	console.log(updatedTableRows, "ii");
	SetIncrementTable(updatedTableRows);
	setSelectedOptions((prevSelectedOptions) => {
	  const updatedOptions = [...prevSelectedOptions];
	  updatedOptions[index] = event.target.value;
	  return updatedOptions;
	});
  };
  const handlesalarymasterchangede = (event, index , row) => {
	console.log(event, index,"eveeeeeeeent chnage");
	console.log(row,"eveeeeeeeent chnage rrrrrrrrrrrrrro");
	const updatedTableRows = [...decrementtable];
	updatedTableRows[index] = {
	  ...updatedTableRows[index],
	  salaryComponent: event.target.value, // Update salaryComponent based on the event value
	  id: Number(index + 2 + 1)
	};
  
	console.log(updatedTableRows, "ii");
	SetDecrementTable(updatedTableRows);
	setSelectedOptionsd((prevSelectedOptions) => {
	  const updatedOptions = [...prevSelectedOptions];
	  updatedOptions[index] = event.target.value;
	  return updatedOptions;
	});
  };
  const handlesalarymasterchangeNil = (event, index) => {
	const updatedTableRows = [...niltable];
	updatedTableRows[index] = {
	  ...updatedTableRows[index],
	  salaryComponent: event.target.value,
	  id: Number(index + 2 + 1)
	};
  
	console.log(updatedTableRows, "ii");
	SetNilTable(updatedTableRows);
	setSelectedOptionsN((prevSelectedOptions) => {
	  const updatedOptions = [...prevSelectedOptions];
	  updatedOptions[index] = event.target.value;
	  return updatedOptions;
	});
  };

  useEffect(()=>{
	handleDaPrice();
	handleIRPrice();
},[tablerow,incrementtable,decrementtable,daysinMonth,absentDays])

const handleDaPrice =()=>{
	try {
		const DaPrice = incrementtable.find(item => item.salaryComponent._id === "659bb609d4d7dd6ffd8dfbf3");
		console.log(DaPrice,"DDDDDDDdaPPPPPPPPPPrrrrice");
		if(DaPrice === "undefined"){
			setDAPrice(0)
		}else{
			setDAPrice(DaPrice.price?DaPrice.price:0)
		}
		
	} catch (error) {
		console.log(error);
	}
}
const handleIRPrice =()=>{
	try {
		const IRPrices = incrementtable.find(item => item.salaryComponent._id === "659bb617d4d7dd6ffd8dfbf7");
		console.log(IRPrices,"IRPriceIRPriceIRPrice");
		if(IRPrices === "undefined"){
			setIRPrice(0)
		}else{
			setIRPrice(IRPrices.price?IRPrices.price:0)
		}
		
	} catch (error) {
		console.log(error);
	}
}



const handleincrementbtnclick = ()=>{
	try {
	  const data = salarymasterData.filter(e =>e.type === "Increment")
	  if(data.length === 0){
		  toast.info("No Data Found in Increment ")
	  }
	  console.log(data,"incrementdata");
	  setFilteredSalaryDatain(data)
	} catch (error) {
		console.log(error);
	}
}
const handledecrementbtnclick = ()=>{	
  try {
	  const data = salarymasterData.filter(e =>e.type === "Decrement")
	  if(data.length === 0){
		  toast.info("No Data Found in Decrement ")
	  }
	  setFilteredSalaryDatade(data)
	  console.log(data,"salarymatserdata");
  } catch (error) {
	  console.log(error);
  }
}
const handlenilbtnclick = ()=>{
  try {
	  const data = salarymasterData.filter(e =>e.type === "nil")
	  if(data.length === 0){
		  toast.info("No Data Found in Nil ")
	  }
	  setFilteredSalaryDataNil(data)
	  console.log(data,"salarymatserdata");
	
  } catch (error) {
	  console.log(error);
  }
}
	useEffect(() => {
		try {
			const totalAmountincrement = incrementtable.reduce((acc, row) => {
				const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
				const price = parseFloat(row.price);
				console.log(acc + price, "neeeewprice");
				return acc + price; // Add the price to the accumulator and return it
			}, 0); // Provide an initial value of 0 for the accumulator
			
			console.log(totalAmountincrement,"totttttttttttalneeeewprice"); // This will print the total amount
		
			if (!isNaN(totalAmountincrement)) {
				// Check if the calculated totalAmount is a valid number
				setTotalAmount((totalAmountincrement).toFixed(2))
			  } else {
				console.error('Invalid totalAmount:', totalAmount);
			  }
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [ basicSalary,incrementtable,daysinMonth,absentDays]);
	
	useEffect(() => {
		try {
			const totaldecrementamount = decrementtable.reduce((acc, row) => {
				const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
				const price = parseFloat(row.price);
				console.log(acc + price, "neeeewprice");
				return acc + price; // Add the price to the accumulator and return it
			}, 0); // Provide an initial value of 0 for the accumulator
			
			console.log(totaldecrementamount,"totttttttttttalneeeewprice"); // This will print the total amount
		
			if (!isNaN(totaldecrementamount)) {
				// Check if the calculated totalAmount is a valid number
				setTotalAmountd((totaldecrementamount).toFixed(2))
			  } else {
				console.error('Invalid totalAmount:', totalAmount);
			  }
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [ basicSalary,decrementtable,daysinMonth,absentDays]);

	useEffect(() => {
		try {
			const totalNil = niltable.reduce((acc, row) => {
				const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
				const price = parseFloat(row.price);
				console.log(acc + price, "neeeewprice");
				return acc + price; // Add the price to the accumulator and return it
			}, 0); // Provide an initial value of 0 for the accumulator
			
			console.log(totalNil,"totttttttttttalneeeewprice"); // This will print the total amount
		
			if (!isNaN(totalNil)) {
				// Check if the calculated totalAmount is a valid number
				setTotalAmountN((totalNil).toFixed(2))
			  } else {
				console.error('Invalid totalAmount:', totalNil);
			  }
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [ basicSalary,niltable]);



  const handleSecondInputChange = (index, value) => {
    const updatedTableRows = [...incrementtable];
    updatedTableRows[index].percentage = "";
    updatedTableRows[index].value = value.trim() !== "" ? Number(value) : "";
    const newPrice = value.trim() !== "" ? value : "";
    updatedTableRows[index].price = newPrice;
    SetIncrementTable(updatedTableRows);
  };
  const handleSecondInputChangede = (index,value) => {
	const updatedTableRows = [...decrementtable];
	updatedTableRows[index].percentage ='';
	updatedTableRows[index].value = Number(value);
	const newPrice = (value)
	updatedTableRows[index].price = newPrice;
	SetDecrementTable(updatedTableRows);
};
const handleSecondInputChangeNil = (index,value) => {
	const updatedTableRows = [...niltable];
	updatedTableRows[index].percentage ='';
	updatedTableRows[index].value = Number(value);
	const newPrice = (value)
	updatedTableRows[index].price = newPrice;
	SetNilTable(updatedTableRows);
};



  const   handleChange = (index, percentage) => {
    const updatedTableRows = [...incrementtable];
    updatedTableRows[index].percentage = Number(percentage);

    // Reset second field's value when first field is updated
    updatedTableRows[index].value = "";

    // Recalculate the price based on the updated percentage and basic salary
    const newPrice = basicSalary
      ? (basicSalary * Number(percentage)) / 100
      : "";
    updatedTableRows[index].price = newPrice || "";

    SetIncrementTable(updatedTableRows);
  };

  const handleChangede = (index,percentage,row) => {
	
	console.log(row,"indexxxxxxxx",percentage,"pppprrrrr");
	if(row.salaryComponent._id === "659bbb52d4d7dd6ffd8dfc80"){
		handleDaPrice();
		handleIRPrice();	
		console.log("Haaaaaaaaai");
		const updatedTableRows = [...decrementtable];
		updatedTableRows[index].percentage = Number(percentage);
		const newsalarys = (((parseFloat(basicSalary) + parseFloat(DAPrice) + parseFloat(IRPrice)) * Number(percentage))/100).toFixed(2);
		console.log(newsalarys,DAPrice,"neeeeeeeeeeewsaaaaaaaaa");
	

	   console.log(newsalarys,"newpriceeeeeeeeeeeeeeeeeeeeeeeeeeee");
	updatedTableRows[index].price = newsalarys;
	SetDecrementTable(updatedTableRows);
	}
	else if(row.salaryComponent._id === "659bbb98d4d7dd6ffd8dfc9c"){
		console.log("Haaaaaaaaai");
		const updatedTableRows = [...decrementtable];
		updatedTableRows[index].percentage = Number(percentage);
		console.log(totalAmount);
	   // Recalculate the price based on the updated percentage and basic salary
	   const newPrice =   (((parseFloat(totalAmount)+parseFloat(basicSalary)) * Number(percentage)) / 100).toFixed(2)
	   console.log(newPrice,"newpriceeeeeeeeeeeeeeeeeeeeeeeeeeee");
	updatedTableRows[index].price = newPrice;
	SetDecrementTable(updatedTableRows);
	}
	else{
			const updatedTableRows = [...decrementtable];
			updatedTableRows[index].percentage = Number(percentage);
		// Recalculate the price based on the updated percentage and basic salary
		const newPrice = (Number(basicSalary) * Number(percentage)) / 100;
		updatedTableRows[index].price = newPrice;
		SetDecrementTable(updatedTableRows);
		}
	
};
const handleChangeNil = (index,percentage) => {
	const updatedTableRows = [...niltable];
	updatedTableRows[index].percentage = Number(percentage);
   // Recalculate the price based on the updated percentage and basic salary
const newPrice = (Number(basicSalary) * Number(percentage)) / 100;
updatedTableRows[index].price = newPrice;
SetNilTable(updatedTableRows);
};

useEffect(() => {
	handleDaPrice();
	handleIRPrice();

	if( basicSalary && DAPrice && IRPrice){
		const EPF = parseFloat(basicSalary) + parseFloat(DAPrice) + parseFloat(IRPrice)
		setEPFWage(EPF)
	}else{
		setEPFWage('')
	};



const joiningDate = new Date(dateOfJoining);
const comparisonDate = new Date('2014-01-01');

	if ((joiningDate >= comparisonDate)) {
	  setEPSWage(0);
	} else if (((totalAmount+parseFloat(basicSalary)) >= 15000)) {
	  setEPSWage(15000);
	} else if( ((totalAmount+parseFloat(basicSalary)) < 15000)) {
	  setEPSWage((totalAmount+parseFloat(basicSalary)));
	}else{
		setEPSWage('')
	};


	if((parseFloat(totalAmount)+parseFloat(basicSalary)) >= 15000){
		setEDLIWage(15000)
	}else if(((totalAmount+parseFloat(basicSalary)) < 15000)){
		setEDLIWage((parseFloat(totalAmount)+parseFloat(basicSalary)))
	}

	
if(EPSWage === 15000){
setEPSContri(1250)
}else if(EPSWage === 0){
setEPSContri(0)
}else{
 const EPS = (EPFWage * 8.33)/100
 setEPSContri(EPS)
}

const targetId = '659bb695d4d7dd6ffd8dfbfb';
let foundData = null;

for (let i = 0; i < incrementtable.length; i++) {
if (incrementtable[i].salaryComponent._id ?incrementtable[i].salaryComponent._id :incrementtable[i].salaryComponent === targetId) {
foundData = incrementtable[i];
break;
}
}
console.log(foundData,"FOunded datatata");

if (!foundData) {
	const EPFcontribution = (EPFWage * 12) / 100;
setEPFContri(EPFcontribution)
console.log('ffffffffffffffffffuuuuuuuuuuu');
} else {
console.log('ddddddddddddddddddddddddd');
console.log( ((EPFWage * 12) / 100) + parseFloat(foundData.price),"Epf wage");
const EPFcontributions = ((EPFWage * 12) / 100) + parseFloat(foundData.price)
setEPFContri(EPFcontributions)
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

  }, [totalAmount, dateOfJoining,EPSWage,EPFWage,EDLIWage,filterEmployeeData,employeeTypeId,,employeeid,options,tablerow,DAPrice,IRPrice,]);
  console.log(absentDays,":AbsentDays");

  useEffect(()=>{
	if(absentDays && basicSalaryold && daysinMonth ){
		const EligiblePays = (daysinMonth - absentDays)*(basicSalaryold/daysinMonth)
		const LossOfPAY = (absentDays)*(basicSalaryold/daysinMonth)
		// setEligiblePay(Math.round(EligiblePay))
		setBasicSalary((EligiblePays).toFixed(2))
		setLossOfPay((LossOfPAY.toFixed(2)))
		console.log(EligiblePays,":Eligible Pay");
		console.log(LossOfPAY,":Loss Pay");
		
		
		  const newData = incrementtable.map(item => {
			if (item.value !== '') {
			  // If percentage is not empty, calculate price based on percentage
			  return {
				...item,
				price: item.value
			  };
			} else if (item.percentage !== '') {
			  // If percentage is empty but value is not empty, set price equal to value
			  return {
				...item,
				price:( (basicSalary * item.percentage) / 100).toFixed(2)
			  };
			} else {
			  // If both percentage and value are empty, return the item as is
			  return item; // No changes to the item
			}
		  });
		 
		  SetIncrementTable(newData)

		  const newDatani = niltable.map(item => {
			if (item.value !== '') {
			  // If percentage is not empty, calculate price based on percentage
			  return {
				...item,
				price: item.value
			  };
			} else if (item.percentage !== '') {
			  // If percentage is empty but value is not empty, set price equal to value
			  return {
				...item,
				price: ((basicSalary * item.percentage) / 100).toFixed(2)
			  };
			} else {
			  // If both percentage and value are empty, return the item as is
			  return item; // No changes to the item
			}
		  });
		  SetNilTable(newDatani)
		  

		
		

		
	}

  },[absentDays,daysinMonth,basicSalary,basicSalaryold])

  useEffect(()=>{
	if(absentDays && daysinMonth){
		const newDatade = decrementtable.map(item => {
			if (item.value !== '') {
			  // If percentage is not empty, calculate price based on percentage
			  return {
				...item,
				price: item.value
			  };
			}  else if (item.percentage !== '' && item.salaryComponent._id === "659bbb52d4d7dd6ffd8dfc80" && item.salaryComponent._id !== "659bbb98d4d7dd6ffd8dfc9c") {
				// Calculate price based on basicSalary and IRPrice and DAPrice
				console.log(DAPrice,"DAPriceee");
				console.log(IRPrice,"IrPriceeeeeeeeeeee");
				handleIRPrice();
				handleDaPrice();
				
				return {
					...item,
					price: (((parseFloat(basicSalary) + parseFloat(DAPrice) + parseFloat(IRPrice)) * Number(item.percentage)) / 100).toFixed(2)
				};
			}else if (item.percentage !== '' && item.salaryComponent._id !== "659bbb52d4d7dd6ffd8dfc80"  && item.salaryComponent._id !== "659bbb98d4d7dd6ffd8dfc9c") {
			  // If percentage is empty but value is not empty, set price equal to value
			  return {
				...item,
				price: ((basicSalary * item.percentage) / 100).toFixed(2)
			  };
			} else if (item.percentage !== '' && item.salaryComponent._id === "659bbb98d4d7dd6ffd8dfc9c") {
				// If percentage is empty but value is not empty, set price equal to value
				const subtotal = incrementtable.reduce((acc, item) => {
					// Parse the price to a float value and add it to the accumulator
					return acc + parseFloat(item.price);
				}, 0);
				
				console.log(subtotal.toFixed(2));
				return {
				  ...item,
				  price: (((parseFloat(subtotal) + parseFloat(basicSalary)) * Number(item.percentage)) / 100).toFixed(2)
				};
			  }  else {
			  // If both percentage and value are empty, return the item as is
			  return item; // No changes to the item
			}
		  });
		  SetDecrementTable(newDatade);
	}

	 
  },[incrementtable,basicSalary,DAPrice,IRPrice])

console.log(eligiblePay,"Eligible Pay");
console.log(lossOfPay,"LossOfpay");
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
			totaldeduction:totalAmountd,
			totalcontribution:totalAmountN?totalAmountN:"",
			totalincrement:totalAmount,
			employeeTypeId:employeeTypeId,
			lossOfPay,
			EPFWage,
			EPSWage,
			EDLIWage,
			EPFContri,
			EPSContri,
			EPSEPFDiff,
			tablerow:updatedRow||[],
			absentDays : absentDays,
			totalAmount:(parseFloat(basicSalary)+(totalAmount-totalAmountd)).toFixed(2)
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
			setLossOfPay('');
			setDaysinMonth('');
			setBasicSalaryold('');
			SetIncrementTable([]);
			SetDecrementTable([]);
			SetNilTable([]);
			setEligiblePay('');
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
	console.log(tablerow,"Tablerowwww");
	console.log(DAPrice,"DaPrice");
	console.log(IRPrice,"IrPrice");
	console.log(incrementtable,"incrementtable");
	console.log(decrementtable,"decerementtable");
	console.log(niltable,"Niltable");
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
												value={basicSalaryold} readOnly/>
										</div>
									</div>
									<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Absent <span className="login-danger">*</span></label>
												<input type="number" className="form-control"   value={absentDays} 
											onChange={(event)=> setAbsentDays(event.target.value)}/>
										</div>
									</div>
									<div class="col-sm-4">
									<div className="form-group local-forms">
										<label> N.O Of Days In a Month <span className="login-danger">*</span></label>
												<input type="number" className="form-control"   value={daysinMonth} 
											onChange={(event)=> setDaysinMonth(event.target.value)}/>
										</div>
									</div>
									<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Current month Salary <span className="login-danger">*</span></label>
												<input type="number" className="form-control"   value={basicSalary} 
											onChange={(event)=> setCurrentMonthSalary(event.target.value)}/>
										</div>
									</div>
									<div class="col-sm-4">
									<div className="form-group local-forms">
										<label>Loss Of Pay <span className="login-danger">*</span></label>
												<input type="number" className="form-control"   value={lossOfPay} 
											onChange={(event)=> setLossOfPay(event.target.value)}/>
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
								</div>	
							</div>

				
								<div className="row">
									
											<div className="col-md-12">
											<div className="card invoices-add-card">
												<div className="card-body">
													<div className="invoice-add-table">
											
													<div className="table-responsive">
														<table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
													
														<div className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
														{tablerow.length !== 0 ?<thead>
															<tr>
															<th>No</th>
															<th>Salary Components</th>
															<th>%</th>
															<th>Value</th>
															<th>Total</th>
														
															</tr>
														</thead>:""}
											
														{incrementtable.length !== 0 ? <tbody>
															{incrementtable.map((row, index) => (
															<tr key={row.id+1}>
																<td>
																<input
																type="text"
																className="form-control"
																value={ index + 1} // If row.id exists, use it; otherwise, use index + 2 + 1
																readOnly
																// onChange={(e) => setRowId(index, e.target.value)}
																/>
																</td>
																<td>
																<select
																className="form-control"
																onChange={(event) => handlesalarymasterchange(event, index)}
																value={selectedOptions[index] || ''}
																onClick={handleincrementbtnclick}
															>
														<option value={row._id} key={row._id}>
																{row.salaryComponent.name}
														</option>
														{filteredSalarydatain.map((option,index)=>(
															<option value={option._id} key={option._id}>{option.name}</option>
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

															{incrementtable.length === 0 && (
															SetIncrementTable(prevRows => [...prevRows, {
																id: rowid,
																salaryComponent: '',
																percentage: '',
																value: '',
																price: '',
															}])
														)}
														{/* <tr>
															<td colSpan="5" className="text-end pt-3"><strong>Total Increment:</strong></td>
															<td><input className="form-control" type="number" value={totalAmount} readOnly/>
															</td>
															
															</tr> */}
															<tr>

															</tr>
															<tr>
															<td colSpan="5" className="text-end pt-3"><strong>Gross Salary:</strong></td>
															<td><input className="form-control" type="number" value={(parseFloat(totalAmount) + parseFloat(basicSalary)).toFixed(2)} readOnly/>
															</td>
															
															</tr>
														</tbody>:""}

											         {decrementtable.length !==0 ? <tbody>
													
															{decrementtable.map((row, index) => (
															<tr key={row.id+1}>
																<td>
																<input
																type="text"
																className="form-control"
																value={ index + 1} // If row.id exists, use it; otherwise, use index + 2 + 1
																readOnly
																// onChange={(e) => setRowId(index, e.target.value)}
																/>
																</td>
																<td>
																<select
																className="form-control"
																onChange={(event) => handlesalarymasterchangede(event, index ,row)}
																value={selectedOptionsd[index] || ''}
																onClick={handledecrementbtnclick}
															>
														<option value={row._id} key={row._id}>
																{row.salaryComponent.name}
														</option>
														{filteredSalarydatade.map((option,index)=>(
															<option value={option._id} key={option._id}>{option.name}</option>
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
                                                                        onChange={(e) => handleChangede(index, e.target.value ,row)}
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
																	onChange={(e) => handleSecondInputChangede(index, e.target.value)}
																	
																/>
																</td>
																<td>
																<input type="text" className="form-control" 
																 value={row.price?row .price:''}
															
																 readOnly/>
																</td>
																<td className="add-remove text-end">
																
																	<a href="javascript:void(0);" className="me-2" onClick={handleAddRowd}>
																	<i className="fas fa-plus-circle"></i>
																	</a>
															
															
																	<a href="javascript:void(0);" className="remove-btn" onClick={() => handleRemoveRowd(row.id)}>
																	<i className="fa fa-trash-alt"></i>
																	</a>
																
																</td>
															</tr>
															))}
															
															{decrementtable.length === 0 && (
															SetDecrementTable(prevRows => [...prevRows, {
																id: rowid,
																salaryComponent: '',
																percentage: '',
																value: '',
																price: '',
															}])
														)}
														<tr>
															<td colSpan="5" className="text-end pt-3"><strong>Total Decrement:</strong></td>
															<td><input className="form-control" type="number" value={totalAmountd} readOnly/>
															</td>
															
															</tr>
														</tbody>:""}

														{niltable.length !== 0 ?<tbody>
													
															{niltable.map((row, index) => (
															<tr key={row.id+1}>
																<td>
																<input
																type="text"
																className="form-control"
																value={ index + 1} // If row.id exists, use it; otherwise, use index + 2 + 1
																readOnly
																// onChange={(e) => setRowId(index, e.target.value)}
																/>
																</td>
																<td>
																<select
																className="form-control"
																onChange={(event) => handlesalarymasterchangeNil(event, index)}
																value={selectedOptionsN[index] || ''}
																onClick={handlenilbtnclick}
															>
														<option value={row._id} key={row._id}>
																{row.salaryComponent.name}
														</option>
														{filteredSalarydataNil.map((option,index)=>(
															<option value={option._id} key={option._id}>{option.name}</option>
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
                                                                        onChange={(e) => handleChangeNil(index, e.target.value)}
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
																	onChange={(e) => handleSecondInputChangeNil(index, e.target.value)}
																	
																/>
																</td>
																<td>
																<input type="text" className="form-control" 
																 value={row.price?row .price:''}
															
																 readOnly/>
																</td>
																<td className="add-remove text-end">
																
																	<a href="javascript:void(0);" className="me-2" onClick={handleAddRowNil}>
																	<i className="fas fa-plus-circle"></i>
																	</a>
															
															
																	<a href="javascript:void(0);" className="remove-btn" onClick={() => handleRemoveRowNil(row.id)}>
																	<i className="fa fa-trash-alt"></i>
																	</a>
																
																</td>
															</tr>
															))}
															
															{niltable.length === 0 && (
															SetNilTable(prevRows => [...prevRows, {
																id: rowid,
																salaryComponent: '',
																percentage: '',
																value: '',
																price: '',
															}])
														)}
														<tr>
															<td colSpan="5" className="text-end pt-3"><strong>Total Nil:</strong></td>
															<td><input className="form-control" type="number" value={totalAmountN} readOnly/>
															</td>
															
															</tr>
														</tbody>:""}
														</div>
														<tfoot>
															
															{/* <tr>
															<div class="col-sm-4">
																<td colSpan="4" className='text-end mt-4'></td>
																<input
																className="form-control"
																type="number"
																min={0}
																onChange={(e) => setAbsentDays(e.target.value)}
																value={absentDays}/>
																</div>
															</tr> */}
															<tr>
															
															</tr>
															<tr>
															<div class="col-sm-6">
															<td colSpan="5" className="text-end"><strong>Current Month Total Pay:</strong></td>
															<td><input className="form-control" type="number" value={(parseFloat(basicSalary)+(totalAmount-totalAmountd)).toFixed(2)} readOnly/></td>
															{/* <td><input className="form-control" type="number" value={itemdata?.TotalSalary?itemdata.TotalSalary :TotalSalary}  readOnly/>
															
															</td> */}
															</div>
															</tr>
															{/* <tr>
																<td><input type="text" style={{display:"none"}} value={leaveDifference}/></td>
															</tr> */}
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
										
										</form></div>	}

	
			{ salaryList&&  <div>
		<button className='btn btn-success' onClick={handleAddClick}> Add </button>
			<MemoizedSalaryBill formdata={formdata} setformdata={setformData}/> 	</div>}
		
    </>
  )
}

export default Salarybill