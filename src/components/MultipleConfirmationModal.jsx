import Image from "next/image";
import closeIcon from "../../public/images/close.png";

const MultipleConfirmationModal = ({ onClose, usdMarkup, gbpMarkup, eurMarkup, dateOfEffect, onSave }) => {
  return (
    <div className="fixed font-poppins inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
        <div className="bg-white p-6 px-16 rounded-xl h-[calc(100vh*0.9)] w-[38%] relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
        </button>

        <h2 className="text-2xl font-semibold mt-16 px-16 text-center ">
          You've Set 
        </h2>
        <h2 className="text-2xl font-semibold  px-1 text-center mb-6">
         Tuma Markups as follows:
        </h2>

        <div className="flex justify-center text-lg">
          <p className="mr-6 text-center">USD → {usdMarkup}%,</p>
          <p className="mr-6 text-center">GBP → {gbpMarkup}%,</p>
          <p className="text-center">EUR → {eurMarkup}%</p>
        </div>

        <div className="flex justify-center mt-4">
          <p className="text-center">Date of Effect: {dateOfEffect}</p>
        </div>         
         <p className="text-gray-400 text-center text-lg mt-32 px-6 mb-16">Confirm you want to proceed
           with applying these rates to all destination currencies?"</p>

        {/* Buttons */}
        <div className="flex justify-between px-10 mt-32">
          <button
            className="px-12 py-1  border-2 border-gray-800 text-lg font-semibold rounded-md hover:text-white hover:bg-gray-600"
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="px-12 py-1 bg-gray-800 text-lg font-semibold text-white rounded-md hover:bg-gray-600"
            onClick={onSave}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleConfirmationModal;
