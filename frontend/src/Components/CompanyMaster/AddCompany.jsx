import React,{useEffect, useMemo,useState} from 'react'
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { AddCompanyMaster, GetAllCompany } from '../../Apicalls/Company';
import { toast } from 'react-toastify';
import Companylist from './Companylist';

function AddCompany() {
    const [formdata,setFormData]=useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const {
		register,
        handleSubmit,
		formState: { errors },
        watch,
	  } = useForm();

      const password = watch('password');
      const confirm_password = watch('confirm_password');

     const [name,setName]=useState('')
     const [email,setEmail]=useState('');
     const [phone,setPhone]=useState('')
     const [address,setAddress]=useState('');
     const [pincode,setPincode]=useState('')
     const [gst,setGst]=useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
console.log('image',selectedFile);
    const headerdata = useMemo(() => {
		return {
		  data:"Company",
		  page:"Add Company"
		};
	  }, []);

const onsubmit = async()=>{
    try {

        const formdata={
            name : name,
            phone:phone,
            email:email,
            address:address,
            pincode:pincode,
            gst:gst,
            image: selectedFile,
            password:password
        }
        console.log("formdata : ",formdata);

        const response = await AddCompanyMaster(formdata);
        console.log(response,"ii");
        if (response.success) {
            setFormData(response.data);
            toast.success(response.message);
           setAddCompany(false)
        }

    } catch (error) {
        console.log(error);
    }
}
const [companyData,setCompanyData]=useState();
const [addcompany,setAddCompany]=useState(true);

    useEffect(()=>{
        companyDatafetched();
    },[])

    const companyDatafetched =async()=>{
        try {
            const response = await GetAllCompany();
            setCompanyData(response);
            if( response.data[0]){
               setAddCompany(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
console.log('Company Data :',companyData);



  return (
    <>
    <PageHeader headerdata={headerdata}/>
             {addcompany&&<div className="row">
                   <div className="col-sm-12">
                       <div className="card">
                           <div className="card-body">
                               <form onSubmit={handleSubmit(onsubmit)} encType='multipart/formdata'>
                                   <div className="row">
                                       <div className="col-12">
                                           <div className="form-heading">
                                               <h4>Add Company Details</h4>
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">  
                                           <div className="form-group local-forms">
                                               <label >Company Name <span className="login-danger">*</span></label>
                                               <input
                                               {...register('name',{require:true,minLength:4})}
                                               className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                type="text"  placeholder=""
                                                  value={name}
                                           onChange={(e)=>setName(e.target.value)}/>
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Email <span className="login-danger">*</span></label>
												<input
												{...register('email', {
													required: 'Email is required',
													pattern: {
													  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													  message: 'Invalid email address',
													},
												  })}
													type="text"
													className={`form-control ${errors.employeeno ? 'is-invalid' : ''}`}
													placeholder=""
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
												 {errors.email && (
														<span className="text-danger">{errors.email.message}</span>
													)}
											</div>
										</div>
                                        <div className="col-12 col-md-6 col-xl-6">
											<div className="form-group local-forms">
												<label >Phone <span className="login-danger">*</span></label>
												<input
													{...register('phone', {
														required: true,
														pattern: /^[0-9]{0,10}$/,
													})}
													className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
													type="text" // Using type="text" for numeric input with max length
													placeholder=""
													value={phone}
													onChange={(e) => {
														const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
														if (onlyNumbers.length <= 10) {
														setPhone(onlyNumbers);
														}
													}}
													/>
												{errors.phone && (
													<span className="text-danger">{errors.phone.message}</span>
												)}
											</div>
										</div>
                                       <div className="col-12 col-md-6 col-lg-8">
                                           <div className="form-group local-forms">
                                               <label >Address<span className="login-danger">*</span></label>
                                               <input
													{...register('address', { required: true, minLength: 2 })}
													type="text"
													className={`form-control ${errors.address ? 'is-invalid' : ''}`}
													placeholder=""
													value={address}
													onChange={(e) => setAddress(e.target.value)}
													/>
													{errors.address1 && errors.address.type === 'required' && (
													<span className="text-danger">Address-1 is required</span>
													)}
													{errors.address1 && errors.address.type === 'minLength' && (
													<span className="text-danger">Address-1 must be at least 2 characters</span>
													)}
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
                                           <div className="form-group local-forms">
                                               <label >pincode<span className="login-danger">*</span></label>
                                               <input
                                                {...register('pincode', {
                                                    required: 'Pincode is required',
                                                    minLength: {
                                                    value: 4,
                                                    message: 'Pincode must be at least 4 characters',
                                                    },
                                                    maxLength: {
                                                    value: 6,
                                                    message: 'Pincode cannot exceed 6 characters',
                                                    },
                                                    pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Please enter a valid pincode',
                                                    },
                                                })}
                                                type="text"
                                                className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                                                placeholder=""
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                />
                                                {errors.pincode && (
                                                <span className="text-danger">{errors.pincode.message}</span>
                                                )}

                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
                                           <div className="form-group local-forms">
                                               <label >gst<span className="login-danger">*</span></label>
                                               <input
                                                {...register('gst', {
                                                    required: 'GST is required',
                                                    pattern: {
                                                    value: /^[0-9A-Za-z]{15}$/,
                                                    message: 'Please enter a valid GST number',
                                                    },
                                                })}
                                                type="text"
                                                className={`form-control ${errors.gst ? 'is-invalid' : ''}`}
                                                placeholder=""
                                                value={gst}
                                                onChange={(e) => setGst(e.target.value)}
                                                />
                                                {errors.gst && (
                                                <span className="text-danger">{errors.gst.message}</span>
                                                )}

                                           </div>
                                       </div>
                                     
                                       <div className="col-12 col-md-6 col-xl-4">
                                           <div className="form-group local-forms">
                                               <label > password<span className="login-danger">*</span></label>
                                               <div className="input-group">
                                                    <input
                                                    {...register('password', {
                                                        required: 'Password is required',
                                                        minLength: {
                                                        value: 6,
                                                        message: 'Password must be at least 6 characters',
                                                        },
                                                    })}
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder=""
                                                    />
                                                    <a
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                                    >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                    </a>
                                                </div>
                                                {errors.password && (
                                                    <span className="text-danger">{errors.password.message}</span>
                                                )}
                                           </div>
                                       </div>
                                       <div className="col-12 col-md-6 col-xl-4">
                                           <div className="form-group local-forms">
                                               <label >confirm password<span className="login-danger">*</span></label>
                                               <input
                                                    {...register('confirm_password', {
                                                    validate: (value) =>
                                                        value === password || 'The passwords do not match',
                                                    })}
                                                    className={`form-control ${
                                                    errors.confirm_password ? 'is-invalid' : ''
                                                    }`}
                                                    type="password"
                                                    placeholder=""
                                                />
                                                {errors.confirm_password && (
                                                    <span className="text-danger">
                                                    {errors.confirm_password.message}
                                                    </span>
                                                )}
                                           </div>
                                       </div>
                                    
                                       <div className="col-12 col-md-6 col-xl-5">
                                       {selectedFile && (
                                       <img
                                       src={selectedFile}
                                       alt="Selected Image"
                                       className="preview-image"
                                       style={{ width: '100px', height: '100px', marginTop: '10px', margin:'2em' }}
                                     />
                                     
                                         )}
                                     <div className="form-group local-top-form">
                                         <label className="local-top">Company Logo <span className="login-danger">*</span></label>
                                         <div className="settings-btn upload-files-avator">
                                      
                                         <input
                                            {...register('image', {
                                                required: 'Image is required',
                                            })}
                                            type="file"
                                            name="image"
                                            id="file"
                                            onChange={handleFileChange}
                                            className={`hide-input ${errors.image ? 'is-invalid' : ''}`}
                                            />
                                            {errors.image && (
                                            <span className="text-danger">{errors.image.message}</span>
                                            )}

                                         <label htmlFor="file" className="upload">
                                             Choose File
                                         </label>
                                      
                                         </div>
                                      
                                     </div>
                                     </div>
                                    
                                       
                                      
                                       <div className="col-12">
                                           <div className="doctor-submit text-end">
                                               <button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
                                               <button type="submit" className="btn btn-primary cancel-form">Cancel</button>
                                           </div>
                                       </div>
                                   </div>
                               </form>
                           </div>
                       </div>							
                   </div>					
               </div>}
	<Companylist formdata={formdata} setFormData={setFormData}/>
  </>
  )
}

export default AddCompany