"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowIcon from "../../public/images/arrow.png"; // Arrow icon
import gbpFlag from "../../public/images/gbp.png"; // Flag for GBP
import usdFlag from "../../public/images/usd.png"; // Flag for USD
import eurFlag from "../../public/images/eur.png"; // Flag for EUR
import zarFlag from "../../public/images/zar.png"; // Flag for ZAR
import jpyFlag from "../../public/images/jpy.png"; // Flag for JPY
import audFlag from "../../public/images/aud.png"; // Flag for AUD
import cadFlag from "../../public/images/cad.png"; // Flag for CAD
import inrFlag from "../../public/images/inr.png"; // Flag for INR
import cnyFlag from "../../public/images/cny.png"; // Flag for CNY
import mxnFlag from "../../public/images/mxn.png"; // Flag for MXN

export default function Footer() {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Map currencies to their flags, full names, and static exchange rates
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

  const exchangeRates = {
    GBP: "1.25",
    USD: "1.00",
    EUR: "0.85",
    ZAR: "18.25",
    JPY: "110.50",
    AUD: "1.35",
    CAD: "1.30",
    INR: "74.00",
    CNY: "6.45",
    MXN: "20.00",
  };

  const currencies = Object.keys(currencyDetails);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  return (
    <footer className="bg-white rounded-lg py-6 pl-5 pr-11">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[20px]">Exchange Rates</h1>

          {/* Dropdown Section */}
          <div className="flex items-center gap-4">
            <label className="font-medium text-sm text-gray-800">Base Currency</label>
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
                <span className=" font-semibold text-sm">
                  {selectedCurrency}
                </span>
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

        <div className="my-4 border-t border-gray-300"></div>

        {/* Currency and Exchange Rate List */}
        <div className="space-y-4 max-h-60 text-sm font-medium overflow-y-auto">
          {/* Show only first 5 currencies */}
          {currencies.slice(0, 5).map((currency) => (
            <div key={currency} className="flex items-center justify-between">
              <div className="flex mb-3  items-center gap-2">
                <Image
                  src={currencyDetails[currency].flag}
                  alt={`${currency} flag`}
                  width={20}
                  height={15}
                />
                <span className="font-medium text-sm">
                  {currency} - {currencyDetails[currency].fullName}
                </span>
              </div>
              <span className="px-4 bg-green-50 text-sm font-medium text-green-900">
                {exchangeRates[currency]}
              </span>
              <button className="text-sm text-blue-500 underline focus:outline-none">
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Scrollable Section for Remaining Currencies */}
        <div className="mt-4 max-h-40 overflow-y-scroll">
          {currencies.slice(5).map((currency) => (
            <div key={currency} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src={currencyDetails[currency].flag}
                  alt={`${currency} flag`}
                  width={20}
                  height={15}
                />
                <span className="font-medium text-sm">
                  {currency} - {currencyDetails[currency].fullName}
                </span>
              </div>
              <span className="px-4 bg-green-50 text-sm font-medium text-green-900">
                {exchangeRates[currency]}
              </span>
              <button className="text-sm text-blue-500 underline focus:outline-none">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
