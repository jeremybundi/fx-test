"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowIcon from "../../public/images/arrow.png";
import terrapageImage from "../../public/images/terrapay.png"; // Import terrapage image
import tumaImage from "../../public/images/tuma.png"; // Import tuma image
import wiseImage from "../../public/images/wise.png"; // Import wise image
import vertoImage from "../../public/images/verto.png"; // Import verto image

export default function MarketComparison() {
  const [selectedPair, setSelectedPair] = useState("USD-KES");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Exchange rates for each currency pair by company
  const exchangeRates = {
    "USD-KES": {
      terrapage: "120.50",
      tuma: "121.00",
      wise: "119.75",
      verto: "118.80",
    },
    "GBP-KES": {
      terrapage: "150.25",
      tuma: "151.00",
      wise: "149.50",
      verto: "148.75",
    },
    "EUR-KES": {
      terrapage: "135.00",
      tuma: "136.00",
      wise: "134.50",
      verto: "133.90",
    },
    "JPY-KES": {
      terrapage: "1.10",
      tuma: "1.12",
      wise: "1.08",
      verto: "1.06",
    },
  };

  const currencyPairs = ["USD-KES", "GBP-KES", "EUR-KES", "JPY-KES"];

  // Handle currency pair change from dropdown
  const handlePairChange = (pair) => {
    setSelectedPair(pair);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white rounded-lg px-8 py-6">
      {/* Header Section */}
      <h1 className="font-semibold text-[20px] mb-6">Market Comparison</h1>

      {/* Label and Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Currency Pair</label>
        <div className="relative">
          <button
            className="flex items-center w-full justify-between gap-2 px-4 py-2 border border-gray-300 
            rounded-lg text-sm  focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {selectedPair}
            <Image src={arrowIcon} alt="Arrow" width={12} height={12} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul>
                {currencyPairs.map((pair) => (
                  <li
                    key={pair}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePairChange(pair)}
                  >
                    {pair}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Image and Exchange Rate Section */}
      <div className="mt-7">
        {/* Terrapage */}
        <div className="flex gap-2 justify-between mb-6">
          <Image src={terrapageImage} alt="Terrapage" width={110} height={80} className="py-1" />
          <span className="px-4 py-1 bg-green-50 text-sm font-semibold text-green-900 w-[90px] text-center">
            {exchangeRates[selectedPair].terrapage}
          </span>
        </div>

        {/* Tuma */}
        <div className="flex gap-2 justify-between mb-">
          <Image src={tumaImage} alt="Tuma" width={60} height={20} className="py-1" />
          <span className="px-2 py-1 bg-green-50 text-sm font-semibold text-green-900 w-[90px] text-center">
            {exchangeRates[selectedPair].tuma}
          </span>
        </div>

        {/* Gray Line Between Tuma and Wise */}
        <div className="my-4 border-t border-gray-300"></div>

        {/* Wise */}
        <div className="flex gap-2 justify-between mb-6">
          <Image src={wiseImage} alt="Wise" width={65} height={40} className="py-2" />
          <span className="px-4 py-1 bg-green-50 text-sm font-semibold text-green-900 w-[90px] text-center">
            {exchangeRates[selectedPair].wise}
          </span>
        </div>

        {/* Verto */}
        <div className="flex gap-2 justify-between ">
          <Image src={vertoImage} alt="Verto" width={60} height={40} className="py-1" />
          <span className="px-4 py-1 bg-green-50 text-sm font-semibold text-green-900 w-[90px] text-center">
            {exchangeRates[selectedPair].verto}
          </span>
        </div>
      </div>
    </div>
  );
}
