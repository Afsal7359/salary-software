

import React, { useState,useEffect, useMemo } from 'react';
import PageHeader from '../PageHeader';
import Postlist from './Postlist';
import { getallDepartment } from '../../Apicalls/Department';
import { toast } from 'react-toastify';
import { getallUnite } from '../../Apicalls/Unit';
import { getallDesignation } from '../../Apicalls/Designation';
import { Addpost, getallpostcount } from '../../Apicalls/Post';

const MemoizedPostlist = React.memo(Postlist);

const Postmaster = () => {

  const [count,setcount]=useState(0)


  // Usage in useEffect
  useEffect(() => {
    const fetchUniqueSixCharacterID = async () => {
      try {
        const response = await getallpostcount();
        setcount( response.data.count+1);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUniqueSixCharacterID();
  }, []);


  const [departmentData, setDepartmentData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [formdata, setformdata] = useState([]);
  const [unitId, setUnitId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [designationId, setDesignationId] = useState('');

  // Ensure that fetching data is done only once
  const [isDepartmentDataFetched, setIsDepartmentDataFetched] = useState(false);
  const [isUnitDataFetched, setIsUnitDataFetched] = useState(false);
  const [isDesignationDataFetched, setIsDesignationDataFetched] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform your submit logic here
    const formdatas = {
      unitId,
      departmentId,
      designationId,
      postid: `MP${count.toString().padStart(3, '0')}` 
    };

    try {
    
      // Example usage:

      const response = await Addpost(formdatas);
      if (response.success) {
        setcount((prevCount) => prevCount + 1);
        setformdata(response.data);
        setUnitId('');
        setDepartmentId('');
        setDesignationId('');
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const headerdata = useMemo(() => {
		return {
		  data:"Post master",
		  page:"Add postmaster"
		};
	  }, []);
  return (
    <>
      <PageHeader headerdata={headerdata}/>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form>
			                  <div className="row">
                   <div className="col-12">
                     <div className="form-heading">
                      <h4>Post Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-3">
                    <div className="form-group local-forms">
                       <label>Post Id<span className="login-danger">*</span></label>
                      <input className="form-control" type="text" placeholder="" value={`MP${count.toString().padStart(3, '0')}`} style={{ backgroundColor: "#cbd0d6" }} readOnly/>
                     </div>
                   </div>
                   <div className="col-12 col-md-6 col-xl-3">
                    <div className="form-group local-forms">
                      <label>Department<span className="login-danger">*</span></label>
                       <select
                        className="form-control select"
                        onMouseEnter={handleDepartmentClick}
						onChange={handleDepartmentChange}
                      >
                        <option value="">Select Department</option>
                        {departmentData.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-3">
                    <div className="form-group local-forms">
                      <label>Unit<span className="login-danger">*</span></label>
                      <select
                        className="form-control select"
                        onMouseEnter={handleUnitClick}
						onChange={handleUnitChange}
                      >
                        <option value="">Select Unit</option>
                        {unitData.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-3">
                    <div className="form-group local-forms">
                      <label>Designation<span className="login-danger">*</span></label>
                      <select
                        className="form-control select"
                        onMouseEnter={handleDesignationClick}
						onChange={handleDesignationChange}
                      >
                        <option value="">Select Designation</option>
                        {designationData.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="doctor-submit text-end">
                      <button type="submit" className="btn btn-primary submit-form me-2"onClick={handleSubmit}>
                        Submit
                      </button>
                      <button type="submit" className="btn btn-primary cancel-form"  onClick={() => {
                setUnitId('');
                setDepartmentId('');
				setDesignationId('')
              }}>
                        Cancel
                      </button>
                     </div>
                   </div>
                 </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <MemoizedPostlist formdata={formdata} setformdata={setformdata} />
    </>
  );
};

export default Postmaster;
