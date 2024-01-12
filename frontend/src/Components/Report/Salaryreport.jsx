import React, { useMemo,useState,useEffect } from 'react'
import PageHeader from '../PageHeader'
import { GetMonthlyReport } from '../../Apicalls/Report';
import { toast } from 'react-toastify';
import { GetSalaryComponent } from '../../Apicalls/salarymaster';
import * as XLSX from 'xlsx';

function Salaryreport() {

    const headerdata = useMemo(()=>{
        return{
            data:"REPORT",
            page:"Salary Monthly Report"
        }
    },[])

    const set1 = ['A', 'B', 'C', 'D'];
  const set2 = ['C', 'D', 'E', 'F'];
  const tableData = ['A', 'B', 'C', 'D'];

  const [matchingElements, setMatchingElements] = useState([]);

  const [salaryComponent,setSalaryComponent]=useState([]);
  const [issalaryComponentDataFetch, setissalaryComponentDataFetch]=useState(false);
  const [fromMonth,setFromMonth]=useState('');
  const [toMonth,setToMonth]=useState('');
  const [Data,setData]=useState('');

  useEffect(()=>{
    salarymasterDataFetch();
  },[Data])

  const salarymasterDataFetch = async()=>{
    try {
      if(!issalaryComponentDataFetch){
        const response=await GetSalaryComponent();
        if(response.success){
					setSalaryComponent(response.data);
				}else{
					setSalaryComponent([]);
				}
			}setissalaryComponentDataFetch(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const foundElements = tableData.filter(
      element => set1.includes(element) && set2.includes(element)
    );
    setMatchingElements(foundElements);
  }, []);


 

  const handlesubmit =async(event)=>{
    event.preventDefault();
  try {
    const formdata = {
      fromMonth : fromMonth,
      toMonth : toMonth,
    }
  const response = await GetMonthlyReport(formdata)
  if (response.success){
    setData(response.data);
    toast.success(response.message)
    }else{
      toast.error(response.message)
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
  
 
   }
   console.log(Data,":;;;;dddddddata");
   console.log(salaryComponent,"salaryComponent");

   const permenantstaff =[]
   const dailywagestaff =[]
   const contractstaff =[]

   if (Data.length > 0) {

   Data.forEach(item => {
    if (item.EmployeeTypeId) {
      if (item.EmployeeTypeId === '6566be7b0085f19cfbfd00c1') {
        permenantstaff.push(item);
      } else if (item.EmployeeTypeId === '659bbd63d4d7dd6ffd8dfd7f') {
        dailywagestaff.push(item);
      }else if(item.EmployeeTypeId === '659cd2f6a247674dda047a1d'){
        contractstaff.push(item);
      }
    }
  });
}else{
  console.error("salaryComponent is not an array");
}
const downloadExcel = (event) => {
  event.preventDefault();

  const worksheet = XLSX.utils.table_to_sheet(document.querySelector('.comman-table'));

  // Set colors for specific columns
  const greyColor = { patternType: 'solid', fgColor: { rgb: 'C0C0C0' } };
  const pinkColor = { patternType: 'solid', fgColor: { rgb: 'FFC0CB' } };

  const columnColors = [
    greyColor, // Color for the first column
    greyColor, // Color for the second column
    greyColor, // Color for the third column
    pinkColor, // Color for the fourth column and onwards
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
    pinkColor,
  ];

  const range = XLSX.utils.decode_range(worksheet['!ref']);

  for (let i = range.s.r; i <= range.e.r; ++i) {
    for (let j = range.s.c; j <= range.e.c; ++j) {
      const cellAddress = XLSX.utils.encode_cell({ r: i, c: j });

      if (worksheet[cellAddress] && worksheet[cellAddress].s && columnColors[j]) {
        worksheet[cellAddress].s = columnColors[j];
      }
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
  XLSX.writeFile(wb, `Report of _${fromMonth} to ${toMonth}.xlsx`);
};


  return (
    <>
    <PageHeader headerdata={headerdata}/>
    {/* <div>
      <table>
        <thead>
          <tr>
            <th>1 Set of Data</th>
            <th>Matching Data</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
              <td>{matchingElements.includes(item) ? item : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
       <div className="card card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                  <div className="col">
                      <div className="doctor-table-blk">
                        <h3> REPORT</h3>
                        <div className="doctor-search-blk">
                          {/* <div className="top-nav-search table-search-blk">
                            <form>
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn" >
                                <img src={searchicon} alt="" />
                              </a>
                            </form>
                          
                          </div> */}
                          <div className="add-groups">
                            {/* <a href="add-doctor.html" className="btn btn-primary add-pluss ms-2">
                           
                              <img src={addicon} alt="" />
                            </a> */}
                            
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-auto  ms-auto">
                      
                      <form >
                        
                            
                        <a type='button' className=" me-2" >
                          {/* <img src={pdficon} alt="" /> */}
                          <input
                          className='form-control'
                            type="date"
                            value={fromMonth}
                            onChange={(e) => setFromMonth(e.target.value)}
                            required
                          />
                        </a>
                        <a type='button'  className=" me-2">
                          {/* <img src={TXticon} alt="" /> */}
                          <input
                            // {...register('toMonth', { required: 'Please select a month' })}
                          className='form-control'
                            type="date"
                            value={toMonth}
                            onChange={(e) => setToMonth(e.target.value)}
                            required
                          />
                          
                          </a>
  
                        <button className=" btn btn-primary submit-form m-3" onClick={handlesubmit}>
                            Submit
                        </button>
                        <button className='btn btn-primary submit-form m-2' onClick={downloadExcel}>Download Excel</button>
                    
                        </form>
                      </div>
                  </div>
                </div>
                {Data.length === 0 ? 
                (<p className='m-3'>No Data Available</p>):(
                    <div className="table-responsive">
                  <table className="table border-0 custom-table comman-table  mb-0 table-responsive">
                    <thead>
                      <tr style={{border:"2px solid"}}>
                       <th  style={{border:"2px solid",textAlign:"center"}} colSpan={7}><div>Employee Master data</div></th>
                       <th  style={{border:"2px solid",textAlign:"center"}} colSpan={(salaryComponent.incrementComponents.length)+1}><div>Pay Item </div></th>
                       <th  style={{textAlign:"center"}} colSpan={(salaryComponent.decrementComponents.length)+1}><div>Deduction</div></th>
                      </tr>
                     
                      <tr>
                          <th  style={{border:"2px solid"}}>SL NO</th>
                          <th style={{border:"2px solid"}}>Employee Name</th>
                          <th style={{border:"2px solid"}}>Employee Type</th>
                          <th style={{border:"2px solid"}}>Basic Pay</th>
                          <th style={{border:"2px solid"}}>N.O Of Days In Month</th>
                          <th style={{border:"2px solid"}}>Loss Of Pay Days</th>
                          <th style={{border:"2px solid"}}>Loss Of Pay</th>
                          <th style={{border:"2px solid"}}>Eligible Pay</th>
                          {/* Headers for increment components */}
                          {salaryComponent.incrementComponents.map((data, index) => (
                            <th key={index} style={{border:"2px solid"}}>{data.name}</th>
                          ))}
                          <th style={{border:"2px solid"}}>Total Earnings</th>
                          {/* Headers for decrement components */}
                          {salaryComponent.decrementComponents.map((data, index) => (
                            <th key={index} style={{border:"2px solid"}}>{data.name}</th>
                          ))}
                          <th style={{border:"2px solid"}}>Total Deduction</th>
                          <th style={{border:"2px solid"}}>Total Net Amount</th>
                        </tr>
                        {permenantstaff.map((data, index) => (
                          <tr key={index}>
                            <td style={{border:"2px solid"}}>{index+1}</td>
                            <td style={{border:"2px solid"}}>{data.name}</td>
                            <td style={{border:"2px solid"}}>{data.EmployeeType}</td>
                            <td style={{border:"2px solid"}}>{data.basicSalary}</td>
                            <td style={{border:"2px solid"}}>{30}</td>
                            <td style={{border:"2px solid"}}>{data.LossOfPayDays}</td>
                            <td style={{border:"2px solid"}}>{data.LossOfPay}</td>
                            <td style={{border:"2px solid"}}>{data.EligiblePay}</td>
                            
                            {/* Matching and rendering increment components */}
                            {salaryComponent.incrementComponents.map((incComponent, incIndex) => {
                              const tableDataMatch = data.tabledata.find(
                                tableItem => tableItem.salaryComponent.name === incComponent.name
                              );
                              return (
                                <td key={incIndex} style={{border:"2px solid"}}>
                                  {tableDataMatch && tableDataMatch.salaryComponent.name === incComponent.name ? tableDataMatch.price : null}
                                </td>
                              );
                            })}
                            
                            <td style={{border:"2px solid"}}>{data.TotalIncrement}</td>
                            
                            {/* Matching and rendering decrement components */}
                            {salaryComponent.decrementComponents.map((decComponent, decIndex) => {
                              const tableDataMatch = data.tabledata.find(
                                tableItem => tableItem.salaryComponent.name === decComponent.name
                              );
                              return (
                                <td key={decIndex} style={{border:"2px solid"}}>
                                  {tableDataMatch && tableDataMatch.salaryComponent.name === decComponent.name ? tableDataMatch.price : null}
                                </td>
                              );
                            })}
                            
                            <td style={{border:"2px solid"}}>{data.TotalDeduction}</td>
                            <td style={{border:"2px solid"}}>{data.TotalGrossSalary}</td>
                          </tr>
                        ))}

                        <tr></tr>
                         {contractstaff.map((data, index) => (
                          <tr key={index}>
                            <td style={{border:"2px solid"}}>{permenantstaff.length+1}</td>
                            <td style={{border:"2px solid"}}>{data.name}</td>
                            <td style={{border:"2px solid"}}>{data.EmployeeType}</td>
                            <td style={{border:"2px solid"}}>{data.basicSalary}</td>
                            <td style={{border:"2px solid"}}>{30}</td>
                            <td style={{border:"2px solid"}}>{data.LossOfPayDays}</td>
                            <td style={{border:"2px solid"}}>{data.LossOfPay}</td>
                            <td style={{border:"2px solid"}}>{data.EligiblePay}</td>
                            {/* Matching and rendering increment components */}
                            {salaryComponent.incrementComponents.map((incComponent, incIndex) => {
                              const tableDataMatch = data.tabledata.find(
                                tableItem => tableItem.salaryComponent.name === incComponent.name
                              );
                              return (
                                <td key={incIndex} style={{border:"2px solid"}}>
                                  {tableDataMatch && tableDataMatch.salaryComponent.name === incComponent.name ? tableDataMatch.price : null}
                                </td>
                              );
                            })}
                            
                            <td style={{border:"2px solid"}}>{data.TotalIncrement}</td>
                            
                            {/* Matching and rendering decrement components */}
                            {salaryComponent.decrementComponents.map((decComponent, decIndex) => {
                              const tableDataMatch = data.tabledata.find(
                                tableItem => tableItem.salaryComponent.name === decComponent.name
                              );
                              return (
                                <td key={decIndex} style={{border:"2px solid"}}>
                                  {tableDataMatch && tableDataMatch.salaryComponent.name === decComponent.name ? tableDataMatch.price : null}
                                </td>
                              );
                            })}
                            
                            <td style={{border:"2px solid"}}>{data.TotalDeduction}</td>
                            <td style={{border:"2px solid"}}>{data.TotalGrossSalary}</td>
                           </tr> 
                          ))}
                          <tr></tr>

                          {dailywagestaff.map((data, index) => (
                          <tr key={index}>
                            <td style={{border:"2px solid"}}>{permenantstaff.length+contractstaff.length+1}</td>
                            <td style={{border:"2px solid"}}>{data.name}</td>
                            <td style={{border:"2px solid"}}>{data.EmployeeType}</td>
                            <td style={{border:"2px solid"}}>{data.basicSalary}</td>
                            <td style={{border:"2px solid"}}>{30}</td>
                            <td style={{border:"2px solid"}}>{data.LossOfPayDays}</td>
                            <td style={{border:"2px solid"}}>{data.LossOfPay}</td>
                            <td style={{border:"2px solid"}}>{data.EligiblePay}</td>
                           {/* Matching and rendering increment components */}
                           {salaryComponent.incrementComponents.map((incComponent, incIndex) => {
                              const tableDataMatch = data.tabledata.find(
                                tableItem => tableItem.salaryComponent.name === incComponent.name
                              );
                              return (
                                <td key={incIndex} style={{border:"2px solid"}}>
                                  {tableDataMatch && tableDataMatch.salaryComponent.name === incComponent.name ? tableDataMatch.price : null}
                                </td>
                              );
                            })}
                            
                            <td style={{border:"2px solid"}}>{data.TotalIncrement}</td>
                            
                            {/* Matching and rendering decrement components */}
                            {salaryComponent.decrementComponents.map((decComponent, decIndex) => {
                              const tableDataMatch = data.tabledata.find(
                                tableItem => tableItem.salaryComponent.name === decComponent.name
                              );
                              return (
                                <td key={decIndex} style={{border:"2px solid"}}>
                                  {tableDataMatch && tableDataMatch.salaryComponent.name === decComponent.name ? tableDataMatch.price : null}
                                </td>
                              );
                            })}
                            
                            <td style={{border:"2px solid"}}>{data.TotalDeduction}</td>
                            <td style={{border:"2px solid"}}>{data.TotalGrossSalary}</td>
                           </tr> 
                          ))}
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                
                </div>
                )}
              </div>
            </div>
    </>
  )
}

export default Salaryreport