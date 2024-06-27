import React,{useEffect, useMemo, useState} from 'react'
import PageHeader from '../PageHeader'

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { getallemployeetype } from '../../Apicalls/Employeetype';
import { getallpost } from '../../Apicalls/Post';
import { getallSalary } from '../../Apicalls/salarymaster';
import { Addemployee, getallemployeemastercount } from '../../Apicalls/EmployeeMater';
import Employeemasterlist from './Employeemasterlist';
import { getallbank } from '../../Apicalls/Bank';
const AddEmployeemaster = () => {
	const [count,setcount]=useState(0)
	const [name, setName] = useState('');
	const [email, setEmail]=useState('');
	const [rowid ,setRowId]=useState('')
	const [rowid1,setRowId1]=useState('')
	const [rowid2 ,setRowId2]=useState('')
	const [phone,setPhone]=useState('');
	const [employeeno, setEmployeeno]=useState('');
	const [address1, setAddress1]=useState('');
	const [address2, setAddress2]=useState('');
	const [address3, setAddress3]=useState('');
	const [pincode,setPincode]=useState('');
	const [bank, setBank]=useState('');
	const [accountno, setAccountno]=useState('');
	const [branch, setBranch]=useState('');
	const [ifsc, setIfsc]=useState('');
	const [panNo,setPanNo]=useState('');
	const [panName, setPanName]=useState('');
	const [dateOfJoining, setDateOfJoining]=useState('');
	const [dateOfBirth,setDateOfBirth]=useState('');
	const [dateOfRetierment,setDateOfRetierment]=useState('');
	const [ageOfRetierment,setAgeOfRetierment]=useState('');
	const [guardianname, setGuardianName]=useState('');
	const [basicsalary, setBasicSalary]=useState('');
	const [allowedLeave, setAllowedLeave]=useState('');
	const [universalAcNo, setUniversalAcNo]=useState('');
	const [Ipnumber, setIPNumber]=useState('');
	const [city, setCity]=useState('');
	const [country, setCountry]=useState('');
	const [password,setPassword]=useState('');
	const [tableRows, settableRows] = useState([])
	const [tableRowsd, settableRowsd] = useState([])
	const [tableRowsN, settableRowsN] = useState([])
	const [percentage, setPercentage]=useState('');
	// const [calculatePercentage, setCalculatePercentage]=useState('')
	const [secondInputValue, setSecondInputValue] = useState('');
	const [employeelist,setemployeelist]=useState(true)
	const [employeeTypeData, setEmployeeTypeData]=useState([]);
	const [employeeTypeId, setEmployeeTypeId]=useState('');
	const [isemployeeTypeDataFetch, setisEmployeeTypeDataFetch]=useState(false);
	const [postData, setPostData]=useState([]);
	const [BankData, setBankData]=useState([]);
	const [postId, setPostId]=useState('');
	const [ispostDataFetched, setIspostDataFetched]=useState(false);
	const [isBankDataFetched, setIsBankDataFetched]=useState(false);
	const [issalarymasterDataFetched, setIsSalarymasterDataFetched]=useState(false);
	const [salarymasterData,setSalarymasterData]=useState([]);
	const [salarymasterId, setSalarymasterId]=useState('');
	const [data , setData]=useState([])





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

  
	const calculateRetirementDate = () => {
		if (dateOfBirth && ageOfRetierment) {
		  const dob = new Date(dateOfBirth);
		  const retirementYear = dob.getFullYear() + parseInt(ageOfRetierment, 10);
	  
		  // Set the retirementDateCalc to the last day of the retirement month
		  const retirementDateCalc = new Date(retirementYear, dob.getMonth() + 1, 0);
	  
		  // Get the local date components and format as YYYY-MM-DD
		  const formattedRetirementDate = `${retirementDateCalc.getFullYear()}-${('0' + (retirementDateCalc.getMonth() + 1)).slice(-2)}-${('0' + retirementDateCalc.getDate()).slice(-2)}`;
	  
		  setDateOfRetierment(formattedRetirementDate);
		} else {
		  setDateOfRetierment('');
		}
	  };
	  
	  
	
	  useEffect(() => {
		calculateRetirementDate();
	  }, [dateOfBirth, ageOfRetierment]);

	  const [totalAmount, setTotalAmount] = useState(0);
	  const [totalAmountd, setTotalAmountd] = useState(0);
	  const [totalAmountN, setTotalAmountN] = useState(0);
	  const [DAPercentage,setDAPercentage]=useState('');
	  const [DAValue,setDAValue]=useState('');
	  const [DAPrice,setDAPrice]=useState(0);
	  const [IRPercentage,setIRPercentage]=useState('');
	  const [IRValue,setIRValue]=useState('');
	  const [IRPrice,setIRPrice]=useState(0);
	  const [EPFWage,setEPFWage]=useState('');
	  const [EPSWage,setEPSWage]=useState('');
	  const [EDLIWage,setEDLIWage]=useState('');
 
	//   const handleDAPercentage = (event)=>{
	// 	 const value= event.target.value;
	// 	 setDAPercentage(value)
	// 	 setDAValue('')
	//    }
	//    const handleDAValue = (event)=>{
	// 	 const value= event.target.value;
	// 	 setDAValue(value)
	// 	 setDAPercentage('')
	//    }
	//    const handleIRPercentage = (event)=>{
	// 	 const value= event.target.value;
	// 	 setIRPercentage(value)
	// 	 setIRValue('')
	//    }
	//    const handleIRValue = (event)=>{
	// 	 const value= event.target.value;
	// 	 setIRValue(value)
	// 	 setIRPercentage('')
	//    }
 
	//   useEffect(() => {
 
		 
	// 	 if (DAPercentage !== 0 && !DAValue) {
	// 	   const price = (basicsalary * DAPercentage) / 100;
	// 	   setDAPrice(price);
	// 	 }
	   
	// 	 else if (DAValue !== 0 && !DAPercentage) {
	// 	   const prices = DAValue;
	// 	   console.log("Priceeeeeeeeeee",prices);
	// 	   setDAPrice(prices);
	// 	 }
 
		 
	// 	 if (IRPercentage !== 0 && !IRValue  ) {
	// 	   const price = (basicsalary * IRPercentage) / 100;
	// 	   setIRPrice(price);
	// 	 }
	   
	// 	 else if (IRValue !== 0 && !IRPercentage) {
	// 	   const prices = IRValue;
	// 	   console.log("Priceeeeeeeeeee",prices);
	// 	   setIRPrice(prices);
	// 	 }
	//    }, [DAPercentage, DAValue, basicsalary,IRPercentage,IRValue]);
	  
 
	  

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

	const handleBankClick= async()=>{
		try{
			if(!isBankDataFetched){
				const response=await getallbank();
				if(response.success){
					setBankData(response.data);
				}else{
					setBankData([]);
				}
			}setIsBankDataFetched(true)
		}catch(error){
			toast.error(error.message);
		}
	};
	const handleBankChange=(event)=>{
		setBank(event.target.value);

	}



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
	

	
	  const [selectedOptions, setSelectedOptions] = useState([]);
	  const [selectedOptionsd, setSelectedOptionsd] = useState([]);
	  const [selectedOptionsN, setSelectedOptionsN] = useState([]);
	  const handlesalarymasterchange = (event, index) => {
		const updatedTableRows = [...tableRows];
		updatedTableRows[index] = {
		  ...updatedTableRows[index],
		  salaryComponent: event.target.value, // Update salaryComponent based on the event value
		  id: Number(index + 2 + 1)
		};
	  
		console.log(updatedTableRows, "ii");
		settableRows(updatedTableRows);
		setSelectedOptions((prevSelectedOptions) => {
		  const updatedOptions = [...prevSelectedOptions];
		  updatedOptions[index] = event.target.value;
		  return updatedOptions;
		});
	  };
	  const handlesalarymasterchangede = (event, index , row) => {
		console.log(event, index,"eveeeeeeeent chnage");
		console.log(row,"eveeeeeeeent chnage rrrrrrrrrrrrrro");
		const updatedTableRows = [...tableRowsd];
		updatedTableRows[index] = {
		  ...updatedTableRows[index],
		  salaryComponent: event.target.value, // Update salaryComponent based on the event value
		  id: Number(index + 2 + 1)
		};
	  
		console.log(updatedTableRows, "ii");
		settableRowsd(updatedTableRows);
		setSelectedOptionsd((prevSelectedOptions) => {
		  const updatedOptions = [...prevSelectedOptions];
		  updatedOptions[index] = event.target.value;
		  return updatedOptions;
		});
	  };
	  const handlesalarymasterchangeNil = (event, index) => {
		const updatedTableRows = [...tableRowsN];
		updatedTableRows[index] = {
		  ...updatedTableRows[index],
		  salaryComponent: event.target.value, // Update salaryComponent based on the event value
		  id: Number(index + 2 + 1)
		};
	  
		console.log(updatedTableRows, "ii");
		settableRowsN(updatedTableRows);
		setSelectedOptionsN((prevSelectedOptions) => {
		  const updatedOptions = [...prevSelectedOptions];
		  updatedOptions[index] = event.target.value;
		  return updatedOptions;
		});
	  };
	  
	  
	//   const handleRowIdChange = (index) => {
	// 	console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhi');
	// 	const updatedTableRowss = [...tableRows];
	// 	updatedTableRowss[index].id = Number(index + 2 + 1); 
	// 	console.log("updatedRoeee",updatedTableRowss);
	// 	console.log(tableRows,":taableerow");
		
	//   };



	const {
		
		register,
		handleSubmit,
		formState: { errors },
		reset,
	  } = useForm({
		criteriaMode: 'all',
		
	  });
	 
	 
	
	  const handleAddRow = () => {
		settableRows((prevRows) => [
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
		settableRows((prevRows) => prevRows.filter((row) => row.id !== id));
	  };
	  const handleAddRowd = () => {
		settableRowsd((prevRows) => [
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
		settableRowsd((prevRows) => prevRows.filter((row) => row.id !== id));
	  };
	  const handleAddRowNil = () => {
		settableRowsN((prevRows) => [
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
		settableRowsN((prevRows) => prevRows.filter((row) => row.id !== id));
	  };


	  useEffect(() => {
		try {
			const totalAmountincrement = tableRows.reduce((acc, row) => {
				const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
				const price = parseFloat(row.price);
				console.log(acc + price, "neeeewprice");
				return acc + price; // Add the price to the accumulator and return it
			}, 0); // Provide an initial value of 0 for the accumulator
			
			console.log(totalAmountincrement,"totttttttttttalneeeewprice"); // This will print the total amount
		
			if (!isNaN(totalAmountincrement)) {
				// Check if the calculated totalAmount is a valid number
				setTotalAmount(totalAmountincrement)
			  } else {
				console.error('Invalid totalAmount:', totalAmount);
			  }
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [ basicsalary,tableRows]);
	
	useEffect(() => {
		try {
			const totaldecrementamount = tableRowsd.reduce((acc, row) => {
				const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
				const price = parseFloat(row.price);
				console.log(acc + price, "neeeewprice");
				return acc + price; // Add the price to the accumulator and return it
			}, 0); // Provide an initial value of 0 for the accumulator
			
			console.log(totaldecrementamount,"totttttttttttalneeeewprice"); // This will print the total amount
		
			if (!isNaN(totaldecrementamount)) {
				// Check if the calculated totalAmount is a valid number
				setTotalAmountd(totaldecrementamount)
			  } else {
				console.error('Invalid totalAmount:', totalAmount);
			  }
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [ basicsalary,tableRowsd]);

	useEffect(() => {
		try {
			const totalNil = tableRowsN.reduce((acc, row) => {
				const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
				const price = parseFloat(row.price);
				console.log(acc + price, "neeeewprice");
				return acc + price; // Add the price to the accumulator and return it
			}, 0); // Provide an initial value of 0 for the accumulator
			
			console.log(totalNil,"totttttttttttalneeeewprice"); // This will print the total amount
		
			if (!isNaN(totalNil)) {
				// Check if the calculated totalAmount is a valid number
				setTotalAmountN(totalNil)
			  } else {
				console.error('Invalid totalAmount:', totalNil);
			  }
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [ basicsalary,tableRowsN]);
	
	//   useEffect(() => {
	// 	try {
	// 	  const totalAmount = tableRowsd.reduce((acc, row) => {
	// 		const salaryType = salarymasterData.find((item) => item._id === row.salaryComponent);
	  
	// 		if (salaryType && (salaryType.type === 'Increment' || salaryType.type === 'Decrement')) {
	// 		  const price = parseFloat(row.price);
	  
	// 		  if (!isNaN(price)) {
	// 			// Check if the parsed price is a valid number
	// 			return acc + (salaryType.type === 'Increment' ? price : -price);
	// 		  } else {
	// 			console.error('Invalid price for row:', row);
	// 		  }
	// 		}
	// 		return acc;
	// 	  }, parseFloat(basicsalary) );
	  
	// 	  if (!isNaN(totalAmount)) {
	// 		// Check if the calculated totalAmount is a valid number
	// 		setTotalAmountd(totalAmount );
	// 	  } else {
	// 		console.error('Invalid totalAmount:', totalAmount);
	// 	  }
	// 	} catch (error) {
	// 	  console.error('Error in useEffect:', error);
	// 	}

	
		
	//   }, [tableRowsd, basicsalary, salarymasterData]);
	console.log(totalAmountN , "....",tableRowsN);
		console.log(totalAmount , "....",totalAmountd);
console.log(tableRows,tableRowsd,tableRowsN);
	  const [incrementbtn,setIncrementbtn]=useState(false)
	  const [decrementbtn,setDecrementbtn]=useState(false);
	  const [nilbtn,setNilbtn]=useState(false);
	  const [filteredSalarydatain,setFilteredSalaryDatain]=useState([]);
	  const [filteredSalarydatade,setFilteredSalaryDatade]=useState([]);
	  const [filteredSalarydataNil,setFilteredSalaryDataNil]=useState([]);

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
			setIncrementbtn(false)
			setDecrementbtn(false)
			setNilbtn(true)
		} catch (error) {
			console.log(error);
		}
	}


	  const handleChange = (index,percentage) => {
		const updatedTableRows = [...tableRows];
        updatedTableRows[index].percentage = Number(percentage);
       // Recalculate the price based on the updated percentage and basic salary
    const newPrice = (Number(basicsalary) * Number(percentage)) / 100;
    updatedTableRows[index].price = newPrice;
    settableRows(updatedTableRows);
	};
	useEffect(()=>{
		handleDaPrice();
		handleIRPrice();
	},[tableRows])

	const handleDaPrice =()=>{
		try {
			const DaPrice = tableRows.find(item => item.salaryComponent === "659bb609d4d7dd6ffd8dfbf3");
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
			const IRPrices = tableRows.find(item => item.salaryComponent === "659bb617d4d7dd6ffd8dfbf7");
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
	const handleChangede = (index,percentage,row) => {
	
		console.log(row,"indexxxxxxxx",percentage,"pppprrrrr");
		if(row.salaryComponent === "659bbb52d4d7dd6ffd8dfc80"){
			handleDaPrice();
			handleIRPrice();	
			const updatedTableRows = [...tableRowsd];
			updatedTableRows[index].percentage = Number(percentage);
			const newsalarys = (parseFloat(basicsalary) + parseFloat(DAPrice?DAPrice:0) + parseFloat(IRPrice?IRPrice:0))

			console.log(tableRows);
		   // Recalculate the price based on the updated percentage and basic salary
		   const newPrice =   (newsalarys * Number(percentage)) / 100;
		updatedTableRows[index].price = newPrice;
		settableRowsd(updatedTableRows);
		}
		else if(row.salaryComponent === "659bbb98d4d7dd6ffd8dfc9c"){
			const updatedTableRows = [...tableRowsd];
			updatedTableRows[index].percentage = Number(percentage);
		   // Recalculate the price based on the updated percentage and basic salary
		   const newPrice =   ((parseFloat(totalAmount) + parseFloat(basicsalary)) * Number(percentage)) / 100;
		   console.log(newPrice,"newpriceeeeeeeeeeeeeeeeeeeeeeeeeeee");
		updatedTableRows[index].price = newPrice;
		settableRowsd(updatedTableRows);
		}
		else{
				const updatedTableRows = [...tableRowsd];
				updatedTableRows[index].percentage = Number(percentage);
			// Recalculate the price based on the updated percentage and basic salary
			const newPrice = (Number(basicsalary) * Number(percentage)) / 100;
			updatedTableRows[index].price = newPrice;
			settableRowsd(updatedTableRows);
			}
		
	};
	const handleChangeNil = (index,percentage) => {
		const updatedTableRows = [...tableRowsN];
        updatedTableRows[index].percentage = Number(percentage);
       // Recalculate the price based on the updated percentage and basic salary
    const newPrice = (Number(basicsalary) * Number(percentage)) / 100;
    updatedTableRows[index].price = newPrice;
    settableRowsN(updatedTableRows);
	};

	

	const handleSecondInputChange = (index,value) => {
		const updatedTableRows = [...tableRows];
		updatedTableRows[index].percentage ='';
		updatedTableRows[index].value = Number(value);
		const newPrice = (value)
		updatedTableRows[index].price = newPrice;
        settableRows(updatedTableRows);
	};
	const handleSecondInputChangede = (index,value) => {
		const updatedTableRows = [...tableRowsd];
		updatedTableRows[index].percentage ='';
		updatedTableRows[index].value = Number(value);
		const newPrice = (value)
		updatedTableRows[index].price = newPrice;
        settableRowsd(updatedTableRows);
	};
	const handleSecondInputChangeNil = (index,value) => {
		const updatedTableRows = [...tableRowsN];
		updatedTableRows[index].percentage ='';
		updatedTableRows[index].value = Number(value);
		const newPrice = (value)
		updatedTableRows[index].price = newPrice;
        settableRowsN(updatedTableRows);
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

	  const resetstate =()=>{
		setName('');
		setEmployeeTypeId('');
		setPostId('');
		setEmail('');
		setPhone('');
		setEmployeeno('');
		setAddress1('');
		setAddress2('');
		setAddress3('');
		// setBank('');
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
		setPassword('')
		setSecondInputValue('');
		setPincode('')
		setAgeOfRetierment('')
		setDateOfRetierment('')
		setAllowedLeave('');
		setIRPercentage('');
		setDAPercentage('');
		setIRValue('');
		setDAValue('');
		setIRPrice('')
		setDAPrice('')
		setIPNumber('');
	  }
	  console.log(resetstate);
	  console.log(tableRowsN ,"ttttttttttttabbbbbbbbbbbbblennnnnnnnnnnnnillllllll");

	  const[updatedRow,setUpdatedRow]=useState('');

	  console.log(tableRows , tableRowsd ,tableRowsN ,"tablerooooooooooooows");
	  useEffect(()=>{
		let updatedrow = [...tableRows, ...tableRowsd, ...tableRowsN];
		let filteredRows = updatedrow.filter(row => row.price !== ''|| 0);

		setUpdatedRow(filteredRows);
				
		  if(updatedRow){
			updatedRow.forEach((row, index) => {
				row.id = index + 1;
			});
		  }
		 
		
		  console.log(updatedRow,":::::::::::::::fffff");
	  },[tableRows,tableRowsN,tableRowsd ]) 
	

	  const onSubmit = async (data) => {
		let updatedrow = [...tableRows, ...tableRowsd, ...tableRowsN];
		let filteredRows = updatedrow.filter(row => row.price !== ''|| 0);

		setUpdatedRow(filteredRows);
				
		  if(updatedRow){
			updatedRow.forEach((row, index) => {
				row.id = index + 1;
			});
		  }

		console.log(tableRows);
		data.employeeid=`ME${count.toString().padStart(3, '0')}`
	     data.EmployeeTypeId=employeeTypeId
		 data.PostId=postId
		 data.previousAllowedleave=allowedLeave
		 data.tablerow=updatedRow
		 data.ageOfRetierment=ageOfRetierment?ageOfRetierment:""
		 data.dateOfRetierment=dateOfRetierment?dateOfRetierment:""
		 data.IRPrice = IRPrice ? IRPrice:""
		 data.DAPrice = DAPrice ? DAPrice:""
		 data.bank = bank 
		 data.TotalSalary=parseFloat(basicsalary)+(totalAmount-totalAmountd)
		 console.log(data,":dataaaa");
		try {
			console.log('Afsal :' , data);
		  const response = await Addemployee(data);
		  console.log(response,"ii");	
		  if (response.success) {
			setcount((prevCount) => prevCount + 1);
			setData(response.data);
			toast.success(response.message);
			resetstate();
			setstate(false)
			setemployeelist(true)
			reset();
		  } else {
			toast.error(response.message);
			
		  }
		} catch (err) {
		  toast.error(err.message);
		}
	  };
	  console.log(rowid,"::rowiddd:");


  

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
													onKeyDown={handlemployeetypeclick}
												onMouseEnter={handlemployeetypeclick}
												onChange={handleemployeetypechange}
												onClick={handleemployeetypechange}
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
												<select className="form-control  select "
												id="inputGroupSelect01"
												onKeyDown={handlePostClick}
													onMouseEnter={handlePostClick}
													onChange={handlePostChange}
												>
													<option>Select Post</option>
													{postData.map((option)=>(
														<option value={option._id} key={option._id} >
															{option.designation}  {option.department.name}  {option.unit.name}
														</option>
													))}
												  </select>
											</div>
										</div>
									
										<div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
													<label>Employee No <span className="login-danger">*</span></label>
														<input
														{...register('employeeno', )}
														type="text"
														className={`form-control `}
														placeholder=""
														value={employeeno}
														onChange={(e) => setEmployeeno(e.target.value)}
														/>
												
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
											<div className="form-group local-forms">
												<label >Pincode <span className="login-danger">*</span></label>
												<input
													{ ...register('pincode', {
													required: 'Pincode is required',
													pattern: {
														value: /^\d{6}$/,
														message: 'Enter a valid pincode'
													}
													})}
													type='number'
													className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
													placeholder=''
												/>
												{errors.pincode && <span className="error-message">{errors.pincode.message}</span>}	
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
													className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
												<label >Bank<span className="login-danger">*</span></label>
												<select className="form-control  select "
												id="inputGroupSelect01"
												onKeyDown={handleBankClick}
													onMouseEnter={handleBankClick}
													onChange={handleBankChange}
												>
													<option>Select Bank</option>
													{BankData.map((option)=>(
														<option value={option._id} key={option._id} >
															{option.name} 
														</option>
													))}
												  </select>
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

                                        <div className="col-12 col-md-6 col-xl-4">
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
										<div className="col-12 col-md-6 col-xl-4">
											<div className="form-group local-forms">
												<label>Age Of Retirement<span className="login-danger">*</span></label>
												<input
												{...register('ageOfRetierment')}
												type="text"
												className={`form-control`}
												placeholder=""
												value={ageOfRetierment}
												onChange={(e) => setAgeOfRetierment(e.target.value)}
												/>
												
											</div>
										</div>
										<div className="col-12 col-md-6 col-xl-4">
											<div className="form-group local-forms">
												<label>Date Of Retirement<span className="login-danger">*</span></label>
												<input
												{...register('dateOfRetierment')}
												type="date"
												className={`form-control`}
												placeholder=""
												value={dateOfRetierment}
												onChange={(e) => setDateOfRetierment(e.target.value)}
												/>
												
											</div>
										</div>
										



										
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>Actual Basic Pay<span className="login-danger">*</span></label>
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
										<div className="col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>IP Number<span className="login-danger">*</span></label>
													<input
													{...register('Ipnumber',)}
													type="text"
													className={`form-control `}
													placeholder=""
													value={Ipnumber} 
													onChange={(e) => {
														const Ipnumbers = e.target.value 
														if (Ipnumbers.length <= 10) {
															setIPNumber(Ipnumbers);
														}
													}}
													/>
												</div>
										</div>
										
										<div className="col-12 col-md-6 col-xl-6">
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

										<div className="col-12 col-md-6 col-xl-6">
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
										
										<div className=" col-12 col-md-6 col-xl-6">
												<div className="form-group local-forms">
													<label>User Password <span className="login-danger">*</span></label>
													<input
													{...register('password')}
													type="text"
													className={`form-control `}
													placeholder=" password for login  mobile application"
											 		value={password}
													onChange={(e) => setPassword(e.target.value)}
													/>
													
												</div>
										</div>
										
										<div className="row">
											<div className="col-md-12">
											<div className="card invoices-add-card">
												<div className="card-body">
													<div className="invoice-add-table">
													<h4>Salary component</h4>
													{/* <a className={incrementbtn?`btn btn-success  m-4`:"btn  btn-outline-success  m-4"} onClick={handleincrementbtnclick}>Increment</a>
													<a className={decrementbtn?`btn btn-danger  m-4`:"btn  btn-outline-danger  m-4"} onClick={handledecrementbtnclick}>Decrement</a>
													<a className={nilbtn?`btn btn-primary  m-4`:"btn  btn-outline-primary  m-4"} onClick={handlenilbtnclick}>Nil</a> */}
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
														{/* <tbody> 
													
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
													

														
														</tbody> */}
														<tbody>
															{tableRows.map((row, index) => (
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
														<option>Select</option>
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

															{tableRows.length === 0 && (
															settableRows(prevRows => [...prevRows, {
																id: rowid,
																salaryComponent: '',
																percentage: '',
																value: '',
																price: '',
															}])
														)}
														<tr>
															<td colSpan="5" className="text-end pt-3"><strong>Total Increment:</strong></td>
															<td><input className="form-control" type="number" value={totalAmount} readOnly/>
															</td>
															
															</tr>
															<tr>

															</tr>
															<tr>
															<td colSpan="5" className="text-end pt-3"><strong>Gross Salary:</strong></td>
															<td><input className="form-control" type="number" value={parseFloat(totalAmount) + parseFloat(basicsalary)} readOnly/>
															</td>
															
															</tr>
														</tbody>

													<tbody>
													
															{tableRowsd.map((row, index) => (
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
														<option>Select</option>
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
															
															{tableRowsd.length === 0 && (
															settableRowsd(prevRows => [...prevRows, {
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
														</tbody>

														<tbody>
													
															{tableRowsN.map((row, index) => (
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
														<option>Select</option>
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
															
															{tableRowsN.length === 0 && (
															settableRowsN(prevRows => [...prevRows, {
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
														</tbody>
														<tfoot>
															
															<tr>
															<td colSpan="5" className="text-end"><strong>Net Pay:</strong></td>
															<td><input className="form-control" type="number" value={parseFloat(basicsalary)+(totalAmount-totalAmountd)} readOnly/>
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

				{employeelist&&<Employeemasterlist   formdata={data} setformdata={setData} />}
   </>
  )
}

export default AddEmployeemaster