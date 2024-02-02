import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { SuperAdminlogin } from '../Apicalls/SuperAdmin';
import { useDispatch } from 'react-redux';
import { login } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { adminlogout } from '../Store/Adminauth';

const Login = () => {

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [tocken,setTocken]=useState('');

    const navigate = useNavigate()

console.log(username,"username");
console.log(password,"password");
    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handlesubmit =async(event)=>{
        event.preventDefault();
        const formdata ={
            username:username,
            password:password
        }
        try {
            const response = await SuperAdminlogin(formdata);
            if(response.success){
                dispatch(login(response.data))
                navigate('/superadmin')
                setTocken(response.data)
                toast.success(response.message);
                console.log(tocken,"tocken");
                // location.reload()
               
            }else{
                toast.error(response.message);
            }
        } catch (error) {
            
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
            <a>
              <img src="assets/img/login-logo.png" alt="" />
            </a>
            <h2 className='mt-5'>Super Admin </h2>
          </div>
         
          {/* Form */}
          <form  onSubmit={handlesubmit}>
            <div className="form-group">
              <label>
                Username <span className="login-danger">*</span>
              </label>
              <input className="form-control" type="text" onChange={(e) =>setUserName(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>
               Password <span className="login-danger">*</span> 
              </label>
              <input className="form-control pass-input" type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} required/>
              <span className="profile-views feather-eye-off toggle-password" onClick={togglePassword} />
            </div>
            <div className="form-group login-btn">
              <button className="btn btn-primary btn-block" type="submit">
                Login
              </button>
            </div>
          </form>
          <div class="next-sign">
            <p class="account-subtitle">If you are an admin, <a href="/">login</a></p>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Login