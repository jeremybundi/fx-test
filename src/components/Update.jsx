import { useEffect, useState } from "react";
import Image from 'next/image';
import Table from './Table';
import closeIcon from '../../public/images/close.png';
import Update1 from './Update1'; 

const Update = ({ isOpen, onClose }) => {
  const [dateOfEffect, setDateOfEffect] = useState("2023-10-15"); // Add this state
  const [timeOfEffect, setTimeOfEffect] = useState("10:30 AM"); 
  const [isEditable, setIsEditable] = useState(false); 
  const [rateValue, setRateValue] = useState("166.74");
  const [weightedAverage, setWeightedAverage] = useState("0.10"); 
  const [isUpdate1Open, setIsUpdate1Open] = useState(false); 

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleRateClick = () => {
    setIsEditable(true); 
    setIsUpdate1Open(true); 
  };

  const handleRateChange = (e) => {
    setRateValue(e.target.value); 
  };

  const handleRateBlur = () => {
    setIsEditable(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center font-poppins justify-end bg-black bg-opacity-50 z-50">
      <div className="bg-[#F3F5F8] p-6 w-[830px] rounded-lg h-screen shadow-lg">
        <span className="justify-between">
          <span className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Tuma App Rates</h2>
            <p className="text-gray-500 text-[18px] m-8 font-[500]">Current Rate: 1 GBP = 163.04 KES</p>
          </span>

          <button className="absolute top-3 right-3" onClick={onClose}>
            <Image src={closeIcon} alt="Close Modal" width={40} height={35} />
          </button>
        </span>

        <div className="bg-white rounded-xl items-center flex px-6 p-5">
          <p className="text-xl font-[700] mr-4">Current Bank Rate</p>
          <span className="border items-center flex rounded-lg px-3 py-4">
            <h1 className="px-4 mr-2 text-2xl font-semibold">1</h1>
            <span className="px-2 rounded-lg flex gap-3 py-1 bg-[#F3F5F8]">
              <Image src="/images/gbp.png" alt="GBP" width={30} height={20} />
              <p className="ml-1 mr-3 text-[20px] font-500">GBP</p>
              <Image src="/svgs/arrow.svg" alt="Arrow" width={16} height={20} />
            </span>
          </span>
          <p className="mx-5 text-gray-800 text-2xl font-[600]">=</p>
          <span className="border items-center flex rounded-lg px-3 py-4">
            {isEditable ? (
              <input
                type="text"
                value={rateValue}
                onChange={handleRateChange}
                onBlur={handleRateBlur}
                autoFocus
                className="px-2 mr-2 text-2xl font-semibold outline-none"
              />
            ) : (
              <h1 className="px-2 mr-2 text-2xl font-semibold cursor-pointer" onClick={handleRateClick}>
                {rateValue}
              </h1>
            )}
            <span className="px-2 rounded-lg flex gap-3 py-1 bg-[#F3F5F8]">
              <Image src="/images/kes.png" alt="kes" width={30} height={20} />
              <p className="ml-1 mr-3 text-[20px] font-500">Kes</p>
              <Image src="/svgs/arrow.svg" alt="Arrow" width={16} height={20} />
            </span>
          </span>
        </div>

        {/* Weighted Average Section */}
        <div className="bg-white p-6 mt-6 rounded-xl flex items-center gap-2">
          <label className="text-gray-800 text-[18px] mr-4 font-[600]">Weighted Average:</label>
          <input
            type="number"
            value={weightedAverage}
            readOnly // Make the input non-editable for now
            className="border rounded-lg px-3 py-3 text-[19px] text-gray-500 font-[600] focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Loading..."
          />
        </div>

        <div>
          <Table />
        </div>

        {/* Date of Effect Section */}
        <div className="mt-6">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-[17px] font-medium text-gray-700 mb-2">Date Of Effect</label>
              <div className="relative">
                <input
                  type="text"
                  value={dateOfEffect}
                  readOnly // Make the input non-editable
                  className="block w-48 px-6 py-3 border border-gray-300 text-[16px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12" // Add padding for the icon
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image src="/svgs/calendar.svg" alt="Calendar" width={26} height={20} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-[17px] font-medium text-gray-700 mb-2">Time Of Effect</label>
              <div className="relative">
                <input
                  type="text"
                  value={timeOfEffect}
                  readOnly
                  className="block w-48 px-6 py-3 border border-gray-300 text-[16px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12" // Add padding for the icon
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image src="/svgs/clock.svg" alt="Clock" width={26} height={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the Update1 modal */}
      {isUpdate1Open && (
        <Update1
          isOpen={isUpdate1Open}
          onClose={() => setIsUpdate1Open(false)}
          rateValue={rateValue}
          onRateChange={handleRateChange}
        />
      )}
    </div>
  );
};

export default Update;