import React from "react";

export default function AuditTrail() {
  // Function to format date
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

  const records = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    currencyPair: "USD/EUR",
    rate: "0.85",
    dateOfEffect: formatDateTime("2023-10-12T10:00:00"), 
    lastUpdated: formatDateTime("2024-01-05T14:30:00"), 
    updatedBy: "Kennedy",
  }));

  return (
    <div className="p-4 rounded-t-lg mb-6 bg-white w-full flex flex-col ">
      <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>

      {/* Scrollable Table Container with Custom Scrollbar */}
      <div className="flex-1  rounded-lg pb-6  ">
        <table className="w-full bg-white">
          {/* Table Head (Sticky) */}
          <thead className="bg-white  top-0 z-10">
            <tr className="text-left text-[#808A92] font-light text-sm">
              <th className="py-2 px-4 border-b">Currency Pair</th>
              <th className="py-2 px-4  border-b">Rate</th>
              <th className="py-2 px-4 border-b">Date of Effect</th>
              <th className="py-2 px-4 border-b">Last Updated</th>
              <th className="py-2 px-4 border-b">Updated By</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="py-1 text-xs px-4">{record.currencyPair}</td>
                <td > <span className="py-1 text-xs px-6 bg-green-50  text-center font-semibold text-green-500">{record.rate}</span></td>
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
            {/* Extra Spacer Row */}
            <tr>
              <td colSpan="6" className="h-6"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
