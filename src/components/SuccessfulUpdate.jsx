"use client";
import React from "react";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import success from "../../public/images/success.png";

const SuccessfulUpdate = ({ onClose, usdMarkup, gbpMarkup, eurMarkup, dateOfEffect }) => {
  // Convert dateOfEffect to a Date object if it's a valid string or already a Date object
  const parsedDate = dateOfEffect ? new Date(dateOfEffect) : null;

  // Check if parsedDate is a valid Date object
  const isValidDate = parsedDate instanceof Date && !isNaN(parsedDate);

  return (
    <div className="fixed font-poppins inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 px-16 rounded-xl h-[calc(100vh*0.9)] w-[38%] relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
        </button>

        {/* Success Icon */}
        <Image src={success} alt="Success Icon" width={70} height={60} className="mx-auto mt-8" />

        <h2 className="text-3xl font-semibold text-center mb-2 mt-4">Tuma Markup</h2>
        <h2 className="text-3xl font-semibold text-center">Successfully Updated</h2>

        {/* Updated Markups */}
        <div className="text-center mt-10 text-lg mb-4">
          <p className="text-gray-900 font-semibold">
            GBP - {gbpMarkup}%, USD - {usdMarkup}%, EUR - {eurMarkup}%
          </p>
          <p className="mt-4">
            <span className="mr-3 font-semibold">Date of Effect:</span>
            {isValidDate
              ? parsedDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : "No Date Selected"}
          </p>
        </div>

        <p className="text-[#808A92] mt-12 px-16 text-center text-xl mb-16">
          The changes have been applied to the destination currency.
        </p>

        {/* Close Button */}
        <div className="flex justify-center px-10">
          <button
            onClick={onClose}
            className="px-16 py-2 text-lg border-2 border-gray-600 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulUpdate;
