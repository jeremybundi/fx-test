"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../redux/features/currencySlice"; 
import arrowIcon from "../../public/images/arrow.png";
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
import EditModal from "./EditModal"; 

export default function Footer() {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalData, setModalData] = useState(null); 

  const dispatch = useDispatch();
  const { baseCurrency, destinationCurrency, exchangeRate } = useSelector(
    (state) => state.currency 
  );

  // Log the Redux state whenever it changes
  useEffect(() => {
    console.log("Redux State - Base Currency:", baseCurrency);
    console.log("Redux State - Destination Currency:", destinationCurrency);
    console.log("Redux State - Exchange Rate:", exchangeRate);
  }, [baseCurrency, destinationCurrency, exchangeRate]);

  // Currency details with flags and names
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

  // Exchange rates based on base currencies (GBP, USD, EUR)
  const exchangeRates = {
    GBP: { GBP: 1, USD: 1.25, EUR: 0.85, ZAR: 18.25, JPY: 110.5, AUD: 1.35, CAD: 1.3, INR: 74.0, CNY: 6.45, MXN: 20.0 },
    USD: { GBP: 0.80, USD: 1, EUR: 0.85, ZAR: 14.6, JPY: 105.2, AUD: 1.29, CAD: 1.27, INR: 73.1, CNY: 6.38, MXN: 19.5 },
    EUR: { GBP: 1.18, USD: 1.18, EUR: 1, ZAR: 17.5, JPY: 108.4, AUD: 1.32, CAD: 1.28, INR: 75.2, CNY: 6.55, MXN: 21.0 },
  };

  const currencies = Object.keys(currencyDetails);

  const handleCurrencyChange = (currency, string) => {
    console.log("Changing currency from", selectedCurrency, "to", currency); 

    setSelectedCurrency(currency);
    setIsDropdownOpen(false);

    // Update Redux store with selected currency
    const rate = exchangeRates[selectedCurrency][currency];
    dispatch(
      setCurrency({
        baseCurrency: selectedCurrency,
        destinationCurrency: currency,
        exchangeRate: rate,
      })
    );
  };

  const handleEditClick = (currency) => {
    // Calculate exchange rate
    const rate = exchangeRates[selectedCurrency][currency];
    
    // Update the Redux store with the selected baseCurrency, destinationCurrency, and exchangeRate
    dispatch(
      setCurrency({
        baseCurrency: selectedCurrency,
        destinationCurrency: currency,
        exchangeRate: rate,
      })
    );
  
    // Prepare the data for the modal
    const data = {
      baseCurrency: selectedCurrency,
      destinationCurrency: currency,
      exchangeRate: rate,
      markup: 0, 
      finalRate: rate,
      dateOfEffect: "", 
    };
  
 
  
    setModalData(data); 
    setIsModalOpen(true); 
  };
  

  return (
    <footer className="bg-white font-poppins rounded-lg py-6 pl-5 pr-11">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[20px]">Exchange Rates</h1>

          {/* Dropdown Section */}
          <div className="flex items-center gap-4">
            <label className="font-medium text-sm text-gray-800">
              Base Currency
            </label>
            <div className="relative">
              <button
                className="flex items-center gap-2 pl-2 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <Image
                  src={currencyDetails[selectedCurrency].flag}
                  alt={`${selectedCurrency} flag`}
                  width={20}
                  height={16}
                />
                <span className=" font-semibold text-sm">{selectedCurrency}</span>
                <Image src={arrowIcon} alt="Arrow" width={12} height={12} className="ml-6" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul>
                    {["GBP", "USD", "EUR"].map((currency) => (
                      <li
                        key={currency}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCurrencyChange(currency)}
                      >
                        <Image
                          src={currencyDetails[currency].flag}
                          alt={`${currency} flag`}
                          width={16}
                          height={12}
                        />
                        {currency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 mb-6 border-t border-gray-300"></div>

        {/* Exchange Rates Display */}
        <div className="space-y-7 max-h-64 text-sm font-medium overflow-y-auto">
          {currencies.map((currency) => (
            <div key={currency} className="flex items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={currencyDetails[currency].flag}
                  alt={`${currency} flag`}
                  width={25}
                  height={15}
                />
                <span className="font-medium text-sm">
                  {currency} - {currencyDetails[currency].fullName}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-4 bg-green-50 text-sm w-[70px] mr-3 text-center font-semibold text-green-500">
                  {exchangeRates[selectedCurrency][currency].toFixed(2)}
                </span>
                <button
                  className="text-sm underline mr-5 focus:outline-none"
                  onClick={() => handleEditClick(currency)} 
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal data={modalData} onClose={() => setIsModalOpen(false)} />
      )}
    </footer>
  );
}
