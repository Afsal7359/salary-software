import React,{useState} from 'react'
import { Controller, useForm } from 'react-hook-form';

function   CompanyEdit(closeEditModal, item,) {
console.log('eeeeeeeeee');
    console.log('Edit d Item:',item);
    const [itemid, setitemid] = useState(item._id);

    console.log(itemid);
    const [modalVisible, setModalVisible] = useState(true);
    // const {
    //     control,
    //     handleSubmit,
    //     setError,
    //     formState: { errors },
    //   } = useForm({
    //     defaultValues: {
    //       name: item.name,
    //       address: item.address,
    //     //   branch: item.branch,
    //     //   phone: item.phone
    //     },
    //   });
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
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Name</label>
                        
                          
                              <input
                                className={`form-control `}
                                type="text"
                                placeholder=""
                                value={item.name?item.name:""}
                              />
                            
                          
                          {/* {errors.name && <span className="text-danger">{errors.name.message}</span>} */}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Address</label>
                          
                              <input
                                
                                className={`form-control`}
                                type="text"
                                placeholder=""
                              />
                          
                          {/* {errors.address && errors.address.type === 'required' && (
                            <span className="text-danger">Address is required</span>
                          )}
                          {errors.address && errors.address.type === 'minLength' && (
                            <span className="text-danger">Address must be at least 4 characters</span>
                          )} */}
                        </div>
                      </div>
                    
                      <div className="col-12 col-md-6 col-xl-3">
                        <div className="doctor-submit text-end">
                          <button type="submit"  data-bs-dismiss="modal"  className="btn btn-primary submit-form me-2">
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