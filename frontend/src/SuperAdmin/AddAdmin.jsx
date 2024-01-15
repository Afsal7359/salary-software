import React from 'react'
import { useForm } from 'react-hook-form';
import { AddAdmins } from '../Apicalls/Admin';
import { toast } from 'react-toastify';
function AddAdmin() {

    const { register, handleSubmit, watch,	reset, formState: { errors } } = useForm();
    const onSubmit =async(data) =>{
        console.log(data);
        const formData = {
            name : data.name ,
            email : data.email,
            username: data.username,
            password : data.password,
        }
        const response = await AddAdmins(formData);
        if (response.success){
            toast.success(response.message)
            console.log(response.data,"response.dataa");
            reset()
        }else{
            toast.error(response.message)
        }
       
    }
 
  return (
    <>
<div className="col-lg-10 ">
  <div className="login-wrapper">
    <div className="loginbox">
      <div className="login-right">
        <div className="login-right-wrap">
          <div className="account-logo">
            
            <h2 className='mt-5'>Add Admin </h2>
          </div>
         
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>
          Name <span className="login-danger">*</span>
        </label>
        <input className="form-control" type="text" {...register('name', { required: true })} />
        {errors.username && <span className="error" style={{color:"red",fontSize:12}}>Username is required</span>}
      </div>

      <div className="form-group">
        <label>
          Email <span className="login-danger">*</span>
        </label>
        <input className="form-control" type="text" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <span className="error" style={{color:"red",fontSize:12}}>Valid email is required</span>}
      </div>
    <div className="form-group">
        <label>
          Username <span className="login-danger">*</span>
        </label>
        <input className="form-control" type="text" {...register('username', { required: true })} />
        {errors.username && <span className="error" style={{color:"red",fontSize:12}}>Username is required</span>}
      </div>
      <div className="form-group">
            <label>
                Password <span className="login-danger">*</span>
            </label>
            <input className="form-control" type="password" {...register('password', { required: true, minLength: 6 })} />
            {errors.password && errors.password.type === 'required' && (
                <span className="error" style={{ color: "red", fontSize: 12 }}>
                Password is required
                </span>
            )}
            {errors.password && errors.password.type === 'minLength' && (
                <span className="error" style={{ color: "red", fontSize: 12 }}>
                Password must be at least 6 characters
                </span>
            )}
            </div>


      <div className="form-group">
        <label>
          Confirm Password <span className="login-danger">*</span>
        </label>
        <input className="form-control" type="password" {...register('confirmPassword', { required: true, validate: value => value === watch('password') })} />
        {errors.confirmPassword && <span className="error" style={{color:"red",fontSize:12}}>Passwords do not match</span>}
      </div>

      <div className="form-group login-btn">
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </div>
    </form>
          
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default AddAdmin