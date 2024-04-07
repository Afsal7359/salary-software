import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getallemployeetype } from "../../Apicalls/Employeetype";
import { getallpost } from "../../Apicalls/Post";
import { getallSalary } from "../../Apicalls/salarymaster";
import { editemployeemaster } from "../../Apicalls/EmployeeMater";
import Employeemasterlist from "./Employeemasterlist";
import { getallbank } from "../../Apicalls/Bank";
function EditEmployeeMaster({ closeEdit, item, setData, Data, show, setshow }) {
  console.log(item,"item");
  const [itemdata,setitemdata]=useState(item)
  const [employeeTypeData, setEmployeeTypeData] = useState([]);
  const [employeeTypeId, setEmployeeTypeId] = useState(item.EmployeeTypeId._id);
  const [isemployeeTypeDataFetch, setisEmployeeTypeDataFetch] = useState(false);
  const [postData, setPostData] = useState([]);
  const [isBankDataFetched, setIsBankDataFetched]=useState(false);
  const [BankData, setBankData]=useState([]);
  const [postId, setPostId] = useState("");
  const [ispostDataFetched, setIspostDataFetched] = useState(false);
  const [issalarymasterDataFetched, setIsSalarymasterDataFetched] =useState(false);
  const [salarymasterData, setSalarymasterData] = useState([]);
   const [employeeid, setEmployeeId] = useState(item?.employeeid);
   const [name, setName] = useState(item?.name);
   const [email, setEmail] = useState(item?.email);
   const [phone, setPhone] = useState(item?.phone);
   const [employeeno, setEmployeeno] = useState(item?.employeeno);
   const [address1, setAddress1] = useState(item?.address1);
   const [address2, setAddress2] = useState(item?.address2);
   const [address3, setAddress3] = useState(item?.address3);
   const [pincode,setPincode]=useState(item?.pincode);
   const [dateOfRetierment,setDateOfRetierment]=useState(item?.dateOfRetierment);
	const [ageOfRetierment,setAgeOfRetierment]=useState(item?.ageOfRetierment);
   const [bank, setBank] = useState(item?.bank.name);
   const [bankid, setBankid] = useState(item?.bank._id);
   const [accountNo, setAccountno] = useState(item?.accountNo);
   const [branch, setBranch] = useState(item?.branch);
   const [ifsc, setIfsc] = useState(item?.ifsc);
   const [panNo, setPanNo] = useState(item?.panNo);
   const [panName, setPanName] = useState(item?.panName);
   const [dateOfJoining, setDateOfJoining] = useState(item?.dateOfJoining);
   const [dateOfBirth, setDateOfBirth] = useState(item?.dateOfBirth);
   const [guardianname, setGuardianName] = useState(item?.guardianName);
   const [basicSalary, setBasicSalary] = useState(item?.basicSalary);
   const [universalAcNo, setUniversalAcNo] = useState(item?.universalAcNo);
   const [Ipnumber, setIPNumber] = useState(item?.Ipnumber);
   const [city, setCity] = useState(item?.city);
   const [country, setCountry] = useState(item?.country);
   const [tabledata, setTabledata] = useState(item?.tableRow);
   const [TotalSalary, setTotalSalary] = useState(item?.TotalSalary);
   const [gender, setGender] = useState(item?.gender);
   const [allowedleave,setAllowedLeave]=useState(item?.allowedleave);
   const [employelist, setEmployelist] = useState(false);
   const [editemployee, setEditemployee] = useState(true);
  //  const [percentage, setPercentage] = useState("");
  //  const [calculatePercentage, setCalculatePercentage] = useState("");
  //  const [secondInputValue, setSecondInputValue] = useState("");
   const [formdata, setFormdata] = useState("");
   const [itemid, setitemid] = useState(item._id);
   const [tablerow, setTablerow] = useState(item?item.tablerow:"");
  const [oldtablerow,setOldTablerow]=useState(item?item.tablerow:"");
console.log(oldtablerow,"llllll");
   const [password, setPassword] = useState(item?.password);

   const [totalAmount, setTotalAmount] = useState(0);
   const [totalAmountd, setTotalAmountd] = useState(0);
   const [totalAmountN, setTotalAmountN] = useState(0);


   
	const [EPFWage,setEPFWage]=useState("");
	const [EPSWage,setEPSWage]=useState("");
	const [EPSContri,setEPSContri]=useState("");
	const[EPFContri,setEPFContri]=useState("");
	const[EPSEPFDiff,setEPSEPFDiff]=useState("");
	const [EDLIWage, setEDLIWage]=useState("");
	const [incrementtable,SetIncrementTable]=useState([])
	const [decrementtable,SetDecrementTable]=useState([]);
	const [niltable,SetNilTable]=useState([]);
  const [IRPrice,setIRPrice]=useState(0);
  const [DAPrice,setDAPrice]=useState(0);

  useEffect(()=>{
    const incrementData = tablerow.filter(e =>e.salaryComponent.type === "Increment")
		const decrementData = tablerow.filter(e =>e.salaryComponent.type === "Decrement")
		const nilData = tablerow.filter(e =>e.salaryComponent.type === "nil")
		console.log(incrementData,"Increment Data....");
		console.log(decrementData,"Decrement Data....");
		console.log(nilData,"Nil Data....");
		SetIncrementTable(incrementData)
		SetDecrementTable(decrementData)
		SetNilTable(nilData)
  },[tablerow])
  	  

  const[updatedRow,setUpdatedRow]=useState('');

  const handlemployeetypeclick = async () => {
    try {
      if (!isemployeeTypeDataFetch) {
        const response = await getallemployeetype();
        if (response.success) {
          setEmployeeTypeData(response.data);
        } else {
          setEmployeeTypeData([]);
        }
      }

      setisEmployeeTypeDataFetch(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

 
  const handleemployeetypechange = (event) => {
    setEmployeeTypeId(event.target.value);
    console.log(employeeTypeId,"iddddddddd");
   
  };



  const handlePostClick = async () => {
    try {
      if (!ispostDataFetched) {
        const response = await getallpost();
        if (response.success) {
          setPostData(response.data);
        } else {
          setPostData([]);
        }
      }
      setIspostDataFetched(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlePostChange = (event) => {
    setPostId(event.target.value);
  };

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
		setBankid(event.target.value);

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
  };setSalarymasterData

  useEffect(()=>{
	handlesalarymasterclick()
  },[])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsd, setSelectedOptionsd] = useState([]);
  const [selectedOptionsN, setSelectedOptionsN] = useState([]);


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
          setIr(0)
        }else{
          setIRPrice(IRPrices.price?IRPrices.price:0)
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      handleDaPrice();
      handleIRPrice();
    },[tablerow,incrementtable,decrementtable])

    

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
  
  
   


    const handleBasicSalaryChange = (newBasicSalary) => {
      setBasicSalary(newBasicSalary);
      // Recalculate prices for all rows based on the new basicSalary
      const updatedTablerow = tablerow.map((row) => {
        // Calculate the new price based on percentage and fallback to value if percentage is not available
        const newPrice = Number(row.percentage || 0)
          ? (Number(newBasicSalary) * Number(row.percentage)) / 100
          : Number(row.value || 0);
        return { ...row, price: newPrice };
      });
    
      setTablerow(updatedTablerow);
    };
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
      
      } catch (error) {
        console.log(error);
      }
    }

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


// useEffect(() => {
// try {
//   const totalAmount = tablerow.reduce((acc, row) => {
//     const salaryType = salarymasterData.find(
//       (item) =>
//         item._id === row.salaryComponent?._id || item._id === row.salaryComponent
//     );

//     if (salaryType && (salaryType.type === 'Increment' || salaryType.type === 'Decrement')) {
//       const price = parseFloat(row.price);

//       if (!isNaN(price)) {
//         // Check if the parsed price is a valid number
//         return acc + (salaryType.type === 'Increment' ? price : -price);
//       } else {
//         console.error('Invalid price for row:', row);
//       }
//     }
//     return acc;
//   }, parseFloat(basicSalary) );

//   if (!isNaN(totalAmount)) {
//     // Check if the calculated totalAmount is a valid number
//     setitemdata({
//       ...itemdata,
//       TotalSalary: totalAmount,
//     });
//     console.log(totalAmount,":ToptalAmount");
//   } else {
//     console.error('Invalid totalAmount:', totalAmount);
//   }
// } catch (error) {
//   console.error('Error in useEffect:', error);
// }
//   }, [tablerow, basicSalary, salarymasterData,]);

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
      setTotalAmount(totalAmountincrement)
      } else {
      console.error('Invalid totalAmount:', totalAmount);
      }
  } catch (error) {
    console.error('Error in useEffect:', error);
  }
}, [ basicSalary,incrementtable]);

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
      setTotalAmountd(totaldecrementamount)
      } else {
      console.error('Invalid totalAmount:', totalAmount);
      }
  } catch (error) {
    console.error('Error in useEffect:', error);
  }
}, [ basicSalary,decrementtable]);

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
      setTotalAmountN(totalNil)
      } else {
      console.error('Invalid totalAmount:', totalNil);
      }
  } catch (error) {
    console.error('Error in useEffect:', error);
  }
}, [ basicSalary,decrementtable]);


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
 
  const handleclicktable = () => {
    setEditemployee(false);
    setEmployelist(true);
  };

  // const [firstrow,setFirstRow] =useState([
	// 	{
	// 		id:101,
	// 		salaryComponent:"659bb609d4d7dd6ffd8dfbf3",
	// 		percentage:DAPercentage?DAPercentage:"",
	// 		value:DAValue?DAValue:"",
	// 		price:DAPrice
	// 	},
	// 	{
	// 		id:102,
	// 		salaryComponent:"659bb617d4d7dd6ffd8dfbf7",
	// 		percentage:IRPercentage?IRPercentage:"",
	// 		value:IRValue?IRValue:"",
	// 		price:IRPrice
	// 	}
	//   ])
    // useEffect(()=>{
    //   firstrow[0].value = DAValue
    //   firstrow[0].percentage = DAPercentage
    //   firstrow[1].value = IRValue
    //   firstrow[1].percentage = IRPercentage
    //   firstrow[0].price = DAPrice
    //   firstrow[1].price = IRPrice
    // },[DAValue,DAPercentage,IRPercentage,IRValue,DAPrice,IRPrice])
    
    

	   console.log(tablerow,"tableeeeeeeeeeerow:"); 
    // useEffect(() => {
    //   if (tablerow && tablerow.length > 0 && !tablerow[0].price) {
    //     setUpdatedRow([...firstrow.map(row => ({ ...row }))]); 
    //   } else if (tablerow && tablerow.length > 0 && tablerow[0].price > 0) {
    //     setUpdatedRow([...firstrow.map(row => ({ ...row })), ...tablerow.map(row => ({ ...row }))]);
    //   }
    //   }, [tablerow,DAPrice,IRPrice]);
    useEffect(()=>{
      handleUpdatedRow();
    },[incrementtable,decrementtable,niltable])

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
      const formData = {
        name,
        email,
        phone,
        gender,
        employeeno,
        address1,
        address2,
        address3,
        pincode,
        bank:bankid,
        accountNo,
        ifsc,
        branch,
        panNo,
        panName,
        dateOfJoining,
        dateOfBirth,
        ageOfRetirement:ageOfRetierment,
        dateOfRetirement: dateOfRetierment,
        guardianname,
        basicSalary,
      allowedleave,
      previousAllowedleave:allowedleave,
        universalAcNo,
        Ipnumber,
        city,
        country,
        password,
        tablerow:updatedRow?updatedRow:[],
        TotalSalary:itemdata.TotalSalary
      };
      console.log(updatedRow,":UpdatedRowww");

