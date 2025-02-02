import { useState } from 'react';
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import usdFlag from "../../public/images/usd.png";
import gbpFlag from "../../public/images/gbp.png";
import eurFlag from "../../public/images/eur.png";
import ConfirmationModal from './MultipleConfirmationModal'; // Import the new modal

const BulkUpdate = ({ onClose }) => {
  const [usdMarkup, setUsdMarkup] = useState('');
  const [gbpMarkup, setGbpMarkup] = useState('');
  const [eurMarkup, setEurMarkup] = useState('');
  const [dateOfEffect, setDateOfEffect] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleUpdate = () => {
    setShowConfirmationModal(true);
  };

  const handleSave = () => {
    // Handle the save logic here (e.g., make an API call to update markups)
    setShowConfirmationModal(false);
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

          <h2 className="text-3xl font-semibold text-center mb-6 mt-10">
            Edit Tuma Markups
          </h2>

          <p className="text-center text-gray-400 mb-6">
            Changes made here will apply across all destination currencies. Ensure you review before saving.
          </p>

          {/* Headings for Labels and Inputs */}
          <div className="flex justify-between text-gray-600 font-medium mb-2">
            <span>Base Currency</span>
            <span className="mr-24">Tuma Markup</span>
          </div>

          {/* Currency Input Fields */}
          <div className="space-y-4">
            {/* USD */}
            <div className="flex space-x-3">
              <span className="border flex items-center rounded-md py-2 w-64">
                <Image src={usdFlag} alt="USD Flag" width={30} height={20} className="ml-2" />
                <label className="font-semibold ml-2">USD</label>
              </span>
              <input
                type="number"
                placeholder="Enter Markup %"
                value={usdMarkup}
                onChange={(e) => setUsdMarkup(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* GBP */}
            <div className="flex space-x-3">
              <span className="border flex items-center rounded-md py-2 w-64">
                <Image src={gbpFlag} alt="GBP Flag" width={30} height={20} className="ml-2" />
                <label className="font-semibold ml-2">GBP</label>
              </span>
              <input
                type="number"
                placeholder="Enter Markup %"
                value={gbpMarkup}
                onChange={(e) => setGbpMarkup(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* EUR */}
            <div className="flex space-x-3">
              <span className="border flex items-center rounded-md py-2 w-64">
                <Image src={eurFlag} alt="EUR Flag" width={30} height={20} className="ml-2" />
                <label className="font-semibold ml-2">EUR</label>
              </span>
              <input
                type="number"
                placeholder="Enter Markup %"
                value={eurMarkup}
                onChange={(e) => setEurMarkup(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Date of Effect */}
          <div className="mt-6">
            <label className="block text-gray-600 font-medium mb-2">Date of Effect</label>
            <input
              type="date"
              value={dateOfEffect}
              onChange={(e) => setDateOfEffect(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              min={today}  
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between px-10 mt-10">
            <button
              className="px-10 py-2 border-2 border-gray-800 text-lg font-semibold rounded-md hover:text-white hover:bg-gray-600"
              onClick={onClose}
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
          dateOfEffect={dateOfEffect}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default BulkUpdate;
