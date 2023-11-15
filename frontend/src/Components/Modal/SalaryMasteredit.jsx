import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { editsalarymaster } from '../../Apicalls/salarymaster';
import { getallType } from '../../Apicalls/Type';
import { getallPurposee } from '../../Apicalls/Purpose';

function SalaryMasteredit({ closeEditModal, item,setData,Data}) {
    console.log(item);
  const [itemid, setitemid] = useState(item._id);
  const [modalVisible, setModalVisible] = useState(true);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();


  const [PurposeData, setPurposeData] = useState([]);
	const [TypeData, setTypeData]=useState([]);
	const [PurposeId, setPurposeId]=useState('');
	const [TypeId, setTypeId]=useState('');

	const [isPurposeDataFetched, setIsPurposeDataFetched] = useState(false);
	const [isTypeDataFetched, setIsTypeDataFetched] = useState(false);

  const handlePurposeClick = async () => {
   
    try {
      if (!isPurposeDataFetched) {
        const response = await getallPurposee();
        if (response.success) {
          setPurposeData(response.data);
        } else {
          setPurposeData([]);
        }
        setIsPurposeDataFetched(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTypeClick = async () =>{
    try {
        if(!isTypeDataFetched){
            const response = await getallType();
            if(response.success){
                setTypeData(response.data);
            }else{
                setTypeData([]);
            }
            setIsTypeDataFetched(true);
        }
    }catch(error){
        toast.error(error.message);
    }
  }



  const handlePurposeChange = (event) => {
    setPurposeId(event.target.value);
  };
  const handleTypeChange = (event)=>{
    setTypeId(event.target.value);
  }


  const onSubmit = async (formData) => {
    console.log(formData);
    if (!formData.name) {
      setError('name', {
        type: 'manual',
        message: 'Name is required',
      });
      return;
    }

    // setData(updatedData);
  
    formData._id =itemid;
    try {
        console.log(formData,'dddddddddddddddddddddddddddd');
      const response = await editsalarymaster(formData);
      if (response.success) {
        const updatedData = Data.map((dataItem) => {
          if (dataItem._id === response.data._id) {
              console.log("itemid is here");
            // Update the name with the new value from formData
            return {
              ...dataItem,
              name: response.data.name,
              purpose: { name:response.data.purpose.name }, // Update purpose with the value from formData
              type: { name:response.data.type.name }, // Update type with the value from formData
            };
          } 
          return dataItem;
        });
        setData(updatedData);
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
                            <h4>Purpose Name</h4>
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

                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Purpose</label>
                            <Controller
                                name="purposeId"
                                control={control}
                                defaultValue={item.purpose._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handlePurposeClick}
                                        onChange={handlePurposeChange}
                                        {...field}
                                    >
                                        {/* Render the current purpose as the default option */}
                                        <option value={item.purpose._id}>{item.purpose.name}</option>
                                        {PurposeData.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />

                          
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Type</label>
                            <Controller
                                name="typeId"
                                control={control}
                                defaultValue={item.type._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handleTypeClick}
                                        onChange={handleTypeChange}
                                        {...field}
                                    >
                                        {/* Render the current type as the default option */}
                                        <option value={item.type._id}>{item.type.name}</option>
                                        {TypeData.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
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

export default SalaryMasteredit ;