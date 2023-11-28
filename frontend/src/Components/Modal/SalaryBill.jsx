import React, { useState }  from 'react'
import alerticon from '../../assets/img/sent.png'

import { toast } from 'react-toastify';
import { DeleteSalaryBill } from '../../Apicalls/salaryBill';
function SalaryBill({ closeDeleteModal, item,setData,Data}) {


const handleDelete = async () => {
  try {
    const updatedData = Data.filter(dataItem => dataItem._id !== item._id);
    // Update the Data state or perform any other action
    setData(updatedData);
    // Close the delete modal
    closeDeleteModal();

    // Perform the deletion logic here, based on itemid
    const response = await DeleteSalaryBill(item._id);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    // Close the delete modal
    // closeDeleteModal();
  } catch (error) {
    console.error('Error during deletion:', error);
    // Handle any errors during the deletion process
  }
};

        

    
  return (
  <>
       <div id="delete_patient" className="modal fade delete-modal" role="dialog"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body text-center">
						<img src={alerticon} alt="" width="50" height="46"/>
						<h3>Are you sure want to delete this ?</h3>
						<div className="m-t-20"> <a href="#" className="btn btn-white" data-bs-dismiss="modal" onClick={closeDeleteModal}>Close</a>
							<button type="submit" data-bs-dismiss="modal" className="btn btn-danger submit-form" onClick={handleDelete}>Delete</button>
						</div>
					</div>
				</div>
			</div>
			
		</div>
  </>
  )
}

export default SalaryBill