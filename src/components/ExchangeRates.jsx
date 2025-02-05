"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../redux/features/currencySlice";
import arrowIcon from "../../public/images/arrow.png";
import gbpFlag from "../../public/images/gbp.png";
import usdFlag from "../../public/images/usd.png";
import eurFlag from "../../public/images/eur.png";
import kesFlag from "../../public/images/kes.png"; // Add KES flag
import EditModal from "./EditModal";

export default function Footer() {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchExchangeRate(selectedCurrency);
  }, [selectedCurrency]);

  const fetchExchangeRate = async (base) => {
    try {
      const response = await fetch(
        `https://api.transferwise.com/v1/rates?source=${base}&target=KES`,
        {
          headers: {
            Authorization: "Bearer 4e8f4270-8d0e-46f2-a6a2-405029e49bca",
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        setExchangeRate(data[0].rate);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const currencyDetails = {
    GBP: { flag: gbpFlag, fullName: "British Pound" },
    USD: { flag: usdFlag, fullName: "United States Dollar" },
    EUR: { flag: eurFlag, fullName: "Euro" },
    KES: { flag: kesFlag, fullName: "Kenyan Shilling" },
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const handleEditClick = () => {
    setModalData({
      baseCurrency: selectedCurrency,
      destinationCurrency: "KES",
      exchangeRate,
      markup: 0,
      finalRate: exchangeRate,
      dateOfEffect: "",
    });

    setIsModalOpen(true);
  };

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
                <span className="font-semibold text-sm">{selectedCurrency}</span>
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

        <div className="space-y-5 text-sm font-medium">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Image src={kesFlag} alt="KES flag" width={25} height={15} />
              <span className="font-medium text-[13px]">
                KES - Kenyan Shilling
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 bg-green-50 text-sm w-[70px] text-center font-semibold text-green-500">
                {exchangeRate ? exchangeRate.toFixed(2) : "Loading..."}
              </span>
              <button
                className="text-sm underline focus:outline-none"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <EditModal data={modalData} onClose={() => setIsModalOpen(false)} />}
    </footer>
  );
}
