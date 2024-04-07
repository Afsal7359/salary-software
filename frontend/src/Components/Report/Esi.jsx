import React,{useState,useEffect, useMemo} from 'react'
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { GetESIReport } from '../../Apicalls/Report';
import PageHeader from '../PageHeader';

function Esi() {
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [Data, setData] = useState([]);
  const [lastworkday, setLastWorkDay] = useState('');
  const [tablerow, setTablerow] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');


  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const formdata = {
        fromMonth: fromMonth,
        toMonth: toMonth,
      };
      const response = await GetESIReport(formdata);
      if (response.success) {
        setData(response.data);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    // Add more options here as needed...
  ];

  const headerdata = useMemo(() => {
		return {
		  data:"REPORT",
		  page:"ESI REPORT"
		};
	  }, []);


  // const handleSelectChanges = (index, value) => {
  // console.log(value);
  //   setTablerow(prevRows => {
  //     const updatedRows = prevRows.map((row, i) => {
  //       if (i === index) {
  //         return { ...row, selectedValue: value };
  //       }
  //       return row;
  //     });
  //     return updatedRows;
  //   });
  // };
  const handleSelectChange = (index, value) => {
    setTablerow(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        selectedValue: value
      };
      return updatedRows;
    });
  };

  const handleDateChange = (index, value) => {
    setTablerow(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        lastworkday: value
      };
      return updatedRows;
    });
  };

  console.log(tablerow,":tablerow");

  useEffect(()=>{
    if (Data&&tablerow) {
      const combinedArray = Data.map((row, index) => ({
        ...row,
        ...tablerow[index]
      }));
      setData(combinedArray)
      console.log(combinedArray,":Combined Arrayys");
    } else {
      console.error('Arrays are of different lengths. Cannot combine.');
    }
  
  },[tablerow,selectedValue])

const downloadExcel = () => {
    const worksheet = XLSX.utils.table_to_sheet(document.querySelector('.comman-tabless'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
    XLSX.writeFile(wb, `EPFO_${fromMonth} to ${toMonth}.xlsx`);
  };

  return (
    <>
    <PageHeader headerdata={headerdata}/>
         <div className="card card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>ESI REPORT</h3>
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
                  <table className="table border-0 custom-table comman-table mb-0 table-responsive">
                    <thead>
                      <tr>
                        <th>SL NO</th>
                        <th>IP NUMBER</th>
                        <th>IP NAME</th>
                        <th>EMPLOYEE TYPE</th>
                        <th>No of Days for which wages paid/payable during the month</th>
                        <th>Total Monthly Wages</th>
                        <th> Reason Code for Zero workings days</th>
                        <th>Last Working Day</th>
                        <th>Employee Contribution</th>
                        <th>Employer Contribution</th>
                        <th>TOTAL ESI</th>
                      </tr>
                    </thead>
                       <tbody>
                    {Data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.employeeid && item.employeeid.Ipnumber}</td>
                          <td>{item.employeeid && item.employeeid.name}</td>
                          <td>
                            {item.employeeid && item.employeeid.EmployeeTypeId
                              ? item.employeeid.EmployeeTypeId.name
                              : ''}
                          </td>
                          <td></td>
                          <td></td>
                          <td> <select
                           className='form-control'
                               type="text"
                               value={item.selectedValues} // Bind input value to selectedValue
                               onChange={(e) => handleSelectChange(index, e.target.value)}
                             >
                            <option value="">Select reason code</option>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          </td>
                            <td>
                              <input
                               className='form-control'
                               type="date"
                               onChange={(e) => handleDateChange(index, e.target.value)}
                            />
                            </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                  <table className="table border-0 custom-table comman-tabless  mb-0 table-responsive d-none">
                    <thead>
                      <tr>
                        <th>SL NO</th>
                        <th>IP NUMBER</th>
                        <th>IP NAME</th>
                        <th>EMPLOYEE TYPE</th>
                        <th>No of Days for which wages paid/payable during the month</th>
                        <th>Total Monthly Wages</th>
                        <th> Reason Code for Zero workings days</th>
                        <th>Last Working Day</th>
                        <th>Employee Contribution</th>
                        <th>Employer Contribution</th>
                        <th>TOTAL ESI</th>
                      </tr>
                    </thead>
                 
                       <tbody>
                    {Data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.employeeid && item.employeeid.Ipnumber}</td>
                          <td>{item.employeeid && item.employeeid.name}</td>
                          <td>
                            {item.employeeid && item.employeeid.EmployeeTypeId
                              ? item.employeeid.EmployeeTypeId.name
                              : ''}
                          </td>
                          <td></td>
                          <td></td>
                          <td>{item.selectedValue?item.selectedValue:""}</td>
                          <td>{item.lastworkday?item.lastworkday:""}</td>
                            
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
                      )}  
                
              </div>
              
            </div>
    </>
  )
}

export default Esi