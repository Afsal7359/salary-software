import React,{useState} from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { EditCompany } from '../../Apicalls/Company';

const   CompanyEdit=({ item, closeEditModal,setData,Data })=> {
console.log('eeeeeeeeeessssssssssssss');
    console.log('Edit d Item:',item);
    const [itemid, setitemid] = useState(item._id);


    const [selectedFile, setSelectedFile] = useState(null);
    
    const [name,setName]=useState(item.name?item.name:"")
    const [email,setEmail]=useState(item.email?item.email:"");
    const [phone,setPhone]=useState(item.phone?item.phone:"")
    const [address,setAddress]=useState(item.address?item.address:"");
    const [pincode,setPincode]=useState(item.pincode?item.pincode:"")
    const [gst,setGst]=useState(item.gst?item.gst:"");
    const [password,setPassword]=useState(item.password?item.password:"");

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
    console.log(itemid);
    const [modalVisible, setModalVisible] = useState(true);
    
    const onsubmit = async(event)=>{
        event.preventDefault();
         
        // Update Data array if itemid matches
const updatedData = Data.map((dataItem) => {
  if (dataItem._id === item._id) {
    // Update specific fields with the new values from formData
    return {
      ...dataItem,
      itemid:itemid,
              name : name,
              phone:phone,
              email:email,
              address:address,
              pincode:pincode,
              gst:gst,
              image: selectedFile,
             
    };
  }
  return dataItem;
});

        
          try {
            const formdata={
              _id:itemid,
              name : name,
              phone:phone,
              email:email,
              address:address,
              pincode:pincode,
              gst:gst,
              image: selectedFile,
              password:password
          }
        setData(updatedData);
       
          console.log("formdata : ",formdata);

              const response = await EditCompany(formdata)
              if (response.success) {
                toast.success(response.message);
                closeEditModal();
                setModalVisible(false); // Close the modal by setting modalVisible to false
              } else {
                toast.error(response.message);
              }
            } catch (err) {
              toast.error(err.message);
            }
      }


  return (
   
    
    modalVisible && (
        <>
    <div id="delete_patients" className="modal fade" role="dialog"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Employee Name</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-12">
                        <div className="form-group local-forms">
                          <label>Name</label>
                        
                          
                              <input
                                className={`form-control `}
                                type="text"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            
                          
                         
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-12">
                        <div className="form-group local-forms">
                          <label>Address</label>
                          
                              <input
                                
                                className={`form-control`}
                                type="text"
                                value={address}
                                placeholder=""
                                onChange={(e) => setAddress(e.target.value)}
                              />
                          
                    
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>email</label>
                          
                              <input
                                
                                className={`form-control`}
                                type="text"
                                value={email}
                                placeholder=""
                                onChange={(e) => setEmail(e.target.value)}
                              />
                          
                    
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>phone</label>
                          
                              <input
                                
                                className={`form-control`}
                                type="text"
                                value={phone}
                                placeholder=""
                                onChange={(e) => setPhone(e.target.value)}
                              />
                          
                    
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Gst</label>
                          
                              <input
                                
                                className={`form-control`}
                                type="text"
                                value={gst}
                                placeholder=""
                                onChange={(e) => setGst(e.target.value)}
                              />
                          
                    
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Pincode</label>
                          
                              <input
                                
                                className={`form-control`}
                                type="text"
                                value={pincode}
                                placeholder=""
                                onChange={(e) => setPincode(e.target.value)}
                              />
                          
                    
                        </div>
                      </div>
                      {selectedFile?selectedFile && (
                                       <img
                                       src={selectedFile}
                                       alt="Selected Image"
                                       className="preview-image"
                                       style={{ width: '150px', height: '150px', marginTop: '10px', margin:'2em' }}
                                     />
                                     
                                         ): <img src={item.image?item.image:""} alt="" className='p-3' width={10} height={150}/> }
                                 <div className="col-12 col-md-6 col-xl-9">
                                       <div className="form-group local-top-form">
                                         <label className="local-top">Company Logo <span className="login-danger">*</span></label>
                                         <div className="settings-btn upload-files-avator">
                                      
                                         <input
                                         
                                            type="file"
                                            name="image"
                                            id="file"
                                            onChange={handleFileChange}
                                            className={`hide-input `}
                                            />
                                          

                                         <label htmlFor="file" className="upload">
                                             Choose File
                                         </label>
                                      
                                         </div>
                                      
                                     </div>
                      </div>
                    
                      <div className="col-12 col-md-6 col-xl-4">
                        <div className="doctor-submit text-center">
                          <button type="submit" onClick={onsubmit} data-bs-dismiss="modal"  className="btn btn-primary submit-form me-2">
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
    </>
    )
   
  )
}


export default CompanyEdit