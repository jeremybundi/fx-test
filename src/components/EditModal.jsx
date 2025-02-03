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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon


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

const EditModal = ({ data, onClose }) => {
  const [form, setForm] = useState(() => {
    if (data) {
      return {
        ...data,
        dateOfEffect: data.dateOfEffect ? new Date(data.dateOfEffect) : new Date(),
      };
    } else {
      // Fallback to default values if data is null or undefined
      return {
        baseCurrency: '',
        destinationCurrency: '',
        exchangeRate: '',
        finalRate: '',
        markup: '',
        dateOfEffect: new Date(),
      };
    }
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessfulUpdate, setShowSuccessfulUpdate] = useState(false); 
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.currency);

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

  const handleDateChange = (date) => {
    setForm({ ...form, dateOfEffect: date });
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

    console.log("Data saved to store:", updatedData);

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
  };

  useEffect(() => {
    if (!data) {
      setForm({
        baseCurrency: '',
        destinationCurrency: '',
        exchangeRate: '',
        finalRate: '',
        markup: '',
        dateOfEffect: new Date(), // Set today's date when no data is provided
      });
    } else {
      setForm({
        ...data,
        dateOfEffect: data.dateOfEffect ? new Date(data.dateOfEffect) : new Date(), 
      });
    }
  }, [data]);
  
  

  return (
    <div className="fixed font-poppins inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white px-14 py-6 rounded-xl w-[35%] h-[calc(100vh*0.78)] relative">
      <button onClick={handlecCancel} className="absolute top-3 right-3">
          <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
        </button>
        <h2 className="text-lg text-center font-semibold mb-2">Edit Rate</h2>
        <div className="flex items-center text-xl font-semibold mb-4 justify-center">
          <span className="mx-2">{form.baseCurrency}</span>
          <Image src={arrowClose} alt="Arrow" width={16} height={12} className="mx-2" />
          <span className="mx-2">{form.destinationCurrency}</span>
        </div>

        <div className="mb-4 flex justify-between gap-4">
        <div className="flex-1 border px-4 py-2 rounded-md">
        <label className="block text-sm font-medium text-gray-500 mb-1">Base Currency</label>
        <div className="flex items-center gap-2">
          {currencyDetails[form.baseCurrency]?.flag ? (
            <Image
              src={currencyDetails[form.baseCurrency]?.flag}
              alt={`${form.baseCurrency} flag`}
              width={24}
              height={16}
            />
          ) : (
            <span>No flag available</span>
          )}
          <span className="font-medium ">{form.baseCurrency}</span> {/* Display currency code */}
        </div>
      </div>


          <div className="flex-1 border px-4 py-2 rounded-md">
            <label className="block text-sm font-medium text-gray-500 mb-1">Destination Currency</label>
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

        <div className="mb-4 border px-4 py-1 rounded-md">
          <label className="block text-sm font-medium text-gray-500 mb-1">Current Tuma Rate</label>
          <div className="px-3 py-1 font-semibold text-lg rounded-md w-[120px] bg-green-50 text-green-800">
            {form.exchangeRate}
          </div>
        </div>

        <div className="mb-4 border px-4 py-1 rounded-md">
        <label className="block text-sm text-gray-500 font-medium mb-2">Tuma Markup</label>
        <div className="flex items-center justify-between">
          <input
            type="number"
            name="markup"
            value={form.markup}
            onChange={handleChange}
            className="border px-3 py-1 w-[40px] rounded-md flex-1 focus:border-gray-800 focus:border-2 focus:outline-none"
            placeholder="Enter percentage"
          />
          <span className="ml-32 mr-8 text-2xl text-gray-500">%</span>
        </div>
      </div>

      <div className="mb-3 border px-4 py-1 rounded-md">
        <label className="block text-sm text-gray-500 font-medium mb-2">Final Rate</label>
        <input
          type="text"
          name="finalRate"
          value={form.finalRate}
          onChange={handleChange}
          className="px-3 py-1 font-semibold text-lg  rounded-md w-[120px] placeholder:text-xs placeholder:px-0
           bg-green-50 text-green-800 focus:border-gray-800 focus:border-2 focus:outline-none"
          placeholder="Enter final rate"
        />
      </div>
      <div className="mt-6 mb-9">
      <label className="block text-gray-600 font-medium mb-2">Date of Effect</label>
      <div className="relative">
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 z-10 mr-2" />
        
        <DatePicker
          selected={form.dateOfEffect}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy" // Display only date
          minDate={new Date()} // Prevent past dates
          className="pl-10 pr-4 border-2 border-gray-300 text-sm rounded-md p-2 w-full focus:outline-none focus:border-gray-500"
        />
      </div>
    </div>
        <div className="flex justify-between gap-4">
          <button onClick={handleReset} className="px-12 py-2 text-sm border-2 border-gray-950 rounded-md">
            Reset
          </button>
          <button onClick={handleUpdate} className="px-12 py-2 text-sm  bg-gray-950 font-semibold text-white rounded-md">
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