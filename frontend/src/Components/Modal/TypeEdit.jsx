
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { editType } from '../../Apicalls/Type';

function TypeEdit({ closeEditModal, item,setData,Data}) {
  const [itemid, setitemid] = useState(item._id);
  const [modalVisible, setModalVisible] = useState(true);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

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
        // Update the name with the new value from formData
        return { ...dataItem, name: formData.name };
      }
      return dataItem;
    });
    // Use the updatedData array as needed (e.g., set state or dispatch action)
    setData(updatedData);
  
    formData._id =itemid;
    try {
      const response = await editType(formData);
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
  };

  return (
    // Conditionally render the modal based on modalVisible state
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
                            <h4>Type Name</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Name</label>
                            <Controller
                              name="name"
                              control={control}
                              defaultValue={item.name}
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
                        <div className="col-12 col-md-6 col-xl-3">
                          <div className="doctor-submit text-end">
                            <button type="submit" data-bs-dismiss="modal"  className=" btn btn-primary submit-form me-2">
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

export default TypeEdit;