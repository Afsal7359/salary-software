import React, { useState,useEffect } from 'react';
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddAccountType, getallAccountTypecount } from '../../Apicalls/Accounttype';
import Accounttypelist from './Accounttypelist';

function Accounttype() {
  const [formData, setFormData] = useState('');
  const [formdata, setformdata] =useState([]);
const [count,setcount]=useState(0)


  // Usage in useEffect
  useEffect(() => {
    const fetchUniqueSixCharacterID = async () => {
      try {
        const response = await getallAccountTypecount();
        setcount( response.data.count+1);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUniqueSixCharacterID();
  }, []);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const onSubmit = async (data) => {
    data.accounttypeid=`MA${count.toString().padStart(3, '0')}`
    try {
      const response = await AddAccountType(data);
      if (response.success) {
        setcount((prevCount) => prevCount + 1);
        setformdata(response.data)
        toast.success(response.message);
        setFormData('');
        // setAccountTypeId
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
                      <h4>Account Type Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Account Type Id<span className="login-danger">*</span></label>
                      <input
  {...register('accounttypeid')}
  className={`form-control ${errors.accounttypeid ? 'is-invalid' : ''}`}
  type="text"
  value={`MA${count.toString().padStart(3, '0')}`}
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
      <Accounttypelist  formdata={formdata} setformdata={setformdata} />
    </>
  );
}

export default Accounttype;
