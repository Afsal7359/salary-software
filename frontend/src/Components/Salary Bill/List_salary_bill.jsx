import React, { useEffect, useState,useMemo,useCallback ,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { GetSalaryByMonth, getallSalarybill } from '../../Apicalls/salaryBill';
import SalaryBill from '../Modal/SalaryBill';
import SalaryBillEdit from './SalaryBillEdit';
import Salaryview from './Salaryview';
import { toast } from 'react-toastify';
import { GetAllCompany } from '../../Apicalls/Company';
import './Salaryvoucher.css'

function List_salary_bill({ formdata, setformdata }) {

  
 const componentRefs = useRef(null);

 const handlePrintVoucher = useReactToPrint({
   content: () => componentRefs.current,
 });


 const [Data, setData] = useState([]);
 const [showEditModal, setShowEditModal] = useState(false);
 const [showDeleteModal, setshowDeleteModal] = useState(false);
 const [showPrint, setshowPrint ] = useState(false);
 const [selectedItem, setSelectedItem] = useState(null);
 const [isLoading, setIsLoading] = useState(true);  
  const [Salarylist,setSalaryList]=useState(true)

  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState(''); 

  console.log(fromMonth);
  console.log(toMonth);
  
console.log('ffffrooooooom',formdata);

  useEffect(() => {
	if (formdata.length !== 0) {
	  setData((prevData) => [formdata,...prevData]);
	  setformdata([]);
	}
}, [formdata]);

const [company,setCompany]=useState([]);
const CompanyDataFetch = async()=>{
  try {
  const response =  await GetAllCompany();
  if(response.success){
    setCompany(response.data)
  }else{
    setCompany([]);
  }
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    CompanyDataFetch()
    async function fetchData() {
      try {
        const result = await getallSalarybill();
        console.log(result.data, 'response');
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  const memoizedData = useMemo(() => Data, [Data]);
console.log('memoizedData',memoizedData);

  const handleEditClick = useCallback((item) => {
	setShowEditModal(true);
	setSelectedItem(item);
  setSalaryList(false)
 
  }, []);
// Inside your DepartmentList component
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

// Calculate indexes for pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = memoizedData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to close the modal
const closeEditModal = () => {
	// Set showEditModal to false when the modal is closed
	setShowEditModal(false);
  };

   // Function to handle the click event
 const handleDeleteClick = (item) => {
	console.log(item);
	setshowDeleteModal(true)
	setSelectedItem(item)
   };

   const handlePrintClick = (item) => {
    console.log(item,"DDDDDDSSSSSSSSSSSSSSSSSSSSSS");
    setshowPrint(true)
    setSelectedItem(item)
     };

   
   const closeDeleteModal = () => {
	 // Set showEditModal to false when the modal is closed
	 setshowDeleteModal(false);
   };
  if (isLoading) {
    return <div>Loading...</div>; // You can render a loading indicator here
  }


  
 const handleFilterClick =async(event)=>{
  event.preventDefault();
try {
  const formdata = {
    fromMonth : fromMonth,
    toMonth : toMonth,
  }
const response = await GetSalaryByMonth(formdata)
if (response.success){
  setData(response.data);
  console.log();
  toast.success(response.message)
  }else{
    toast.error(response.message)
  }
} catch (error) {
  console.log(error);
  toast.error(error.message);
}

 }
 const currentDate = new Date(Date.now());
 const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

//  const grandTotalIncrement = memoizedData.reduce((total, data) => total + data.totalincrement, 0);
let grandTotalIncrement = 0;
let grandDeduction = 0;
let grandNetPay =0;

memoizedData.forEach((item) => {
  grandTotalIncrement += parseFloat(item.totalincrement || 0);
  grandDeduction += parseFloat(item.totaldeduction || 0);
  grandNetPay += parseFloat(item.totalAmount || 0);
});


 
console.log(grandTotalIncrement,"grandotal");
console.log(grandDeduction,":grnddeduction");
console.log(grandNetPay,":Grandnetpay");


   

  return (
    <>
    {Salarylist&& 
      <div className="row">
        <div className="col-sm-12">
          {/* <button className='btn btn-success submit-form m-2' >Add</button> */}
          {memoizedData.length === 0 ? (
            <p>No Data available</p>
          ) : (
            <div className="card card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Post List</h3>
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
                         {/* {errors.month && <p className="text-danger">{errors.toMonth.message}</p>} */}
                                      </a>

                      <button className=" btn btn-primary submit-form m-2"
                      onClick={handleFilterClick}>
                        Filter
                      </button>
                      <a  className=" btn btn-primary submit-form m-2"  onClick={handlePrintVoucher}>
                              print Voucher
                            </a>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table border-0 custom-table comman-table datatable mb-0">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Employee No</th>
                        <th>Employee Name</th>
                        <th>Gross Salary</th>
                        <th>Deduction</th>
                        <th>Emplyee Contributions</th>
                        <th>Net Pay</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, index) => (
                        <tr key={item._id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{item.employeeid.employeeno}</td>
                          <td>{item.employeeid.name}</td>
                          <td>{item.totalincrement}</td>
                          <td>{item.totaldeduction}</td>
                          <td>{item.totalcontribution}</td>
                          <td>{item.totalAmount}</td>
                          
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a  onMouseEnter={() => {
                                setSelectedItem(item);
                              
                              }}
                               onClick={() => handleEditClick(item)} className="dropdown-item" data-bs-toggle="modal"
                               data-bs-target="#delete_patients">
                                  <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                                </a>
                                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient"   onMouseEnter={() => {
                                setshowDeleteModal(true);
                                setSelectedItem(item);
                              }}
                              onClick={() => handleDeleteClick(item)}>
                                  <i className="fa fa-trash-alt m-r-5"></i> Delete
                                </a>
                                <a className="dropdown-item"  onTouchMove={() => {
                                setshowPrint(true);
                                setSelectedItem(item);
                              }}
                              onClick={() => handlePrintClick(item)}>
                                  <i className="fa fa-print m-r-5"></i> Print
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
                </div>
              </div>
              <nav aria-label="Page navigation example">
           
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
        
           </nav>
            </div>
          )}
        </div>
<div className="maindiv1">
<div className='maindiv'  ref={componentRefs} id="content-to-print">
        <table>
    <tbody>
      <tr
        height="170px"
       
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: 24,
          fontWeight: 600
        }}
      >
        <td>
        <img src={company[0]?company[0].image:""} alt="" height={55} width={155}/>
        </td>
        <td colSpan={4}> <h3>{company[0]?company[0].name:""}</h3><h5>{company[0]?company[0]. address:""}</h5></td>
      </tr>
      <tr>
     <td className='date' colSpan={5}>
     <h4 className='h4d'>{formattedDate}</h4>
     

     </td>
       </tr> 
      <tr 
        height="55px"
        style={{
          backgroundColor: "#fae3bd",
          color: "#000",
          textAlign: "center",
          fontSize: 24,
          fontWeight: 600,
        }}>
     <td colSpan={4}><h1> SALARY BILL </h1></td>
      </tr>
      
      
   
    </tbody>
  </table>

  <table style={{marginTop:10}}>
    <tbody>
    <tr>
        <th className="headnones">SL NO</th>
        <th className="headnones">EMPLOYEE NO</th>
        <th className="headnones">Employee Name</th>
        <th className="headnones">Gross Salary</th>
        <th className="headnones">Deduction</th>
        <th className="headnones">Emplyr Contr</th>
        <th className="headnones">Net Pay</th>
      </tr>

      {console.log(memoizedData,"memoiszzzzzzzeddaataa") }
     {memoizedData.map((data, index) => (
     
  <tr key={data._id}>
    <td className='text-center'>{index + 1}</td>
    <td className='text-center'>{data.employeeid.employeeno}</td>
    <td className='text-center'>{data.employeeid.name}</td>
    <td className='text-end'>{data.totalincrement}</td>
    <td className='text-end'>{data.totaldeduction}</td>
    <td className='text-end'>{data.totalcontribution}</td>
    <td className='text-end'>{data.totalAmount}</td>
  </tr>
))}

 
   
    </tbody>
  </table>

        <div className='total totals'>
          <h4 className='h4total'>Total Earnings : <span className='span'>{grandTotalIncrement}.00</span></h4>
        </div>
        
        <div className='total'>
          <h4 className='h4total'>Total Deductions : <span className='span'>{grandDeduction}.00</span></h4>
        </div>
        
        <div className='total'>
          <h4 className='h4total'>Total Net Pay : <span className='span'>{grandNetPay}.00</span></h4>
        </div>
        </div>
</div>
      </div>
      
    }
	  
      {showEditModal && selectedItem && (
        <div> 
  <SalaryBillEdit item={selectedItem} setData={setData} Data={Data}  closeEdit={closeEditModal}/></div>
)}
{showDeleteModal && selectedItem &&(<SalaryBill
 setData={setData}
 Data={Data}
 item={selectedItem}
 closeDeleteModal={closeDeleteModal}
/>)}
{showPrint && selectedItem &&(<Salaryview
 setData={setData}
 Data={Data}
 item={selectedItem}
 
/>)}
    </>
  );
}

export default React.memo(List_salary_bill);
