import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getallDepartment } from '../../Apicalls/Department';
import { getallUnite } from '../../Apicalls/Unit';
import { getallDesignation } from '../../Apicalls/Designation';
import { editpost } from '../../Apicalls/Post';

function Postedit({ closeEditModal, item, setData, Data }) {
    console.log(item,"ttttttttttttttt");
  const [itemid, setitemid] = useState(item._id);
  const [modalVisible, setModalVisible] = useState(true);

  const [departmentData, setDepartmentData]=useState([]);
  const[departmentId, setDepartmentId]=useState('');
  const[isDepartmentDataFetched, setIsDepartmentDataFetched]=useState(false);

  const [unitData,setUnitData]=useState([]);
  const [isUnitDataFetched, setIsUnitDataFetched]=useState(false);
  const [unitId,setUnitId]=useState("")

  const [designationData, setDesignationData] =useState([]);
  const [isDesignationDataFetched, setIsDesignationDataFetched]=useState(false);
  const[designationId, setDesignationId]=useState('');

  const handleDepartmentClick = async () => {
    try {
      if (!isDepartmentDataFetched) {
        const response = await getallDepartment();
        if (response.success) {
          setDepartmentData(response.data);
        } else {
          setDepartmentData([]);
        }
        setIsDepartmentDataFetched(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDesignationClick = async () => {
    try {
      if (!isDesignationDataFetched) {
        const response = await getallDesignation();
        if (response.success) {
          setDesignationData(response.data);
        } else {
          setDesignationData([]);
        }
        setIsDesignationDataFetched(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUnitClick = async () => {
    try {
      if (!isUnitDataFetched) {
        const response = await getallUnite();
        if (response.success) {
          setUnitData(response.data);
        } else {
          setUnitData([]);
        }
        setIsUnitDataFetched(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const handleUnitChange = (event) => {
  setUnitId(event.target.value);
};

const handleDepartmentChange = (event) => {
  setDepartmentId(event.target.value);
};

const handleDesignationChange = (event) => {
  setDesignationId(event.target.value);
};




  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData,'ddddddddddddddddddddddddddddss');
  

   // setData(updatedData);
  
   formData._id =itemid;
  
   try {
      
     const response = await editpost(formData);
     if (response.success) {
       const updatedData = Data.map((dataItem) => {
         if (dataItem._id === response.data._id) {
             console.log("itemid is here");
           // Update the name with the new value from formData
           return {
             ...dataItem,
             department: { name:response.data.department.name }, // Update purpose with the value from formData
             unit: { name:response.data.unit.name }, // Update type with the value from formData
             designation: { name:response.data.designation.name }, 
           };
         } 
         return dataItem;
       });
       setData(updatedData);
       toast.success(response.message);
       closeEditModal();
       setModalVisible(false); // Close the modal by setting modalVisible to false
     } else {
       toast.error(response.message);
     }
   } catch (err) {
     toast.error(err.message);
   }
 };

  return (
    // Conditionally render the modal based on modalVisible state
    modalVisible && (
      <div id="delete_patients" className="modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button className="btn close submit-form" data-bs-dismiss="modal" onClick={closeEditModal}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Employee Details</h4>
                          </div>
                        </div>

                        {/* Department Dropdown */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Department</label>
                            <Controller
                              name="departmentId"
                              control={control}
                              defaultValue={item.department._id}
                              render={({ field }) => (
                                <select
                                className="form-control select"
                                  onMouseEnter={handleDepartmentClick}
                                        onChange={handleDepartmentChange}
                                        {...field}
                                >
                                   <option value={item.department._id}>{item.department.name}</option>
                                    {departmentData.map((option) => (
                                      <option key={option._id} value={option._id}>
                                        {option.name}
                                      </option>
                                    ))}
                                </select>
                              )}
                            />
                            {errors.department && (
                              <span className="text-danger">{errors.department.message}</span>
                            )}
                          </div>
                        </div>

                        {/* Unit Dropdown */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Unit</label>
                            <Controller
                              name="unitId"
                              control={control}
                              defaultValue={item.unit._id}
                              render={({ field }) => (
                                <select
                               
                                  className="form-control select"  
                                  onMouseEnter={handleUnitClick}
                                  onChange={handleUnitChange}  
                                  {...field}
                                >
                                  <option value={item.unit._id}>{item.unit.name}</option>
                                  {unitData.map((option) => (
                                      <option key={option._id} value={option._id}>
                                        {option.name}
                                        </option>
                                  ))}
                                </select>
                              )}
                            />
                            {errors.unit && <span className="text-danger">{errors.unit.message}</span>}
                          </div>
                        </div>

                        {/* Designation Dropdown */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Designation</label>
                            <Controller
                              name="designationId"
                              control={control}
                              defaultValue={item.designation._id}
                              render={({ field }) => (
                                <select
                                 
                                  className="form-control select"
                                  onMouseEnter={handleDesignationClick}
                                  onChange={handleDesignationChange}
                                  {...field}
                                  >
                                 <option value={item.designation._id}>{item.designation.name}</option>
                                 {designationData.map((option) => (
                                  <option value={option._id} key={option._id}>
                                    {option.name}
                                  </option>
                                 ))}
                                </select>
                              )}
                            />
                            {errors.designation && (
                              <span className="text-danger">{errors.designation.message}</span>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="doctor-submit text-end">
                            <button type="submit" data-bs-dismiss="modal" className=" btn btn-primary submit-form me-2">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Postedit;
