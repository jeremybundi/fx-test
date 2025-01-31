"use client";

import React, { useState, useEffect } from "react";

export default function AuditTrail() {
  // Function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // State to store audit records
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    // Get stored audit trail from localStorage
    const savedRecords = JSON.parse(localStorage.getItem("auditTrail")) || [];

    // Get latest currency data
    const savedData = JSON.parse(localStorage.getItem("currencyData"));

    if (savedData) {
      // Construct a new audit record
      const newRecord = {
        id: savedRecords.length + 1,
        currencyPair: `${savedData.baseCurrency}/${savedData.destinationCurrency}`,
        rate: savedData.exchangeRate.toFixed(2),
        dateOfEffect: formatDateTime(`${savedData.dateOfEffect}T10:00:00`), 
        lastUpdated: formatDateTime(new Date()), 
        updatedBy: "Admin User",
      };

      // Append new record to existing records
      const updatedRecords = [newRecord, ...savedRecords];

      // Save updated records to localStorage
      localStorage.setItem("auditTrail", JSON.stringify(updatedRecords));

      // Update state
      setRecords(updatedRecords);
    }
  }, []);

  // Get the records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(records.length / recordsPerPage);

  return (
    <div className="p-4 rounded-t-lg mb- bg-white w-full flex flex-col">
      <h1 className="text-2xl ml-3 font-bold mb-4">Audit Trail</h1>

      {/* Scrollable Table Container */}
      <div className="flex-1 rounded-lg pb-6">
        <table className="w-full bg-white">
          {/* Table Head */}
          <thead className="bg-white top-0 z-10">
            <tr className="text-left text-[#808A92] font-light text-sm">
              <th className="py-2 px-4 border-b">Currency Pair</th>
              <th className="py-2 px-4 border-b">Rate</th>
              <th className="py-2 px-4 border-b">Date of Effect</th>
              <th className="py-2 px-4 border-b">Last Updated</th>
              <th className="py-2 px-4 border-b">Updated By</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="py-1 text-xs px-4">{record.currencyPair}</td>
                <td>
                  <span className="py-1 text-xs px-6 bg-green-50 text-center font-semibold text-green-500">
                    {record.rate}
                  </span>
                </td>
                <td className="py-1 text-xs px-4">{record.dateOfEffect}</td>
                <td className="py-1 text-xs px-4">{record.lastUpdated}</td>
                <td className="py-1 text-xs px-4">{record.updatedBy}</td>
                <td className="py-1 text-xs px-4">
                  <button className="px-4 py-1 text-blue-500 rounded-lg text-sm underline focus:outline-none">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {/* Spacer Row */}
            <tr>
              <td colSpan="6" className="h-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-2">
        <div>
      <button
          onClick={() => paginate(1)}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-xl disabled:opacity-50"
          disabled={currentPage === 1}
        >
          &lt;&lt; First
        </button>

        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 mx-1 ml-4 bg-gray-700 text-white rounded-xl disabled:opacity-50"
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>
        </div>
        <div>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-xl disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>

        <button
          onClick={() => paginate(totalPages)}
          className="px-4 py-2 mx-1 ml-4 bg-gray-700 text-white rounded-xl disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Last &gt;&gt;
        </button>
        </div>
      </div>
    </div>
  );
}
