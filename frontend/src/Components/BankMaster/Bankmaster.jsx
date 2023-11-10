import React, { useState } from 'react';
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { Addemployeetype } from '../../Apicalls/Employee';
import { toast } from 'react-toastify';
import { Addbank } from '../../Apicalls/Bank';
import Banklist from './Banklist';


function Bankmaster() {
  const [formData, setFormData] = useState('');
  const [address, setaddress] = useState('');
  const [branch, setbranch] = useState('');
  const [Phone, setPhone] = useState('');

  const [formdata, setformdata] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      address: '',
      branch: '',
      phone: '',
    },
  });

  const onSubmit = async (data) => {
    function generateUniqueSixLetterID() {
      const currentDate = new Date();
      const year = String(currentDate.getFullYear()).slice(-2);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');

      const id = `${year}${month}${day}${hours}${minutes}${seconds}`;

      return id;
    }

    const uniqueSixLetterID = generateUniqueSixLetterID();
    data.bankid = uniqueSixLetterID;

    try {
      const response = await Addbank(data);
      if (response.success) {
        setformdata(response.data);
        toast.success(response.message);
        setFormData('');
        setaddress('')
        setbranch('')
        setPhone('')
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
                      <h4>Bank Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-6">
                    <div className="form-group local-forms">
                      <label>Bank Id</label>
                      <input className="form-control" type="text" placeholder=""   style={{ backgroundColor: "#cbd0d6" }}
                        readOnly />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-6">
                    <div className="form-group local-forms">
                      <label>Name</label>
                      <input
                        {...register('name', { required: true, minLength: 4 })}
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
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
                  <div className="col-12 col-md-6 col-xl-6">
                    <div className="form-group local-forms">
                      <label>Address</label>
                      <input
                        {...register('address', { required: true, minLength: 4 })}
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder=""
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                      {errors.address && errors.address.type === 'required' && (
                        <span className="text-danger">Address is required</span>
                      )}
                      {errors.address && errors.address.type === 'minLength' && (
                        <span className="text-danger">Address must be at least 4 characters</span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-6">
                    <div className="form-group local-forms">
                      <label>Branch</label>
                      <input
                        {...register('branch', { required: true, minLength: 4 })}
                        type="text"
                        className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
                        placeholder=""
                        value={branch}
                        onChange={(e) => setbranch(e.target.value)}
                      />
                      {errors.branch && errors.branch.type === 'required' && (
                        <span className="text-danger">Branch is required</span>
                      )}
                      {errors.branch && errors.branch.type === 'minLength' && (
                        <span className="text-danger">Branch must be at least 4 characters</span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-6">
                    <div className="form-group local-forms">
                      <label>Phone No</label>
                      <input
                        {...register('phone', {
                          required: true,
                          pattern: /^[0-9]{10}$/,
                        })}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && errors.phone.type === 'required' && (
                        <span className="text-danger">Phone number is required</span>
                      )}
                      {errors.phone && errors.phone.type === 'pattern' && (
                        <span className="text-danger">Please enter a valid 10-digit phone number</span>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="doctor-submit text-end">
                      <button type="submit" className="btn btn-primary submit-form me-2">
                        Submit
                      </button>
                      <button type="submit" className="btn btn-primary cancel-form" onClick={() => setFormData('')}>
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
   <Banklist  formdata={formdata} setformdata={setformdata} />
    </>
  );
}

export default Bankmaster;
