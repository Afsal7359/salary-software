import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { editemployeetype } from '../../Apicalls/Employee';
import { toast } from 'react-toastify';

function Postedit({ closeEditModal, item, setData, Data }) {
    console.log(item,"ttttttttttttttt");
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

    formData._id = itemid;
    try {
      const response = await editemployeetype(formData);
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
      <div id="delete_patients" className="modal fade" role="dialog">
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
                            <h4>Employee Details</h4>
                          </div>
                        </div>

                        {/* Department Dropdown */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Department</label>
                            <Controller
                              name="department"
                              control={control}
                              defaultValue={item.department}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                >
                                  {/* Replace with your static options */}
                                  <option value="dept1">Department 1</option>
                                  <option value="dept2">Department 2</option>
                                  {/* Add more options as needed */}
                                </select>
                              )}
                            />
                            {errors.department && (
                              <span className="text-danger">{errors.department.message}</span>
                            )}
                          </div>
                        </div>

                        {/* Unit Dropdown */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Unit</label>
                            <Controller
                              name="unit"
                              control={control}
                              defaultValue={item.unit}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
                                >
                                  {/* Replace with your static options */}
                                  <option value="unit1">Unit 1</option>
                                  <option value="unit2">Unit 2</option>
                                  {/* Add more options as needed */}
                                </select>
                              )}
                            />
                            {errors.unit && <span className="text-danger">{errors.unit.message}</span>}
                          </div>
                        </div>

                        {/* Designation Dropdown */}
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Designation</label>
                            <Controller
                              name="designation"
                              control={control}
                              defaultValue={item.designation}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                >
                                  {/* Replace with your static options */}
                                  <option value="desig1">Designation 1</option>
                                  <option value="desig2">Designation 2</option>
                                  {/* Add more options as needed */}
                                </select>
                              )}
                            />
                            {errors.designation && (
                              <span className="text-danger">{errors.designation.message}</span>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="doctor-submit text-end">
                            <button type="submit" data-bs-dismiss="modal" className=" btn btn-primary submit-form me-2">
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

export default Postedit;
