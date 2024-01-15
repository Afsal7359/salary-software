import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../PageHeader'
import { getallbankAccount } from '../../Apicalls/BankAccount'
import { toast } from 'react-toastify'
import { GetESIReport } from '../../Apicalls/Report'
import * as XLSX from 'xlsx';
import { getallUnite } from '../../Apicalls/Unit'

const Bankreport = () => {

    const headerdata = useMemo(()=>{
        return{
            data:"REPORT",
            page:"BANK REPORT"
        }
    })
    const [fromMonth,setFromMonth]=useState('');
    const [toMonth,setToMonth]=useState('');
    const [Bank,setBank]=useState([]);
    const [ selectBankAcNo,setSelectedBankAcNo]=useState('')
    const [Data,setData]=useState([]);
    const [Unit,setUnit]=useState([]);

    const handlesubmit =async(event)=>{
        event.preventDefault();
      try {
        if(!selectBankAcNo){
            toast.error("Please Select a Bank ");
        }else{
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
        }
      
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
       }

       useEffect(() => {
        async function fetchData() {
          try {
            const result = await getallbankAccount();
            setBank(result.data);
            const Unitresult = await getallUnite();
            setUnit(Unitresult.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, []);
console.log(Bank,"Bank");
console.log(selectBankAcNo,"bankAccountnumber");
console.log(Data,"dataaaa");
console.log(Unit,"UnitData");

const handleBankChange =(event)=>{
    setSelectedBankAcNo(event.target.value)
}
       
const downloadExcel = () => {
    // Get the table element
    const table = document.querySelector('.download-Excel');

    // Convert the table to worksheet
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');

    // Customize formatting options
    const ws = wb.Sheets['Sheet1'];

    // Example: Set column width for columns A to D
    ws['!cols'] = [{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },];

    // Iterate through the cells to format them
    Object.keys(ws).forEach((cell) => {
        if (cell.startsWith('A') || cell.startsWith('B') || cell.startsWith('C') || cell.startsWith('D') ||cell.startsWith('E') ||cell.startsWith('F') ||cell.startsWith('G') ||cell.startsWith('H') || cell.startsWith('I') ||cell.startsWith('J') ||cell.startsWith('K') ||cell.startsWith('L') || cell.startsWith('M')|| cell.startsWith('N')|| cell.startsWith('O')|| cell.startsWith('P')|| cell.startsWith('Q')|| cell.startsWith('R')|| cell.startsWith('S')|| cell.startsWith('T')|| cell.startsWith('U')|| cell.startsWith('V')|| cell.startsWith('W')|| cell.startsWith('X')|| cell.startsWith('Y')|| cell.startsWith('Z')|| cell.startsWith('AA')|| cell.endsWith('AB')) {
            // Example: Set the number format for columns A to D to '0'
            ws[cell].z = '0';

            // Example: Set the font size for columns A to D to 12
            ws[cell].s = { font: { sz: 12 } };
        }
    });
       // Iterate through the cells to format them
       Object.keys(ws).forEach((cell) => {
        const columnIndex = XLSX.utils.decode_col(cell.replace(/\D/g, ''));

        if (columnIndex >= 1 && columnIndex <= 27) {
            // Set the number format for columns A to AB to '@' (text)
            ws[cell].z = '@';

            // Set the font size for columns A to AB to 12
            ws[cell].s = { font: { sz: 12 } };
        }
    });

    // Save the workbook to a file
    XLSX.writeFile(wb, `Bank-Report_${fromMonth} to ${toMonth}.xlsx`);
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
                        <h3>Bank Report</h3>
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
                        {/* <input
                        className='form-control'
                          type="date"
                          value={fromMonth}
                          onChange={(e) => setFromMonth(e.target.value)}
                          required
                        /> */}
                        <select className="form-control select" onChange={handleBankChange} required>
                            <option>select Bank </option>
                            {Bank.map((option)=>(
                                <option value={option.accountNo} key={option._id}>{option.BankId.name}</option>
                            ))}
                        </select>
                      </a>    
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
                    <div className="table-responsive download-Excel">
                  <table className="table border-0 custom-table comman-table mb-0 table-responsive">
                    <thead>
                      <tr>
                      <th>SL NO</th>
                        <th>Dr Acct</th>
                        <th>Amount</th>
                        <th>Beneficiary IFSC</th>
                        <th>Tran Particular</th>
                        <th>Benef Cust AcctID</th>
                        <th>Benef Cust Name</th>
                        <th>Benf Cust Addr1</th>
                        <th>Benef Cust Addr2</th>
                        <th>Benf Cust Addr3</th>
                        <th>Ordering Bank Code</th>
                        <th>Ordering Branch Code</th>
                        <th>Ordering Inst ID</th>
                        <th>Ordering Inst Name</th>
                        <th>OrdInst Addr1</th>
                        <th>OrdInst Addr2</th>
                        <th>OrdInst Addr3</th>
                        <th>Payment Detail1 (email)</th>
                        <th>Payment Detail2</th>
                        <th>Payment Detail3</th>
                        <th>Payment Detail4</th>
                        <th>Sender Receiver Info1</th>
                        <th>Sender Receiver Info2</th>
                        <th>Sender Receiver Info3</th>
                        <th>Sender Receiver Info4</th>
                        <th>Sender Receiver Info5</th>
                        <th>Sender Receiver Info6</th>
                        <th>Charge Acct</th>
                      </tr>
                    </thead>
                       <tbody>
                    {Data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{selectBankAcNo}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.employeeid.ifsc}</td>
                          <td>Salary</td>
                          <td>{item.employeeid.accountNo}</td>
                          <td>{item.employeeid.name}</td>
                          <td>{item.employeeid.bank}</td>
                          <td>{item.employeeid.branch}</td>
                          <td></td>
                          <td>O49</td>
                          <td>16686</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>emlmarketing@marketfed.com</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>/FAST/</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>{selectBankAcNo}</td>
                        </tr>
                      ))}
                      <tr></tr>
                      <tr></tr>
                      <tr></tr>
                      <tr></tr>
                      
                    </tbody>
                    </table>
              
                  {Unit.map((data, index) => (
                           <table  className="table border-0 custom-table comman-table mb-0 table-responsive">
                          <thead key={index}>
                            <tr key={index}>
                              <th>
                                <h4>{data.name}</h4>
                              </th>
                            </tr>
                            <tr>
                      <th>SL NO</th>
                        <th>Dr Acct</th>
                        <th>Amount</th>
                        <th>Beneficiary IFSC</th>
                        <th>Tran Particular</th>
                        <th>Benef Cust AcctID</th>
                        <th>Benef Cust Name</th>
                        <th>Benf Cust Addr1</th>
                        <th>Benef Cust Addr2</th>
                        <th>Benf Cust Addr3</th>
                        <th>Ordering Bank Code</th>
                        <th>Ordering Branch Code</th>
                        <th>Ordering Inst ID</th>
                        <th>Ordering Inst Name</th>
                        <th>OrdInst Addr1</th>
                        <th>OrdInst Addr2</th>
                        <th>OrdInst Addr3</th>
                        <th>Payment Detail1 (email)</th>
                        <th>Payment Detail2</th>
                        <th>Payment Detail3</th>
                        <th>Payment Detail4</th>
                        <th>Sender Receiver Info1</th>
                        <th>Sender Receiver Info2</th>
                        <th>Sender Receiver Info3</th>
                        <th>Sender Receiver Info4</th>
                        <th>Sender Receiver Info5</th>
                        <th>Sender Receiver Info6</th>
                        <th>Charge Acct</th>
                      </tr>
                          </thead>
                          <tbody>
                            {Data.filter(employee => employee.unitid._id === data._id).map((item, index) => (
                               <tr key={index}>
                               <td>{index + 1}</td>
                               <td>{selectBankAcNo}</td>
                               <td>{item.totalAmount}</td>
                               <td>{item.employeeid.ifsc}</td>
                               <td>Salary</td>
                               <td>{item.employeeid.accountNo}</td>
                               <td>{item.employeeid.name}</td>
                               <td>{item.employeeid.bank}</td>
                               <td>{item.employeeid.branch}</td>
                               <td></td>
                               <td>O49</td>
                               <td>16686</td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td>emlmarketing@marketfed.com</td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td>/FAST/</td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td>{selectBankAcNo}</td>
                             </tr>
                               
                            ))}
                            
                             
                               <tr></tr>
                               <tr></tr>
                               <tr></tr>
                          </tbody>
                          </table>
                      ))}


               
                </div>
                      )}  
                </div>
                </div>
    </>
  )
}

export default Bankreport