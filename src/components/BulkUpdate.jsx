import { useState } from 'react';
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import usdFlag from "../../public/images/usd.png";
import gbpFlag from "../../public/images/gbp.png";
import eurFlag from "../../public/images/eur.png";
import ConfirmationModal from './MultipleConfirmationModal';
import SuccessfulUpdateModal from './SuccessfulUpdate'; 
import { FaCalendarAlt } from 'react-icons/fa'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
//import { setHours, setMinutes } from 'date-fns';
import '@/app/globals.css'; 



const BulkUpdate = ({ onClose }) => {
  const [usdMarkup, setUsdMarkup] = useState('0');
  const [gbpMarkup, setGbpMarkup] = useState('0');
  const [eurMarkup, setEurMarkup] = useState('0');
  const [dateOfEffect, setDateOfEffect] = useState(new Date());
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleUpdate = () => {
    if (!dateOfEffect) {
      alert("Please select a valid date of effect.");
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmationModal(false);
    setShowSuccessModal(true);
  };
  const handleReset = () => {
    setUsdMarkup('0');
    setGbpMarkup('0');
    setEurMarkup('0');
    setDateOfEffect(new Date()); // Reset to today's date
  };
  const handleCloseAll = () => {
    setShowConfirmationModal(false);
    setShowSuccessModal(false);
    onClose(); // Close the BulkUpdate modal
  };
  

  return (
    <div>
      {/* Main BulkUpdate Modal */}
      <div className="fixed font-poppins inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white p-6 px-16 rounded-xl h-[calc(100vh*0.9)] w-[38%] relative">
          {/* Close Button */}
          <button className="absolute top-3 right-3" onClick={onClose}>
            <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
          </button>

          <h2 className="text-3xl font-semibold text-center mb-6 mt-10">Edit Tuma Markups</h2>
          <p className="text-center text-gray-400 mb-6">
            Changes made here will apply across all destination currencies. Ensure you review before saving.
          </p>
                  {/* Headings for Labels and Inputs */}
                  <div className="flex justify-between text-gray-600 font-medium mb-2">
            <span>Base Currency</span>
            <span className="mr-24">Tuma Markup</span>
          </div>

          {/* Currency Inputs */}
          <div className="space-y-4">
            {[{ label: 'USD', flag: usdFlag, value: usdMarkup, setValue: setUsdMarkup },
              { label: 'GBP', flag: gbpFlag, value: gbpMarkup, setValue: setGbpMarkup },
              { label: 'EUR', flag: eurFlag, value: eurMarkup, setValue: setEurMarkup }].map((currency, index) => (
              <div key={index} className="flex space-x-3">
                <span className="border flex items-center rounded-md py-2 w-64">
                  <Image src={currency.flag} alt={`${currency.label} Flag`} width={30} height={20} className="ml-2" />
                  <label className="font-semibold ml-2">{currency.label}</label>
                </span>
                <div className="relative w-full">
                  <input
                    type="number"
                    placeholder="Enter Markup %"
                    value={currency.value}
                    onChange={(e) => currency.setValue(e.target.value)}
                    onBlur={() => currency.setValue(currency.value || '0')}
                    className="w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 text-gray-500
                   transform -translate-y-1/2 text-xl">%</span>
                </div>
              </div>
            ))}
          </div>
          {/* Date of Effect */}
          <div className="mt-6">
            <label className="block text-gray-600 font-medium mb-2">Date of Effect</label>
            <div className="relative">
              {/* Calendar Icon inside the DatePicker */}
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 z-10 mr-2" />

              <DatePicker
            selected={dateOfEffect}
            onChange={(date) => setDateOfEffect(date)}
            dateFormat="MMMM d, yyyy" // Only display date
            minDate={new Date()} // Prevent selecting past dates
            className="pl-10 pr-4 border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-gray-500"
          />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between px-10 mt-10">
            <button
              className="px-10 py-2 border-2 border-gray-800 text-lg font-semibold rounded-md hover:text-white hover:bg-gray-600"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="px-10 py-2 bg-gray-800 text-lg font-semibold text-white rounded-md hover:bg-gray-600"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmationModal(false)}
          usdMarkup={usdMarkup}
          gbpMarkup={gbpMarkup}
          eurMarkup={eurMarkup}
          dateOfEffect={dateOfEffect ? dateOfEffect.toISOString() : null} // Convert Date to string
          onSave={handleConfirm} // Call success modal on confirm
        />
      )}

          {/* Success Modal */}
      {showSuccessModal && (
        <SuccessfulUpdateModal
        onClose={handleCloseAll}
        usdMarkup={usdMarkup}
          gbpMarkup={gbpMarkup}
          eurMarkup={eurMarkup}
          dateOfEffect={dateOfEffect}
        />
      )}
          </div>
        );
      };

export default BulkUpdate;














