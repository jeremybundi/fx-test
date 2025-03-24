import React, { useState } from 'react';

export default function AuditTrail() {
  // Function to generate records dynamically
  const generateRecords = (length) => {
    const records = [];
    const channels = ['Paybill', 'M-Pesa', 'Bank', 'Card'];
    const currencyPairs = ['GBP/KES', 'USD/KES', 'EUR/KES'];
    const updatedByOptions = ['Admin', 'Manager', 'Supervisor'];

    for (let i = 1; i <= length; i++) {
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      const randomCurrencyPair = currencyPairs[Math.floor(Math.random() * currencyPairs.length)];
      const randomUpdatedBy = updatedByOptions[Math.floor(Math.random() * updatedByOptions.length)];

      records.push({
        id: i,
        currencyPair: randomCurrencyPair,
        channel: randomChannel,
        initialTumaRate: (Math.random() * 200).toFixed(2), // Random rate between 0 and 200
        finalTumaRate: (Math.random() * 200).toFixed(2), // Random rate between 0 and 200
        dateOfEffect: `2023-10-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`, // Random date in October 2023
        timeOfEffect: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`, // Random time
        updatedBy: randomUpdatedBy,
      });
    }

    return records;
  };

  // Generate 50 records
  const [records, setRecords] = useState(generateRecords(50));

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="p-4 bg-white rounded w-full px-14 flex flex-col">
      <h1 className="text-lg font-bold ml-6 mb-4 mt-6">Audit Trail</h1>

      <div className="flex-1 pb-6">
        <table className="w-full border bg-white">
          <thead>
            <tr className="text-left bg-gray-50 text-gray-500 text-sm">
              <th className="py-2 px-4 border-b">Currency Pair</th>
              <th className="py-2 px-4 border-b">Channel</th>
              <th className="py-2 px-4 border-b">Initial Tuma Rate</th>
              <th className="py-2 px-4 border-b">Final Tuma Rate</th>
              <th className="py-2 px-4 border-b">Date of Effect</th>
              <th className="py-2 px-4 border-b">Time of Effect</th>
              <th className="py-2 px-4 border-b">Updated By</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="py-2 px-4 text-sm">{record.currencyPair}</td>
                <td className="py-2 px-4 text-sm">{record.channel}</td>
                <td className="py-2 px-4 text-sm">{record.initialTumaRate}</td>
                <td className="py-2 px-4 text-sm">{record.finalTumaRate}</td>
                <td className="py-2 px-4 text-sm">{record.dateOfEffect}</td>
                <td className="py-2 px-4 text-sm">{record.timeOfEffect}</td>
                <td className="py-2 px-4 text-sm">{record.updatedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <div>
          <button
            onClick={() => paginate(1)}
            className="px-4 py-2 mx-1 bg-gray-700 text-white font-semibold rounded-lg disabled:opacity-50"
            disabled={currentPage === 1}
          >
            &lt;&lt; First
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-4 py-2 mx-1 bg-gray-700 text-white font-semibold rounded-lg disabled:opacity-50"
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
        </div>
        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 mx-1 bg-gray-700 text-white font-semibold rounded-lg disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
          <button
            onClick={() => paginate(totalPages)}
            className="px-4 py-2 mx-1 bg-gray-700 text-white font-semibold rounded-lg disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Last &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}