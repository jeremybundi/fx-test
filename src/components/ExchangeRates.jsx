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

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  const dispatch = useDispatch();
  const { baseCurrency, destinationCurrency, exchangeRate } = useSelector(
    (state) => state.currency
  );

  useEffect(() => {
    if (baseCurrency && destinationCurrency && exchangeRate !== 0) {
      setModalData({
        baseCurrency,
        destinationCurrency,
        exchangeRate,
        markup: 0,
        finalRate: exchangeRate,
        dateOfEffect: "",
      });
    }
  }, [baseCurrency, destinationCurrency, exchangeRate]);

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
    GBP: { GBP: 1, USD: 1.25, EUR: 0.85, ZAR: 18.25, JPY: 110.5, AUD: 1.35, CAD: 1.3, INR: 74.0, CNY: 6.45, MXN: 20.0 },
    USD: { GBP: 0.80, USD: 1, EUR: 0.85, ZAR: 14.6, JPY: 105.2, AUD: 1.29, CAD: 1.27, INR: 73.1, CNY: 6.38, MXN: 19.5 },
    EUR: { GBP: 1.18, USD: 1.18, EUR: 1, ZAR: 17.5, JPY: 108.4, AUD: 1.32, CAD: 1.28, INR: 75.2, CNY: 6.55, MXN: 21.0 },
  };

  const currencies = Object.keys(currencyDetails);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const handleEditClick = (currency) => {
    const base = baseCurrency || selectedCurrency;
    const rate = exchangeRates[base]?.[currency] || 1;

    dispatch(setCurrency({
      baseCurrency: base,
      destinationCurrency: currency,
      exchangeRate: rate,
      markup: 0,
      dateOfEffect: "",
    }));

    setIsModalOpen(true);
  };

  const totalPages = Math.ceil(currencies.length / itemsPerPage); // Calculate total pages

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentCurrencies = currencies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Get current page data

  return (
    <footer className="bg-white font-poppins rounded-lg py-6 pl-5 pr-11">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[16px]">Exchange Rates</h1>

          <div className="flex items-center gap-4">
            <label className="font-medium text-sm text-gray-500">
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

        <div className="space-y-5 max-h-64 text-sm font-medium overflow-y-auto">
          {currentCurrencies.map((currency) => (
            <div key={currency} className="flex items-center justify-between mb-1 gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={currencyDetails[currency].flag}
                  alt={`${currency} flag`}
                  width={25}
                  height={15}
                />
                <span className="font-medium text-[13px]">
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

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="flex items-center  text-sm justify-center px-4 py-1 bg-gray-200 rounded-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            &gt;
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-200  rounded-md disabled:opacity-50"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EditModal
          data={modalData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </footer>
  );
}