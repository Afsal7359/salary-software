import React,{useRef} from 'react'
import { useReactToPrint } from 'react-to-print';
import logo from '../../assets/img/logo.jpg';
import './Salaryview.css';
const Salarybillprint= React.forwardRef(({ logo }, ref) =>  {
  return (
    <>
   <div ref={ref} className='main'>
  
  </div>

    </>
  )
});

export default Salarybillprint