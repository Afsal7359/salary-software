import React, { useEffect, useState,useMemo,useCallback  } from 'react';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import pdficon from '../../assets/img/icons/pdf-icon-01.svg';
import TXticon from '../../assets/img/icons/pdf-icon-02.svg';
import csvicon from '../../assets/img/icons/pdf-icon-03.svg';
import Excelicon from '../../assets/img/icons/pdf-icon-04.svg';

import { getallSalarybill } from '../../Apicalls/salaryBill';
import SalaryBill from '../Modal/SalaryBill';
import SalaryBillEdit from './SalaryBillEdit';
import Salaryview from './Salaryview';

function List_salary_bill({ formdata, setformdata }) {
  const [Data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showPrint, setshowPrint ] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [Salarylist,setSalaryList]=useState(true)
  
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

  
 const handlePrintvoucher =()=>{
  setshowPrint(false)
  setSalaryList(true)
 }
  

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
                            <a href="javascript:;" className="btn btn-primary doctor-refresh ms-2">
                              <img src={refreshicon} alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <a type='button' className=" me-2" onClick={handlePrintvoucher}>
                        <img src={pdficon} alt="" />
                      </a>
                      <a href="javascript:;" className=" me-2">
                        <img src={TXticon} alt="" />
                      </a>
                      <a href="javascript:;" className=" me-2">
                        <img src={csvicon} alt="" />
                      </a>
                      <a href="javascript:;">
                        <img src={Excelicon} alt="" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table border-0 custom-table comman-table datatable mb-0">
                    <thead>
                      <tr>
                        <th>Bill No</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>unit</th>
                        <th>Total Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memoizedData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{item.SalaryBillNo}</td>
                          <td>{item.date}</td>
                          <td>{item.employeeid.name}</td>
                          <td>{item.departmentid.name}</td>
                          <td>{item.unitid.name}</td>
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
