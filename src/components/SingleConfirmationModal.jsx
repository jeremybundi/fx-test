"use client";

import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";


const SingleConfirmationModal = ({ form, onConfirm, onCancel,oncClose }) => {
  console.log("SingleConfirmationModal props:", { form, onConfirm, onCancel, oncClose}); 


  // Ensure the modal is being rendered
  if (!form) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="fixed font-poppins inset-0 bg-gray-500 bg-opacity-5 flex justify-center items-center z-10">
  <div className="bg-white p-6 px-16 rounded-xl h-[calc(100vh*0.9)] w-[38%] relative">
    <button className="absolute top-3 right-3" onClick={oncClose} >
      <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
    </button>
    <h2 className="text-3xl font-semibold text-center mb-2 mt-20">You’ve Set    </h2>
    
    <h2  className="text-3xl font-semibold text-center mb-4"> Tuma Markup as follows:</h2> 
    <ul className="text-center mt-12 mb-4">
      <li>
        <span className="font-semibold">{form.baseCurrency}</span> → <span className="font-semibold">{form.destinationCurrency}</span>
      </li>
      <li className="my-2">
      <span className=" mr-3 font-semibold"> By: </span>  {form.markup}%
      </li>
      <li>
        <span className="mr-3 font-semibold">Date of Effect:</span> {form.dateOfEffect}
      </li>
    </ul>
    <p className="text-center text-[#808A92] px-16 text-lg mt-14 mb-16">
    Confirm you want to proceed with applying these rates to the destination currency?    </p>
    <div className="flex justify-between  px-10">
      <button
        onClick={onCancel}
        className="px-12 py-2 border-2 border-gray-800 tetx-lg font-semibold rounded-md hover:text-white hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={onConfirm}
        className="px-12 py-2 bg-gray-800 text-lg font-semibold text-white rounded-md hover:bg-gray-600"
      >
        Confirm
      </button>
    </div>
  </div>
</div>

  );
};

export default SingleConfirmationModal;