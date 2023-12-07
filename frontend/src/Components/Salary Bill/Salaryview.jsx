import React,{useEffect, useRef, useState} from 'react'
import logo from '../../assets/img/logo.jpg'
import './Salaryview.css'
import { useReactToPrint } from 'react-to-print';
import { GetAllCompany } from '../../Apicalls/Company';
function Salaryview(item, setData, Data,) {
console.log(item.item ,'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [component, setComponent] = useState(item.item.tablerow);
  const [increment, setIncrement] = useState([]);
  const [decrement, setDecrement] = useState([]);
  const [basicSalary,setBasicSalary]=useState(item.item?item.item.basicSalary:"")
  const [employeedata,setEmployeedata]=useState(item?item.item:"")
  const CompanyDataFetch = async()=>{
    try {
    const response =  await GetAllCompany();
    if(response.success){
      setCompany(response.data)
    }else{
      setCompany([]);
    }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    CompanyDataFetch()
    let newIncrement = [];
    let newDecrement = [];
  
    component.forEach((item) => {
      if (item.salaryComponent.type === 'Increment') {
        newIncrement.push(item);
      } else {
        newDecrement.push(item);
      }
    });
  
    setIncrement(newIncrement);
    setDecrement(newDecrement);
  }, [component]);
  console.log('Increment',increment);
  console.log('decrement',decrement);
  
  const [company,setCompany]=useState([]);

  
console.log('CompanyData',company);
  return (
    <>
      <button onClick={handlePrint}>Print</button>
      <div id="content-to-print" className="main" ref={componentRef}>
      <table>
    <tbody>
      <tr
        height="170px"
       
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: 24,
          fontWeight: 600
        }}
      >
        <td>
        <img src={company[0]?company[0].image:""} alt="" height={55} width={155}/>
        </td>
        <td colSpan={4}> <h3>{company[0]?company[0].name:""}</h3><h5>{company[0]?company[0]. address:""}</h5></td>
      </tr>
      <tr 
        height="55px"
        style={{
          backgroundColor: "#fae3bd",
          color: "#000",
          textAlign: "center",
          fontSize: 24,
          fontWeight: 600
        }}>
     <td colSpan={4}><h1>EMPLOYEE PAY SLIP </h1></td>
      </tr>
     
      {/*---1 row-*/}
      <tr>
        <th  className='text'>Name</th>
        <td>{employeedata.employeeid.name}</td>
      
      </tr>
      {/*----2 row--*/}
      <tr>
        <th  className='text'>Employee code</th>
        <td>{employeedata.employeeid.employeeno}</td>
       
      </tr>
      {/*----3row--*/}
      <tr>
        <th className='text'>Designation</th>
        <td>{employeedata.employeeid.PostId.designation}</td>
      
      </tr>
   
    </tbody>
  </table>

  <table>
    <tbody>
        <tr>
            <th className="headnone">Earnings</th>
            <th className="amount earnings">Amount</th>
        </tr>
        <tr>
            <td className='tabledata'>Basic Salary </td>
            <td className='earnings'>{basicSalary}.00</td>
        </tr>
        {increment.map((data, index) => (
      <tr key={index}>
        <td className='tabledata'>{data.salaryComponent.name}</td>
        <td className='earnings'>{data.price}.00</td>
      </tr>
    ))}
       
      
    </tbody>
</table>

  <table>
    <tbody>
      <tr>
       
        <th className='headnone'>Deductions</th>
        <th className='amount deduction'>Amount</th>
      
      </tr>

        
       
        {decrement[0]?decrement.map((data,index)=>(
          <tr key={index}>
          <td className='tabledata'>{data.salaryComponent.name}</td>
          <td className='deduction'>{data.price}.00</td>
        </tr>
        )): <tr>
        <td className='tabledata'>no deduction</td>
        <td className='deduction'>000.00</td>
      </tr>}
        
      
     
    </tbody>
  </table>
  <table>
    <tbody>
      <tr>
     
        <th className="headnone">Employer Contribution</th>
        <th className="amount contributions">Amount</th>
      </tr>
      <tr>
        
        <td className='tabledata'>EPF Empr Con </td>
        <td className='contributions'>454545.00</td>
      </tr>
      <tr>
        
        <td className='tabledata'>PF Empr Con</td>
        <td className='contributions'>5000.00</td>
      </tr>
      <tr>
        <td className='tabledata'>special Allowance</td>
        <td className='contributions'>400.00</td>
    
      </tr>
     
   
    </tbody>
  </table>

        <div className='total totals'>
          <h4 className='h4total'>Total Earnings : <span className='span'>{item.item?item.item.totalincrement:""}.00</span></h4>
        </div>
        
        <div className='total'>
          <h4 className='h4total'>Total Deductions : <span className='span'>{item.item?item.item.totaldeduction:""}.00</span></h4>
        </div>
        
        <div className='total'>
          <h4 className='h4total'>Total Net Pay : <span className='span'>{item.item?item.item.totalAmount:""}.00</span></h4>
        </div>
  {/* <table>
    <tbody>
  
    <tr>
      <th colSpan={5}></th>
        <th className='headnone'>Gross Earnings</th>
        <td  className='headnone'>Rs.38500</td>
      
    </tr>
    <tr>    
      <th colSpan={5}></th>
        <th className='headnone'>Gross Deductions</th>
        <td  className='headnone'>Rs.3000</td>
    
        
   
      </tr>
      <br />
      <tr>
        <th colSpan={5}></th>
        
        <th className='headnone'>NET PAY</th>
        <td  className='headnone'>Rs.35500</td>
      
     
        
        <td />
      </tr>
    </tbody>
  </table> */}
      </div>
    </>
  );
}

export default Salaryview