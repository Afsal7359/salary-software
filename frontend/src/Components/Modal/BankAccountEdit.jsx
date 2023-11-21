import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { editbankAccount } from '../../Apicalls/BankAccount';
import { getallbank } from '../../Apicalls/Bank';
import { getallUnite } from '../../Apicalls/Unit';
import { getallAccountType } from '../../Apicalls/Accounttype';
import { getallDepartment } from '../../Apicalls/Department';
import { getallOperationalType } from '../../Apicalls/Operational';

function BankAccountEdit({ closeEditModal, item,setData,Data}) {
    console.log(item);
  const [itemid, setitemid] = useState(item._id);
  const [modalVisible, setModalVisible] = useState(true);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();


  const [isOperationalDataFetched, setIsOperationalDataFetched] = useState(false);
  const [OperationalData, setOperationalData] = useState([]);
  const [OperationalId, setOperationalId] = useState('');

  const handleOperationalTypeClick = async () => {
      try {
        if (!isOperationalDataFetched) {
          const response = await getallOperationalType();
          if (response.success) {
            setOperationalData(response.data);
          } else {
            setOperationalData([]);
          }
          setIsOperationalDataFetched(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

   const handleOperationalTypeChange = (event)=>{
      setOperationalId(event.target.value);
   }
  
   const [isBankDataFetched, setIsBankDataFetched] = useState(false);
  const [BankData, setBankData] = useState([]);
  const [BankId, setBankId] = useState('');

  const handleBankClick = async () => {
      try {
        if (!isBankDataFetched) {
          const response = await getallbank();
          if (response.success) {
            setBankData(response.data);
          } else {
            setBankData([]);
          }
          setIsBankDataFetched(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

   const handleBankChange = (event)=>{
      setBankId(event.target.value);
   }

   const [isUnitDataFetched, setIsUnitDataFetched] = useState(false);
   const [unitData, setUnitData] = useState([]);
   const [unitId, setUnitId] = useState('');

   const handleUnitClick = async () => {
      try {
        if (!isUnitDataFetched) {
          const response = await getallUnite();
          if (response.success) {
            setUnitData(response.data);
          } else {
            setUnitData([]);
          }
          setIsUnitDataFetched(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    const handleUnitChange = (event) => {
      setUnitId(event.target.value);
    };

    const [isaccountTypeDataFetched, setIsAccountTypeDataFetched] = useState(false);
    const [accountTypeData, setAccountTypeData] = useState([]);
    const [accountTypeId, setAccountTypeId] = useState('');

    const handleAccountTypeClick = async () => {
       try {
         if (!isaccountTypeDataFetched) {
           const response = await getallAccountType();
           if (response.success) {
              setAccountTypeData(response.data);
           } else {
              setAccountTypeData([]);
           }
           setIsAccountTypeDataFetched(true);
         }
       } catch (error) {
         toast.error(error.message);
       }
     };
   
     const handleAccountTypeChange = (event) => {
       setAccountTypeId(event.target.value);
     };


     const [departmentData, setDepartmentData] = useState([]);
     const [departmentId, setDepartmentId] = useState('');
     const [isDepartmentDataFetched, setIsDepartmentDataFetched] = useState(false);

     const handleDepartmentClick = async () => {
      try {
        if (!isDepartmentDataFetched) {
          const response = await getallDepartment();
          if (response.success) {
            setDepartmentData(response.data);
          } else {
            setDepartmentData([]);
          }
          setIsDepartmentDataFetched(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    const handleDepartmentChange = (event) => {
      setDepartmentId(event.target.value);
    };



  const onSubmit = async (formData) => {
    console.log(formData);
    if (!formData.accountNo) {
      setError('accountNo', {
        type: 'manual',
        message: 'accountNo is required',
      });
      return;
    }

    // setData(updatedData);
  
    formData._id =itemid;
    try {
        console.log(formData,'dddddddddddddddddddddddddddd');
      const response = await editbankAccount(formData);
      if (response.success) {
        const updatedData = Data.map((dataItem) => {
          if (dataItem._id === response.data._id) {
              console.log("itemid is here");
            // Update the name with the new value from formData
            return {
              ...dataItem,
              accountNo: response.data.accountNo,
              BankId: { name:response.data.BankId.name }, // Update purpose with the value from formData
              OperationalId: { name:response.data.OperationalId.name }, // Update type with the value from formData
              accountTypeId: { name:response.data.accountTypeId.name },
              departmentId: { name:response.data.departmentId.name },
              unitId: { name:response.data.unitId.name },
              
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
                            <h4>Purpose Name</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Account Number</label>
                            <Controller
                              name="accountNo"
                              control={control}
                              defaultValue={item.accountNo}
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
                            <label>Bank </label>
                            <Controller
                                name="BankId"
                                control={control}
                                defaultValue={item.BankId._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handleBankClick}
                                        onChange={handleBankChange}
                                        {...field}
                                    >
                                        {/* Render the current purpose as the default option */}
                                        <option value={item.BankId._id}>{item.BankId.name}</option>
                                        {BankData.map((option) => (
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
                            <label>Department </label>
                            <Controller
                                name="departmentId"
                                control={control}
                                defaultValue={item.departmentId._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handleDepartmentClick}
                                        onChange={handleDepartmentClick}
                                        {...field}
                                    >
                                        {/* Render the current purpose as the default option */}
                                        <option value={item.departmentId._id}>{item.departmentId.name}</option>
                                        {departmentData.map((option) => (
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
                            <label>Account Type </label>
                            <Controller
                                name="accountTypeId"
                                control={control}
                                defaultValue={item.accountTypeId._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handleAccountTypeClick}
                                        onChange={handleAccountTypeChange}
                                        {...field}
                                    >
                                        {/* Render the current purpose as the default option */}
                                        <option value={item.accountTypeId._id}>{item.accountTypeId.name}</option>
                                        {accountTypeData.map((option) => (
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
                            <label>Operational Type </label>
                            <Controller
                                name="OperationalId"
                                control={control}
                                defaultValue={item.OperationalId._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handleOperationalTypeClick}
                                        onChange={handleOperationalTypeChange}
                                        {...field}
                                    >
                                        {/* Render the current purpose as the default option */}
                                        <option value={item.OperationalId._id}>{item.OperationalId.name}</option>
                                        {OperationalData.map((option) => (
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
                            <label>Unit </label>
                            <Controller
                                name="unitId"
                                control={control}
                                defaultValue={item.unitId._id}  
                                render={({ field }) => (
                                    <select
                                        className="form-control select"
                                        onMouseEnter={handleUnitClick}
                                        onChange={handleUnitChange}
                                        {...field}
                                    >
                                        {/* Render the current purpose as the default option */}
                                        <option value={item.unitId._id}>{item.unitId.name}</option>
                                        {unitData.map((option) => (
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

export default BankAccountEdit ;