console.log(tabledata,":tabledaataa");
console.log(tablerow,":Taableroow");
console.log(formData,":Formdataaaa");


    const handleclick = async (event) => {
    event.preventDefault();

    const updatedData = Data.map((dataItem) => {
      if (dataItem._id === item._id) {
        return { ...dataItem, name: formData.name }; // Update the relevant field here
      }
      return dataItem;
    });
    setData(updatedData);

    formData._id = itemid;
  
    try {
      // // const tablerowValue = formData.tablerow?.price;
      // // if (!tablerowValue) {
      // //   toast.error("Add atl ")
      // //   return;
      // // }
      // // console.log(formData,"dataaaaaaaaaaashahid");
      // formData.updatedRow = (updatedRow && Array.isArray(updatedRow) && updatedRow.length === 1 &&
      // updatedRow[0].value === '' &&
      // updatedRow[0].percentage === '' &&
      // updatedRow[0].price === '')
      // ? []
      // : (updatedRow || []);
      
      const response = await editemployeemaster(formData);
      if (response.success) {
        toast.success(response.message);
        setEditemployee(false);
        setEmployelist(true);
        // Update any state or flags to manage component visibility
        // For example, setVisibility(false);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

console.log(employeeTypeId,":employeetypeid");



  return (
    <div>
      {editemployee && (
        <div>
          <button
            className="btn btn-primary submit-form mb-3  "
            onClick={handleclicktable}
          >
            View Table
          </button>
          <div className="row">
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
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={employeeid}
                            style={{ backgroundColor: "#cbd0d6" }}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Name <span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Employee Type<span className="login-danger">*</span>
                          </label>

                          <select
                            className="form-control select"
                            onKeyDown={handlemployeetypeclick}
                            onMouseEnter={handlemployeetypeclick}
                            onChange={handleemployeetypechange}
                            onclick={handleemployeetypechange}
                          >
                            <option value={employeeTypeId}>
                              {item.EmployeeTypeId.name}
                            </option>
                            {employeeTypeData.map((option) => (
                              <option value={option._id} key={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Post<span className="login-danger">*</span>
                          </label>

                          <select
                            className="form-control select  "
                            onKeyDown={handlePostClick}
                            onMouseEnter={handlePostClick}
                            onChange={handlePostChange}
                          >
                            <option value={item.PostId._id}>
                              {item.PostId.designation}
                            </option>
                            {postData.map((option) => (
                              <option value={option._id} key={option._id}>
                                {option.designation}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Employee No <span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Address-1 <span className="login-danger">*</span>
                          </label>

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
                        <div className="form-group local-forms">
                          <label>
                            Address-2 <span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Address-3 <span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Pincode <span className="login-danger">*</span>
                          </label>

                          <input
                            value={pincode}
                            className={`form-control`}
                            type="number"
                            placeholder=""
                            onChange={(e) => setPincode(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group select-gender">
                          <label className="gen-label">
                            Gender<span className="login-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                name={gender}
                                className="form-check-input mt-0"
                                value="Male"
                                onChange={(e) => setGender(e.target.value)}
                                checked={gender === "Male"}
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
                                checked={gender === "Female"}
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
                                checked={gender === "Others"}
                              />
                              Others
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Phone <span className="login-danger">*</span>
                          </label>

                          <input
                            value={phone}
                            className={`form-control`}
                            type="number"
                            placeholder=""
                            onChange={(e) => {
                              const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                              if (onlyNumbers.length <= 10) {
                              setPhone(onlyNumbers);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Bank<span className="login-danger">*</span>
                          </label>

                          <select
                            className="form-control select  "
                            onKeyDown={handleBankClick}
                            onMouseEnter={handleBankClick}
                            onChange={handleBankChange}
                          >
                            <option value={bank}>
                              {item.bank.name}
                            </option>
                            {BankData.map((option) => (
                              <option value={option._id} key={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Account No<span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Branch<span className="login-danger">*</span>
                          </label>

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
                          <label>
                            IFSC<span className="login-danger">*</span>
                          </label>

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
                          <label>
                            PAN No<span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Pan Name<span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Guardian Name<span className="login-danger">*</span>
                          </label>

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
                          <label>
                            Date Of Joining
                            <span className="login-danger">*</span>
                          </label>

                          <input
                            onChange={(e) => setDateOfJoining(e.target.value)}
                            className={`form-control `}
                            type="date"
                            placeholder=""
                            value={dateOfJoining}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Date Of Birth<span className="login-danger">*</span>
                          </label>

                          <input
                            className={`form-control`}
                            type="date"
                            placeholder=""
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Age Of Retirement<span className="login-danger">*</span>
                          </label>

                          <input
                            className={`form-control`}
                            type="text"
                            placeholder=""
                            value={ageOfRetierment}
                            onChange={(e) => setAgeOfRetierment(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                          <label>
                            Date Of Retirement<span className="login-danger">*</span>
                          </label>

                          <input
                            className={`form-control`}
                            type="date"
                            placeholder=""
                            value={dateOfRetierment}
                            onChange={(e) => setDateOfRetierment(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Basic Salary<span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder=""
                            value={basicSalary}
                            onChange={(e) => handleBasicSalaryChange(e.target.value)}
                          />
                        </div>
                      </div>

					            <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                           Allowed Leave<span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder=""
                            value={allowedleave}
                            onChange={(e) => setAllowedLeave(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Universal Account Number
                            <span className="login-danger">*</span>
                          </label>
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
                          <label>
                            Ip Number
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            onChange={(e) => {
                              const Ipnumbers = e.target.value 
                              if (Ipnumbers.length <= 10) {
                                setIPNumber(Ipnumbers);
                              }
                            }}
                            className={`form-control`}
                            type="text"
                            placeholder=""
                            value={Ipnumber}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            City <span className="login-danger">*</span>
                          </label>
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
                          <label>
                            Country <span className="login-danger">*</span>
                          </label>
                          <input
                            onChange={(e) => setCountry(e.target.value)}
                            className={`form-control`}
                            type="text"
                            placeholder=""
                            value={country}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`form-control`}
                            type="text"
                            placeholder=""
                            value={password}
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
																		className={`form-control `}
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
																		className={`form-control `}
																		placeholder="%"
																		// onChange={handleChange}
																		// value={percentage}
																		value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e) => handleChangede(index, e.target.value ,row)}
																		/>
																	
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
																		className={`form-control `}
																		placeholder="%"
																		// onChange={handleChange}
																		// value={percentage}
																		value={row.percentage ? row.percentage : ''}
                                                                        onChange={(e) => handleChangeNil(index, e.target.value)}
																		/>
																	
																		
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
                                    <tfoot>
                                      <tr>
                                        <td colSpan="5" className="text-end">
                                          <strong>Total Amount:</strong>
                                        </td>
                                        <td>
                                          <input
                                            className="form-control"
                                            type="number"
                                           value={itemdata?.TotalSalary}
                                            readOnly
                                          />
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
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            Submit
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary cancel-form"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {employelist && (
        <Employeemasterlist formdata={formdata} setformdata={setFormdata} />
      )}
    </div>
  );
}

export default EditEmployeeMaster;
