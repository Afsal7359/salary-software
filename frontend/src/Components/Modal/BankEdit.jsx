  import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { editbank } from '../../Apicalls/Bank';


function BankEdit({ closeEditModal, item, setData, Data }) {
    console.log(Data,"uuuuuuuuuuuuuuuuuuuuuudata");
    const [itemid, setitemid] = useState(item._id);
    const [modalVisible, setModalVisible] = useState(true);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item.name,
      address: item.address,
      branch: item.branch,
      phone: item.phone
    },
  });

  const onSubmit = async (formData) => {
    if (!formData.name) {
      setError('name', {
        type: 'manual',
        message: 'Name is required',
      });
      return;
    }
// Update Data array if itemid matches
const updatedData = Data.map((dataItem) => {
    if (dataItem._id === item._id) {
      // Update specific fields with the new values from formData
      return {
        ...dataItem,
        branch: formData.branch,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
      };
    }
    return dataItem;
  });
  
  // Use the updatedData array as needed (e.g., set state or dispatch action)
  setData(updatedData);
  formData._id =itemid;
    console.log(formData,"yyyyyyyyyyyyyyyydfffffffffffffffffff");
    try {
        const response = await editbank(formData)
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
    // try {
    //   const response = await editemployeetype({ ...item, ...formData });
    //   if (response.success) {
    //     toast.success(response.message);
    //     closeEditModal();
    //   } else {
    //     toast.error(response.message);
    //   }
    // } catch (err) {
    //   toast.error(err.message);
    // }
  };

  return (
      modalVisible && (
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Employee Name</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Name</label>
                            <Controller
                              name="name"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                  type="text"
                                  placeholder=""
                                />
                              )}
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Address</label>
                            <Controller
                              name="address"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                  type="text"
                                  placeholder=""
                                />
                              )}
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
                            <Controller
                              name="branch"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
                                  type="text"
                                  placeholder=""
                                />
                              )}
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
                            <Controller
                              name="phone"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                  type="text"
                                  placeholder=""
                                />
                              )}
                            />
                            {errors.phone && errors.phone.type === 'required' && (
                              <span className="text-danger">Phone number is required</span>
                            )}
                            {errors.phone && errors.phone.type === 'pattern' && (
                              <span className="text-danger">Please enter a valid 10-digit phone number</span>
                            )}
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
      )
  );
}

export default BankEdit;
