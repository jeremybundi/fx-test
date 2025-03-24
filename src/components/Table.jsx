import React, { useState } from "react";

const Table = () => {
  const [data, setData] = useState([
    { paymentRecords: "Paybill", icon: "/svgs/paybill.svg", tumaRate: "165.231", weightedAvg: "4", markup: "1", finalRate: "85" },
    { paymentRecords: "MPESA", icon: "/svgs/mpesa.svg", tumaRate: "120", weightedAvg: "3", markup: "3", finalRate: "95" },
    { paymentRecords: "Bank", icon: "/svgs/bank.svg", tumaRate: "90", weightedAvg: "2", markup: "2", finalRate: "77" },
    { paymentRecords: "Card", icon: "/svgs/card.svg", tumaRate: "120", weightedAvg: "1", markup: "2", finalRate: "95" },
  ]);

  const [editableRow, setEditableRow] = useState(null);

  const handleEditClick = (index) => {
    setEditableRow(editableRow === index ? null : index);
  };

  /*const handleWeightedAvgChange = (index, value) => {
    const newData = [...data];
    newData[index].weightedAvg = value;
    calculateFinalRate(newData, index);
    setData(newData);
  }; */

  const handleMarkupChange = (index, value) => {
    const newData = [...data];
    newData[index].markup = value;
    calculateFinalRate(newData, index);
    setData(newData);
  };

  const handleFinalRateChange = (index, value) => {
    const newData = [...data];
    newData[index].finalRate = value;
    setData(newData);
  };

  const calculateFinalRate = (data, index) => {
    const tumaRate = parseFloat(data[index].tumaRate);
    const weightedAvg = parseFloat(data[index].weightedAvg);
    const markup = parseFloat(data[index].markup);

    if (!isNaN(tumaRate) && !isNaN(weightedAvg) && !isNaN(markup)) {
      const finalRate = tumaRate - (weightedAvg + markup);
      data[index].finalRate = finalRate.toFixed(2);
    }
  };

  return (
    <div className="overflow-x-auto rounded-t-xl bg-white mt-7 p-4">
      <table className="w-full text-left text-gray-700">
        <thead>
          <tr className="text-gray-500 font-[300] text-left text-[16px]">
            <th className="p-3">Payment Records</th>
            <th className="p-3">Tuma Rate at Cost</th>
           {/**  <th className="p-3">Weighted Average</th> */}
            <th className="p-3">Tuma Markup</th>
            <th className="p-3">Final Tuma Rate</th>
            <th className="p-3"></th> {/* Empty column for the pen icon */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t text-[17px] border-gray-200">
              {/* Payment Records with Icon */}
              <td className="p-3 flex items-center gap-3">
                <span className="p-3 bg-gray-200 my-2 rounded-full">
                  <img src={row.icon} alt={row.paymentRecords} className="w-6 h-6" />
                </span>
                <span className="text-[#101820] font-[600] text-center">
                  {row.paymentRecords}
                </span>
              </td>

              {/* Other Table Data */}
              <td className="p-3">
                <span className="block font-[600] bg-[#CD11261A] text-[#CD1126] p-2 pl-2 mr-8 rounded-md">{row.tumaRate}</span>
              </td>
             {/**  <td className="p-3">
                {editableRow === index ? (
                  <input
                    type="number"
                    value={row.weightedAvg}
                    onChange={(e) => handleWeightedAvgChange(index, e.target.value)}
                    className="block font-[600] bg-green-100 p-2 pl-2 mr-10 rounded-md w-20" // Fixed width
                  />
                ) : (
                  <span className="block font-[600] bg-green-100 p-2 pl-2 mr-10 rounded-md">{row.weightedAvg}</span>
                )}
              </td> */}
              <td className="p-3">
                {editableRow === index ? (
                  <input
                    type="number"
                    value={row.markup}
                    onChange={(e) => handleMarkupChange(index, e.target.value)}
                    className="block font-[600] bg-yellow-100 p-2 pl-2 mr-6 rounded-md w-20" // Fixed width
                  />
                ) : (
                  <span className="block font-[600] bg-yellow-100 p-2 pl-2 mr-6 rounded-md">{row.markup}</span>
                )}
              </td>
              <td className="p-3">
                {editableRow === index ? (
                  <input
                    type="number"
                    value={row.finalRate}
                    onChange={(e) => handleFinalRateChange(index, e.target.value)}
                    className="block font-[600] bg-[#27AE601A] text-[#27AE60] p-2 pl-2 mr-8 rounded-md w-20" // Fixed width
                  />
                ) : (
                  <span className="block font-[600] bg-[#27AE601A] text-[#27AE60] p-2 pl-2 mr-8 rounded-md">{row.finalRate}</span>
                )}
              </td>
              {/* Pen Icon */}
              <td className="py-3 pr-4">
                <img
                  src="/svgs/pen.svg"
                  alt="Edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEditClick(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;