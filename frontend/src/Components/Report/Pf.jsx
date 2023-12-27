import React, { useEffect, useState } from 'react'
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

 const [GrossWagetotal,setGrossWageTotal]=useState('');
 const [EPFWagetotal,setEPFWageTotal]=useState('');
 const [EPSWagetotal,setEPSWagetotal]=useState('');
 const [EDLIWagetotal,setEDLIWagetotal]=useState('');
 const [EPFContritotal,setEPFContritotal]=useState('');
 const [EPSContritotal,setEPSContritotal]=useState('');
 const [EPFEPSDIFFtotal,setEPSEPFDifftotal]=useState('');

 useEffect(() => {
  if (Data.length === 0) {
    console.log("haaai");
  } else {
    const sumgrosswage = Data.reduce((total, item) => total + item.totalAmount, 0);
    setGrossWageTotal(sumgrosswage);
    const sumepfwage = Data.reduce((total,item) => total + item.EPFWage,0)
    setEPFWageTotal(sumepfwage)
    const sumepswage = Data.reduce((total, item) => total + item.EPSWage, 0);
    setEPSWagetotal(sumepswage);
    const sumepfcontri = Data.reduce((total,item) => total + item.EPFContri,0)
    setEPFContritotal(sumepfcontri)
    const sumepscontri = Data.reduce((total, item) => total + item.EPSContri, 0);
    setEPSContritotal(sumepscontri);
    const sumedliwage = Data.reduce((total,item) => total + item.EDLIWage,0)
    setEDLIWagetotal(sumedliwage)
    const sumepfepsdiff = Data.reduce((total,item) => total + item.EPSEPFDiff,0)
    setEPSEPFDifftotal(sumepfepsdiff)
  
  }
}, [Data]);




 const downloadExcel = () => {
    const worksheet = XLSX.utils.table_to_sheet(document.querySelector('.comman-table'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
    XLSX.writeFile(wb, `EPFO_${fromMonth} to ${toMonth}.xlsx`);
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
                          <td>{Math.round(item.totalAmount)}</td>
                          <td>{Math.round(item.EPFWage)}</td>
                          <td>{Math.round(item.EPSWage)}</td>
                          <td>{Math.round(item.EDLIWage)}</td>
                          <td>{Math.round(item.EPFContri)}</td>
                          <td>{Math.round(item.EPSContri)}</td>
                          <td>{Math.round(item.EPSEPFDiff)}</td>
                          <td>{0}</td>
                          <td>{0}</td>
                         
                        </tr>
                      ))}
                      <tr></tr>
                     
                      <tr>
                        <td></td>
                        <td></td>
                        <td><strong>Total</strong></td>
                        <td><strong>{Math.round(GrossWagetotal)}</strong></td>
                        <td><strong>{Math.round(EPFWagetotal)}</strong></td>
                        <td><strong>{Math.round(EPSWagetotal)}</strong></td>
                        <td><strong>{Math.round(EDLIWagetotal)}</strong></td>
                        <td><strong>{Math.round(EPFContritotal)}</strong></td>
                        <td><strong>{Math.round(EPSContritotal)}</strong></td>
                        <td><strong>{Math.round(EPFEPSDIFFtotal)}</strong></td>
                      </tr>

                      <tr></tr>
                      <tr></tr>
                      <tr></tr>

                      <tr>
                        <td>A/Cno.01</td>
                        <td>EPF EMPLOYEES CONTRIBUTION</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>{Math.round(EPFContritotal)}</strong></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>EPF EMPLOYERS CONTRIBUTION</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>{Math.round(EPFEPSDIFFtotal)}</strong></td>
                        <td><strong>{Math.round(EPFEPSDIFFtotal+EPFContritotal)}</strong></td>
                      </tr>
                      <tr></tr>
                      <tr></tr>
                      <tr>
                        <td>A/Cno.02</td>
                        <td>ADMINISTRATIVE  CHARGE @.50%</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>OF EPF WAGES {Math.round(EPFWagetotal)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{Math.round((EPFWagetotal * 0.5)/100)}</td>
                      </tr>
                      <tr></tr><tr></tr>
                      <tr>
                        <td>A/Cno.10</td>
                        <td>PENSION FUND 8.33% OF DLI WAGES</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{Math.round(EPSContritotal)}</td>
                      </tr>
                      <tr></tr><tr></tr>
                      <tr>
                        <td>A/Cno.21</td>
                        <td>DLI WAGES 0.50% OF {EDLIWagetotal}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{Math.round((EDLIWagetotal * 0.5)/100)}</td>
                      </tr>
                      <tr></tr><tr></tr>
                      <tr>
                        <td>A/Cno.22</td>
                        <td>ADDITIONAL ADMINISTRATION CHARGE</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>OF {EPFWagetotal}*0.01%</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{Math.round((EPFWagetotal * 0.01)/100)}</td>
                      </tr>
                     
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