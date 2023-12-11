import React from 'react'
import logo from '../../assets/img/logo.jpg'
function SalaryvoucherPrint() {
  return (
    <>
        <div className="card">
  <div className="card-header" />
  <div className="card-body">
    <div className="container">
      <div className="row">
      <div className="col-xl-2">
          <img src={logo} alt="" width={155} height={65}/>
        </div>
        <div className="col-xl-9">
          <ul className="list-unstyled float-end">
            <li className='text-center' style={{ fontSize: 25, color: "red" }}>THE KERALA STATE CO-OPERATIVE MARKETING FEDERATION LTD</li>
            <li className='text-center'>P.B.NO. 2024 GANDHI NAGAR, KOCHI- 682020 Kerala, India</li>
          </ul>
        </div>
      </div>
      <div className="row text-center">
        {/* <h3
          className="text-uppercase text-center mt-3"
          style={{ fontSize: 25 }}
        >
          Invoice
        </h3> */}
        
        <p>123456789</p>
      </div>
      <div className="row mx-3">
        <table className="table">
          <thead>
            <tr>      
              <th scope="col">Sl NO</th>
              <th scope="col">Employee No</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Gross Salary</th>
              <th scope="col">Deductions</th>
              <th scope="col">Emplyr Contr</th>
              <th scope="col">Net Pay</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                42243443
              </td>
              <td>
                Shahid Vk
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 543543
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                42243443
              </td>
              <td>
                Shahid Vk
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 543543
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                42243443
              </td>
              <td>
                Shahid Vk
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 543543
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                42243443
              </td>
              <td>
                Shahid Vk
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 500,00
              </td>
              <td>
                <i className="fas fa-rupee-sign" /> 543543
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <ul className="list-unstyled float-end me-0  text-end">
            <li>
              <span className="me-0 float-start">Total Earnings:</span>
              <i className="fas fa-rupee-sign" /> 6850,00
            </li>
            <li>
              <span className="me-0 float-start">Total Deduction:</span>
              <i className="fas fa-rupee-sign" /> 6850,00
            </li>
            
          </ul>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xl-11" style={{ marginLeft: 60 }}>
          <p
            className="float-end"
            style={{
              fontSize: 30,
              color: "red",
              fontWeight: 400,
              fontFamily: "Arial, Helvetica, sans-serif"
            }}
          >
            Total:
            <span>
              <i className="fas fa-dollar-sign" /> 6350,00
            </span>
          </p>
        </div>
      </div>
      <div className="row mt-2 mb-5">
        <p className="fw-bold">
          Date: <span className="text-muted">23 June 20221</span>
        </p>
        <p className="fw-bold mt-3">Signature:</p>
      </div>
    </div>
  </div>
  <div className="card-footer bg-black" />
</div>

    </>
  )
}

export default SalaryvoucherPrint