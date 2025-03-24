import { useEffect, useState } from "react";
import Image from 'next/image';
import closeIcon from '../../public/images/close.png';

const Update1 = ({ isOpen, onClose, rateValue, onRateChange }) => {
  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSetNewRate = () => {
    setIsLoading(true); // Show spinner and hide buttons

    // Simulate a loading delay (e.g., API call)
    setTimeout(() => {
      alert(`New rate set to: ${rateValue}`);
      setIsLoading(false); // Hide spinner
      onClose(); // Close the modal
    }, 2000); // 2-second delay
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center font-poppins justify-end bg-black bg-opacity-50 z-50">
      <div className="bg-[#F3F5F8] p-6 w-[830px] px-10 h-screen rounded-lg shadow-lg flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between">
          <span className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Tuma App Rates</h2>
            <p className="text-gray-500 text-[18px] mb-8 font-[500]">Current Rate: 1 GBP = 163.04 KES</p>
          </span>

          <button className="absolute top-3 right-3" onClick={onClose}>
            <Image src={closeIcon} alt="Close Modal" width={40} height={35} />
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl items-center flex px-6 p-5">
          <p className="text-xl font-[700] mr-4">Current Bank Rate</p>
          <span className="border items-center flex rounded-lg px-3 py-4 max-w-[350px]">
            <h1 className="px-4 mr-2 text-2xl font-semibold">1</h1>
            <span className="px-2 rounded-lg flex gap-3 py-1 bg-[#F3F5F8]">
              <Image src="/images/gbp.png" alt="GBP" width={30} height={20} />
              <p className="ml-1 mr-3 text-[20px] font-500">GBP</p>
              <Image src="/svgs/arrow.svg" alt="Arrow" width={16} height={20} />
            </span>
          </span>
          <p className="mx-5 text-gray-800 text-xl font-[600]">=</p>
          <span className="border items-center flex rounded-lg py-4 max-w-[350px]">
            <input
              type="text"
              value={rateValue}
              onChange={onRateChange}
              className="font-[600] text-[20px] w-[100px] px-2 pl-3 font-500 outline-none"
            />
            <span className="bg-[#F3F5F8] rounded-lg flex mx-2 px-2 py-1">
              <Image src="/images/kes.png" alt="kes" width={30} height={20} />
              <p className="mx-5 text-[20px] font-500">KES</p>
              <Image src="/svgs/arrow.svg" alt="Arrow" width={16} height={20} />
            </span>
          </span>
        </div>


        <div className="bg-white p-6 mt-10 rounded-xl flex items-center gap-2">
  <label className="text-gray-800 text-[20px] mr-4 font-[600]">Weighted Average:</label>
  <input 
    type="number" 
    className="border rounded-lg px-3 py-3 text-[19px] text-gray-500 font-[600] focus:outline-none focus:ring focus:ring-blue-300"
    placeholder="Enter value"
  />
</div>


        {/* Footer Buttons Section (Pinned to Bottom) */}
        <div className="mt-auto flex justify-between gap-4 p-4 mb-5">
          {isLoading ? (
            // Show Spinner when loading
            <div className="flex justify-center items-center w-full">
              <div className="dots-spinner">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          ) : (
            // Show Buttons when not loading
            <>
              <button
                onClick={onClose}
                className="px-28 py-4 text-[18px] font-[600] text-[#276EF1] border-[#276EF1] border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSetNewRate}
                className="px-24 py-4 text-[18px] font-[600] text-white bg-[#276EF1] rounded-lg hover:bg-blue-700 transition-colors"
              >
                Set New Rate
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom CSS for Spinner */}
      <style jsx>{`
        .dots-spinner {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .dots-spinner .dot {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #6b7280; /* Grey color */
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .dots-spinner .dot:nth-child(1) {
          left: 8px;
          animation: dots-spinner1 0.6s infinite;
        }
        .dots-spinner .dot:nth-child(2) {
          left: 8px;
          animation: dots-spinner2 0.6s infinite;
        }
        .dots-spinner .dot:nth-child(3) {
          left: 32px;
          animation: dots-spinner2 0.6s infinite;
        }
        .dots-spinner .dot:nth-child(4) {
          left: 56px;
          animation: dots-spinner3 0.6s infinite;
        }
        @keyframes dots-spinner1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes dots-spinner2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
        @keyframes dots-spinner3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Update1;