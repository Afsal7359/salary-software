import React, { useState, useEffect } from 'react';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import pdficon from '../../assets/img/icons/pdf-icon-01.svg';
import TXticon from '../../assets/img/icons/pdf-icon-02.svg';
import csvicon from '../../assets/img/icons/pdf-icon-03.svg';
import Excelicon from '../../assets/img/icons/pdf-icon-04.svg';

import { getallDepartment } from '../../Apicalls/Department';
import Departmentedit from '../Modal/Departmentedit';
import DepartmentDelete from '../Modal/DepartmentDelete';



function Departmentlist({DepartmentData,setDepartmentData}) {
    const [Data, setData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    if (DepartmentData.length!=0) {
        const isNameInData = Data.some((item) => item.name === DepartmentData.name);
        if (!isNameInData) {
          setData((prevData) => [DepartmentData,...prevData]);
          setDepartmentData([])
        }
    }




  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getallDepartment();
        setData(result.data);
        setIsLoading(false);
        // setrender(!render)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


 // Function to handle the click event
 const handleEditClick = (item) => {
    // Set showEditModal to true when the "Edit" button is clicked
    setShowEditModal(true);
    setSelectedItem(item);
  };
// Inside your DepartmentList component
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

// Calculate indexes for pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);


  
// Function to close the modal
const closeEditModal = () => {
    // Set showEditModal to false when the modal is closed
    setShowEditModal(false);
  };
   // Function to handle the click event
 const handleDeleteClick = (item) => {
    setshowDeleteModal(true)
    setSelectedItem(item)
   };
   const closeDeleteModal = () => {
     // Set showEditModal to false when the modal is closed
     setshowDeleteModal(false);
   };

  if (isLoading) {
    return <div>Loading...</div>; // You can render a loading indicator here
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          {Data.length ===0 ? (
            <p>No Data available</p> // You can customize this message
          ) : (
            <div className="card  card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Department List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn">
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
                      <a href="javascript:;" className="me-2">
                        <img src={pdficon} alt="" />
                      </a>
                      <a href="javascript:;" className="me-2">
                        <img src={TXticon} alt="" />
                      </a>
                      <a href="javascript:;" className="me-2">
                        <img src={csvicon} alt="" />
                      </a>
                      <a href="javascript;">
                        <img src={Excelicon} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table border-0 custom-table comman-table datatable mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Department Id</th>
                      <th>Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr  key={`${item._id}-${index}`}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{item.Departmentid}</td>
                        <td>{item.name}</td>
                        <td className="text-end">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a
                               onMouseEnter={() => {
                                setSelectedItem(item);
                                setShowEditModal(true);
                              }}
                               onClick={() => handleEditClick(item)}
                              className="dropdown-item" data-bs-toggle="modal"
                                data-bs-target="#delete_patients"
                                >
                                <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                              </a>
                              <a
                              onMouseEnter={() => {
                                setshowDeleteModal(true);
                                setSelectedItem(item);
                              }}
                              onClick={() => handleDeleteClick(item)}
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_patient"
                              >
                                <i className="fa fa-trash-alt m-r-5"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
           
              {Data.length > itemsPerPage && (
                <ul className="pagination">
                  {Array(Math.ceil(Data.length / itemsPerPage))
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
      </div>

      {showEditModal && selectedItem && (
  <Departmentedit
  setData={setData}
  Data={Data}
    item={selectedItem}
    closeEditModal={closeEditModal}
   
  />
)}

{showDeleteModal && selectedItem &&(<DepartmentDelete
 setData={setData}
 Data={Data}
 item={selectedItem}
 closeDeleteModal={closeDeleteModal}
/>)}

    </>
  );
}

export default Departmentlist;
