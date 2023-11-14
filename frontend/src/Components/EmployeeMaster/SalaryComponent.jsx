import React, { useState } from 'react';

function SalaryComponent() {
  const [rows, setRows] = useState([
    {
      id: 1,
      salaryComponent: '',
      percentage: '',
      value: '',
      price: '',
    },
  ]);



  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: Date.now(),
        salaryComponent: '',
        percentage: '',
        value: '',
        price: '',
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card invoices-add-card">
            <div className="card-body">
              <form className="invoices-form">
                <div className="invoice-add-table">
                  <h4>Salary component</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Salary Components</th>
                          <th>%</th>
                          <th>Value</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}>
                            <td>
                              <input type="text" className="form-control" value={index + 1} readOnly />
                            </td>
                            <td>
                              <select className="form-control">
                                <option value="item1">Item 1</option>
                                <option value="item2">Item 2</option>
                                <option value="item3">Item 3</option>
                              </select>
                            </td>
                            <td>
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control" value={1000} readOnly />
                            </td>
                            <td className="add-remove text-end">
                              {index === rows.length - 1 && (
                                <a href="javascript:void(0);" className="me-2" onClick={handleAddRow}>
                                  <i className="fas fa-plus-circle"></i>
                                </a>
                              )}
                              {rows.length > 1 && (
                                <a href="javascript:void(0);" className="remove-btn" onClick={() => handleRemoveRow(row.id)}>
                                  <i className="fa fa-trash-alt"></i>
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="5" className="text-end"><strong>Total Amount:</strong></td>
                          <td><strong>123456.00</strong>
                            {/* Display the total amount here */}
                            {/* You can use the 'calculateTotalAmount' function to get the total */}
                          </td>
                         
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalaryComponent;
