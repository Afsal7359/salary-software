import React, { useState } from 'react'
import * as XLSX from 'xlsx';

import { toast } from 'react-toastify';
import { GetPFReport } from '../../Apicalls/Report';
function Pf() {

    const [fromMonth,setFromMonth]=useState('');
    const [toMonth,setToMonth]=useState('');
    const [Data,setData]=useState('');
console.log(fromMonth,toMonth);


const handlesubmit =async(event)=>{
  event.preventDefault();
try {
  const formdata = {
    fromMonth : fromMonth,
    toMonth : toMonth,
  }
const response = await GetPFReport(formdata)
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

console.log(Data,":;;;;dddddddata");
 }

 const downloadExcel = () => {
    const worksheet = XLSX.utils.table_to_sheet(document.querySelector('.comman-table'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  };
  return (
    <>
   <div className="card card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>PF REPORT</h3>
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
                      <tr>
                        <th>SL NO</th>
                        <th>UAN</th>
                        <th>MEMBER NAME</th>
                        <th>GROSS WAGES</th>
                        <th>EPF WAGES</th>
                        <th>EPS WAGES</th>
                        <th>EDLI WAGES</th>
                        <th>EPF CONTRI REMITTED</th>
                        <th>EPS CONTRI REMITTED</th>
                        <th>EPF EPS DIFF REMITTED</th>
                        <th>NCP DAYS</th>
                        <th>REFUND OF ADVANCES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.employeeid.universalAcNo}</td>
                          <td>{item.employeeid.name}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.EPFWage}</td>
                          <td>{item.EPSWage}</td>
                          <td>{item.EDLIWage}</td>
                          <td>{item.EPFContri}</td>
                          <td>{item.EPSContri}</td>
                          <td>{item.EPSEPFDiff}</td>
                          <td>{0}</td>
                          <td>{0}</td>
                         
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
                </div>
                )}
                
              </div>
              {/* <nav aria-label="Page navigation example">
           
           {memoizedData.length > itemsPerPage && (
             <ul className="pagination">
               {Array(Math.ceil(memoizedData.length / itemsPerPage))
                 .fill()
                 .map((_, index) => (
                         <li className="page-item" key={index}>
                           <a className="page-link"  onClick={() => setCurrentPage(index + 1)}>{index + 1}</a>
                           </li>
                     
                  
                 ))}
             </ul>
           )}
        
           </nav> */}
            </div>
    </>
  )
}

export default Pf