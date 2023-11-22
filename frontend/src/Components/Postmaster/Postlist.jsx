import React, { useEffect, useState,useMemo,useCallback  } from 'react';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import pdficon from '../../assets/img/icons/pdf-icon-01.svg';
import TXticon from '../../assets/img/icons/pdf-icon-02.svg';
import csvicon from '../../assets/img/icons/pdf-icon-03.svg';
import Excelicon from '../../assets/img/icons/pdf-icon-04.svg';
import { getallpost } from '../../Apicalls/Post';
import Postdelete from '../Modal/Postdelete';
import Postedit from '../Modal/Postedit';

function Postlist({ formdata, setformdata }) {
  console.log(formdata, 'yyyyyyyyyyyyyyyypostdata');
  const [Data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
	if (formdata.length !== 0) {
	  setData((prevData) => [formdata,...prevData]);
	  setformdata([]);
	}
}, [formdata]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getallpost();
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


  const handleEditClick = useCallback((item) => {
	setShowEditModal(true);
	setSelectedItem(item);
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
                      <a href="javascript:;" className=" me-2">
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
                        <th>No</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>unit</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {memoizedData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.department.name}</td>
                          <td>{item.designation.name}</td>
                          <td>{item.unit.name}</td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a  onMouseEnter={() => {
                                setSelectedItem(item);
                                setShowEditModal(true);
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

	  
 {showEditModal&& (
  <Postedit
  setData={setData}
  Data={Data}
    item={selectedItem}
    closeEditModal={closeEditModal}
   
  />
)}

{showDeleteModal && selectedItem &&(<Postdelete
 setData={setData}
 Data={Data}
 item={selectedItem}
 closeDeleteModal={closeDeleteModal}
/>)}
    </>
  );
}

export default React.memo(Postlist);
