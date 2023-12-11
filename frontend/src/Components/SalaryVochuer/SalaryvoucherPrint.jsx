import React, { useState,useEffect } from 'react';
import { getallSalarybill } from '../../Apicalls/salaryBill';

const SalaryvoucherPrint = () => {
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');
// Your data array
  const [Data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getallSalarybill();
        console.log(result.data, 'response');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Function to handle data filtering based on selected date range
  const handleFilter = () => {
    // Filter data based on the selected date range (fromMonth to toMonth)
    const filteredData = Data.filter(item => {
      // Assuming your data items have a 'date' field representing the month
      const itemMonth = item.date; // Replace 'date' with your actual field name

      // Check if itemMonth is within the selected range
      return itemMonth >= fromMonth && itemMonth <= toMonth;
    });

    // Use filteredData for your report or display
    console.log(filteredData); // For example, log filtered data to console
  };

  return (
    <div>
      <label>
        From Month:
        <input
          type="date"
          value={fromMonth}
          onChange={(e) => setFromMonth(e.target.value)}
        />
      </label>
      <label>
        To Month:
        <input
          type="date"
          value={toMonth}
          onChange={(e) => setToMonth(e.target.value)}
        />
      </label>
      <button onClick={handleFilter}>Generate Report</button>
    </div>
  );
};

export default SalaryvoucherPrint;
