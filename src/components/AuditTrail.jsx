import React from "react";

export default function AuditTrail() {
  const records = [
    { id: 1, currencyPair: "USD/EUR", rate: "0.85", dateOfEffect: "2023-01-01", lastUpdated: "2023-01-05", updatedBy: "Admin" },
    { id: 2, currencyPair: "USD/GBP", rate: "0.75", dateOfEffect: "2023-02-01", lastUpdated: "2023-02-05", updatedBy: "User1" },
    { id: 3, currencyPair: "USD/JPY", rate: "110.50", dateOfEffect: "2023-03-01", lastUpdated: "2023-03-05", updatedBy: "Admin" },
    { id: 4, currencyPair: "EUR/GBP", rate: "0.88", dateOfEffect: "2023-04-01", lastUpdated: "2023-04-05", updatedBy: "User2" },
    { id: 5, currencyPair: "EUR/JPY", rate: "130.25", dateOfEffect: "2023-05-01", lastUpdated: "2023-05-05", updatedBy: "Admin" },
    { id: 6, currencyPair: "GBP/JPY", rate: "150.00", dateOfEffect: "2023-06-01", lastUpdated: "2023-06-05", updatedBy: "User3" },
    { id: 7, currencyPair: "AUD/USD", rate: "0.70", dateOfEffect: "2023-07-01", lastUpdated: "2023-07-05", updatedBy: "Admin" },
    { id: 8, currencyPair: "CAD/USD", rate: "0.75", dateOfEffect: "2023-08-01", lastUpdated: "2023-08-05", updatedBy: "User4" },
    { id: 9, currencyPair: "NZD/USD", rate: "0.65", dateOfEffect: "2023-09-01", lastUpdated: "2023-09-05", updatedBy: "Admin" },
    { id: 10, currencyPair: "USD/CHF", rate: "0.90", dateOfEffect: "2023-10-01", lastUpdated: "2023-10-05", updatedBy: "User5" },
  ];

  return (
    <div className="p-4 rounded-t-lg mb-3 max-h-[56%] overflow-hidden  bg-white w-full">
      <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>
      <div className="w-full">
        <div className="overflow-y-auto max-h-[50vh]">
          <table className="w-full bg-white  border-gray-200 rounded-lg">
            {/* Table Head */}
            <thead className=" text-gray-500 bg-white sticky top-0 z-10">
              <tr className="text-left font-normal text-sm">
                <th className="py-2  px-4 border-b">Currency Pair</th>
                <th className="py-2 px-4 border-b">Rate</th>
                <th className="py-2 px-4 border-b">Date of Effect</th>
                <th className="py-2 px-4 border-b">Last Updated</th>
                <th className="py-2 px-4 border-b">Updated By</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b mt-2">
                  <td className="py-2 px-4">{record.currencyPair}</td>
                  <td className="py-2 px-4">{record.rate}</td>
                  <td className="py-2 px-4">{record.dateOfEffect}</td>
                  <td className="py-2 px-4">{record.lastUpdated}</td>
                  <td className="py-2 px-4">{record.updatedBy}</td>
                  <td className="py-2 px-4">
                    <button className="px-4 py-2 text-blue-500 rounded-lg text-sm underline focus:outline-none">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
