import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../redux/features/currencySlice";
import Image from "next/image";
import gbpFlag from "../../public/images/gbp.png";
import usdFlag from "../../public/images/usd.png";
import eurFlag from "../../public/images/eur.png";
import zarFlag from "../../public/images/zar.png";
import jpyFlag from "../../public/images/jpy.png";
import audFlag from "../../public/images/aud.png";
import cadFlag from "../../public/images/cad.png";
import inrFlag from "../../public/images/inr.png";
import cnyFlag from "../../public/images/cny.png";
import mxnFlag from "../../public/images/mxn.png";
import arrowClose from "../../public/images/arrowclose.png";
import closeIcon from "../../public/images/close.png";
//import arrow from "../../public/images/arrow.png";
import SingleConfirmationModal from './SingleConfirmationModal';
import SuccessfulUpdateModal from './SuccessfulUpdateModal'; 

const currencyDetails = {
  GBP: { flag: gbpFlag, fullName: "British Pound" },
  USD: { flag: usdFlag, fullName: "United States Dollar" },
  EUR: { flag: eurFlag, fullName: "Euro" },
  ZAR: { flag: zarFlag, fullName: "South African Rand" },
  JPY: { flag: jpyFlag, fullName: "Japanese Yen" },
  AUD: { flag: audFlag, fullName: "Australian Dollar" },
  CAD: { flag: cadFlag, fullName: "Canadian Dollar" },
  INR: { flag: inrFlag, fullName: "Indian Rupee" },
  CNY: { flag: cnyFlag, fullName: "Chinese Yuan" },
  MXN: { flag: mxnFlag, fullName: "Mexican Peso" },
};

function EditModal({ data, onClose }) {
  const [form, setForm] = useState(data);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessfulUpdate, setShowSuccessfulUpdate] = useState(false); 
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.currency);

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];


  const handleChange = (e) => {
    const { name, value } = e.target;
    let newForm = { ...form, [name]: value };
  
    if (name === "markup") {
      const markup = parseFloat(value) || 0;
      newForm.finalRate = (form.exchangeRate * (1 + markup / 100)).toFixed(2);
    } else if (name === "finalRate") {
      const finalRate = parseFloat(value) || 0;
      newForm.markup = ((finalRate / form.exchangeRate - 1) * 100).toFixed(2);
    }
  
    setForm(newForm);
  };
  

  const handleUpdate = () => {
    if (!form.baseCurrency || !form.destinationCurrency || !form.exchangeRate ||
        !form.finalRate || !form.dateOfEffect) {
      alert("Please fill all required fields before updating.");
      return;
    }
    setShowConfirmation(true); 
  };

  const handleReset = () => {
    setForm(data); 
  };

  const handleCancel = () => {
    console.log("Back clicked. Current form data:", form); 
    setShowConfirmation(false); 
    setForm(storeData); 
  };

  const handleConfirmUpdate = () => {
    const updatedData = {
      baseCurrency: form.baseCurrency,
      destinationCurrency: form.destinationCurrency,
      exchangeRate: parseFloat(form.finalRate),
      markup: parseFloat(form.markup),
      dateOfEffect: form.dateOfEffect
    };
  
    dispatch(setCurrency(updatedData));
    localStorage.setItem("currencyData", JSON.stringify(updatedData));

    console.log("Data saved to store store:", updatedData);
  
    setShowConfirmation(false);
    setShowSuccessfulUpdate(true); 
  };
  
  useEffect(() => {
    const savedData = localStorage.getItem("currencyData");
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);
  
  const handleSuccessfulUpdateClose = () => {
    setShowSuccessfulUpdate(false); 
    onClose(); 
  };
  const handlecCancel = () => {
    setShowConfirmation(false); 
    setForm(storeData); 
    onClose(); 
  };
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);  

  if (!form) {
    return <div>Loading...</div>; 
  }
  

  return (
    <div className="fixed font-poppins inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white px-20 py-6 rounded-xl w-[38%] h-[calc(100vh*0.9)] relative">
      <button onClick={handlecCancel} className="absolute top-3 right-3">
          <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
        </button>
        <h2 className="text-xl text-center font-semibold mb-2">Edit Rate</h2>
        <div className="flex items-center text-3xl font-semibold mb-4 justify-center">
          <span className="mx-2">{form.baseCurrency}</span>
          <Image src={arrowClose} alt="Arrow" width={16} height={12} className="mx-2" />
          <span className="mx-2">{form.destinationCurrency}</span>
        </div>

        <div className="mb-4 flex justify-between gap-4">
          <div className="flex-1 border px-4 py-3 rounded-md">
            <label className="block text-sm font-medium text-gray-500 mb-2">Base Currency</label>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={currencyDetails[form.baseCurrency]?.flag || ''}
                  alt={`${form.baseCurrency} flag`}
                  width={24}
                  height={16}
                />
                <span className="font-medium">{form.baseCurrency}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 border px-4 py-3 rounded-md">
            <label className="block text-sm font-medium text-gray-500 mb-2">Destination Currency</label>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={currencyDetails[form.destinationCurrency]?.flag || ''}
                  alt={`${form.destinationCurrency} flag`}
                  width={24}
                  height={16}
                />
                <span className="font-medium">{form.destinationCurrency}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 border px-4 py-2 rounded-md">
          <label className="block text-sm font-medium text-gray-500 mb-1">Current Tuma Rate</label>
          <div className="px-3 py-1 font-semibold text-xl rounded-md w-[120px] bg-green-50 text-green-800">
            {form.exchangeRate}
          </div>
        </div>

        <div className="mb-4 border px-4 py-2 rounded-md">
        <label className="block text-sm text-gray-500 font-medium mb-2">Tuma Markup</label>
        <div className="flex items-center justify-between">
          <input
            type="number"
            name="markup"
            value={form.markup}
            onChange={handleChange}
            className="border px-3 py-2 w-[40px] rounded-md flex-1 focus:border-gray-800 focus:border-2 focus:outline-none"
            placeholder="Enter percentage"
          />
          <span className="ml-32 mr-8 text-2xl text-gray-500">%</span>
        </div>
      </div>

      <div className="mb-4 border px-4 py-2 rounded-md">
        <label className="block text-sm text-gray-500 font-medium mb-2">Final Rate</label>
        <input
          type="text"
          name="finalRate"
          value={form.finalRate}
          onChange={handleChange}
          className="px-3 py-1 font-semibold text-xl  rounded-md w-[120px] placeholder:text-xs placeholder:px-0
           bg-green-50 text-green-800 focus:border-gray-800 focus:border-2 focus:outline-none"
          placeholder="Enter final rate"
        />
      </div>
        <div className="mb-4 border p-4 rounded-md">
        <label className="block text-sm text-gray-500 font-medium mb-2">Date of Effect</label>
        <input
          type="date"
          name="dateOfEffect"
          value={form.dateOfEffect}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          min={today}  
        />
      </div>

        <div className="flex justify-between gap-4">
          <button onClick={handleReset} className="px-12 py-2 border-2 border-gray-950 rounded-md">
            Reset
          </button>
          <button onClick={handleUpdate} className="px-12 py-2 bg-gray-950 font-semibold text-white rounded-md">
            Update
          </button>
        </div>
      </div>
    
      {showConfirmation && (
        <SingleConfirmationModal
          form={form}
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancel}
          oncClose={handlecCancel}
        />
      )}

      {showSuccessfulUpdate && (
        <SuccessfulUpdateModal onClose={handleSuccessfulUpdateClose} />
      )}

      </div>
  );
}

export default EditModal;