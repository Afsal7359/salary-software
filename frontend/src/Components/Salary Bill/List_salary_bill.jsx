import React, { useEffect, useState,useMemo,useCallback  } from 'react';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import Pagination from 'react-bootstrap/Pagination'; 
import { useReactToPrint } from 'react-to-print';
import { GetSalaryByMonth, getallSalarybill } from '../../Apicalls/salaryBill';
import SalaryBill from '../Modal/SalaryBill';
import SalaryBillEdit from './SalaryBillEdit';
import Salaryview from './Salaryview';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function List_salary_bill({ formdata, setformdata }) {
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


  useEffect(() => {
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

   const handleTableClick =()=>{
    setShowEditModal(false)
    setSalaryList(true)
   }
   
   const closeDeleteModal = () => {
	 // Set showEditModal to false when the modal is closed
	 setshowDeleteModal(false);
   };
  if (isLoading) {
    return <div>Loading...</div>; // You can render a loading indicator here
  }
  // const handleAddButton = ()=>{
    
  //   setSalaryList(false)
  //   setSalarybill(true);
  // }

  
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

 const handlePrintVoucher = ()=>{
        Data.map((data)=>{
          const printData = {
            name : data.name,
            month : data.month,
            salary : data.salary,
            date : data.date,
            }
            return printData
        })
       
 }
    <useReactToPrint 
        content={() =>printData } // Function to reference the printable component
      />

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
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn" >
                                <img src={searchicon} alt="" />
                              </a>
                            </form>
                          
                          </div>
                          <div className="add-group">
                            <a href="add-doctor.html" className="btn btn-primary add-pluss ms-2">
                           
                              <img src={addicon} alt="" />
                            </a>
                            <a href="javascript:;" className="btn btn-primary doctor-refresh ms-2" onClick={handlePrintVoucher}>
                              print
                            </a>
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
                      {memoizedData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
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
                  <div style={{ display: 'block', width: 700, padding: 30 }}> 
      <Pagination> 
        <Pagination.Prev /> 
        <Pagination.Ellipsis />
        <Pagination.Item>{1}</Pagination.Item> 
        <Pagination.Item>{2}</Pagination.Item> 
        <Pagination.Item>{3}</Pagination.Item> 
        <Pagination.Item>{4}</Pagination.Item> 
        <Pagination.Item>{5}</Pagination.Item> 
        <Pagination.Ellipsis />
        <Pagination.Next /> 
      </Pagination> 
    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    }
	  
      {showEditModal && selectedItem && (
        <div> <button className='btn btn-success mt-2 ' onClick={handleTableClick}>Table</button>
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
