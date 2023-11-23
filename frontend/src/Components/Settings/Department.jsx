import React, { useState,useEffect, useMemo } from 'react';
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddDepartment, getallDepartmentcount } from '../../Apicalls/Department';
import Departmentlist from './Departmentlist';

function Department() {
  const [formData, setFormData] = useState('');
  const [DepartmentData, setDepartmentData] = useState([]); // Initialize the state with an empty array
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [count,setcount]=useState(0)


  // Usage in useEffect
  useEffect(() => {
    const fetchUniqueSixCharacterID = async () => {
      try {
        const response = await getallDepartmentcount();
        setcount( response.data.count+1);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUniqueSixCharacterID();
  }, []);


  const onSubmit = async (data) => {
    // Example usage:
    data.Departmentid=`MD${count.toString().padStart(3, '0')}`
    try {
      const response = await AddDepartment(data);
      if (response.success) {
        setcount((prevCount) => prevCount + 1);
        setDepartmentData(response.data);
        toast.success(response.message);
        setFormData('');
      
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const headerdata = useMemo(() => {
		return {
		  data:"Employee master",
		  page:"Department"
		};
	  }, []);

  return (
    <>
      <PageHeader headerdata={headerdata} />
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-heading">
                      <h4>Department Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Department Id</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        style={{ backgroundColor: "#cbd0d6" }}
                        value={`MD${count.toString().padStart(3, '0')}`}
                        readOnly // Make the input field non-editable
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Name</label>
                      <input
                        {...register('name', { required: true, minLength: 4 })}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                      />
                      {errors.name && errors.name.type === 'required' && (
                        <span className="text-danger">Name is required</span>
                      )}
                      {errors.name && errors.name.type === 'minLength' && (
                        <span className="text-danger">Name must be at least 4 characters</span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="doctor-submit text-end">
                      <button type="submit" className="btn btn-primary submit-form me-2">
                        Submit
                      </button>
                      <button type="reset" className="btn btn-primary cancel-form"  onClick={() => setFormData('')}>
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
      <Departmentlist DepartmentData={DepartmentData} setDepartmentData={setDepartmentData} />
    </>
  );
}

export default Department;

