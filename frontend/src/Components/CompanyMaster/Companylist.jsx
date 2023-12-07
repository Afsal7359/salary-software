import React,{useEffect,useState} from 'react'
import { GetAllCompany } from '../../Apicalls/Company';
import CompanyEdit from '../Modal/CompanyEdit';


const Companylist=  React.memo(({formdata,setFormData})=> {


    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    if (formdata.length!=0) {
        const isNameInData = Data.some((item) => item.name === formdata.name);
        if (!isNameInData) {
          setData((prevData) => [formdata,...prevData]);
          setFormData([])
        }
     }
     useEffect(() => {
        async function fetchData() {
          try {
            const result = await GetAllCompany();
            setData(result.data);
            setIsLoading(false);
            // setrender(!render)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, []);

      if (isLoading) {
        return <div>Loading...</div>; // You can render a loading indicator here
      }
      

       
      const handleEditClick = (item) => {
        setShowEditModal(true);
        setSelectedItem(item);
      };

const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
<div className="card-box profile-header">
  <div className="row">
    {Data.length === 0 ?(
        <p>No Data Available</p>
    ):(
     
        <div className="col-md-12">
               {Data.map((item, index) => (
        <div className="profile-view">
          <div className="profile-img-wrap">
            <div className="profile-img">
              <a href="#">
                <img className="avatar" src={item.image} alt="" />
              </a>
            </div>
          </div>
          <div className="profile-basic">
            <div className="row">
              <div className="col-md-5">
                <div className="profile-info-left">
                  <h3 className="user-name m-t-0 mb-0">{item.name}</h3>
                  <small className="text-muted">{item.address}</small>
                  <div className="staff-id"></div>
                  <div className="staff-msg">
                            <button
                             onMouseEnter={() => {
                                setSelectedItem(item);
                                setShowEditModal(true);
                              }}
                               onClick={()=>handleEditClick(item)} 
                               className="btn btn-primary submit-form me-2" data-bs-toggle="modal"
                                data-bs-target="#delete_patients"
                                >
                                 Edit Profile
                              </button>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <ul className="personal-info">
                  <li>
                    <span className="title">Phone:</span>
                    <span className="text">
                      <a >{item.phone}</a>
                    </span>
                  </li>
                  <li>
                    <span className="title">Email:</span>
                    <span className="text">
                      <a >{item.email}
                      </a>
                    </span>
                  </li>
                  
                  <li>
                    <span className="title">Gst:</span>
                    <span className="text"><a>
                    {item.gst}</a>
                    </span>
                  </li>
                  <li>
                    <span className="title">Pincode: </span>
                    <span className="text"><a>{item.pincode}</a></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        ))}
        </div>
    
    )}
   
  </div>
</div>

{showEditModal && selectedItem && (
  console.log("Data", selectedItem), // Make sure you're seeing the data in the console

  <CompanyEdit  
    item={selectedItem}
    closeEditModal={closeEditModal}
    setData={setData}
    Data={Data}
  />
)}
    </>
  )
}
)
export default Companylist