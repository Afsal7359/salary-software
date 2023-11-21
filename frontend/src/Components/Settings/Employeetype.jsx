import React, { useState,useEffect } from 'react';
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { Addemployeetype } from '../../Apicalls/Employeetype';
import { toast } from 'react-toastify';
import Employeetypelist from './Employeetypelist';

function Employeetype() {
  const [formData, setFormData] = useState('');
  // const [render, setrender] = useState(false);
  const [formdata, setformdata] =useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [employeetypeid,setEmployeeTypeId]=useState('');
  const generateUniqueSixLetterID = () => {
    const characters = '765464565434354364564560123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  };
  
  
  useEffect(() => {
    const uniqueSixCharacterID = generateUniqueSixLetterID();
    setEmployeeTypeId(uniqueSixCharacterID);
  }, []);

  const onSubmit = async (data) => {
   
      
      // Example usage:
      const uniqueSixLetterID = generateUniqueSixLetterID();
      setEmployeeTypeId(uniqueSixLetterID);


        data.employeeid=uniqueSixLetterID
    try {
      const response = await Addemployeetype(data);
      if (response.success) {
        setformdata(response.data)
        toast.success(response.message);
        setFormData(''); // Clear the form data after a successful submission
        // setrender(!render)
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

 
  return (
    <>
      <PageHeader />
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-heading">
                      <h4>Employee type Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Employee Id<span className="login-danger">*</span></label>
                      <input
                        type="text"
                        className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                        placeholder=""
                        style={{ backgroundColor: "#cbd0d6" }}
                        readOnly // Make the input field non-editable
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Name<span className="login-danger">*</span></label>
                      <input
                        {...register('name', { required: true, minLength: 4 })}
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder=""
                        value={formData}
                        onChange={(e)=>setFormData(e.target.value)}
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
                      <button
                        type="button"
                        className="btn btn-primary cancel-form"
                        onClick={() => setFormData('')} // Clear the form data on cancel
                      >
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
      <Employeetypelist  formdata={formdata} setformdata={setformdata} />
    </>
  );
}

export default Employeetype;
