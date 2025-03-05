'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import arrowIcon from '../../public/images/arrow.png';
import terrapageImage from '../../public/images/terrapay.png';
import tumaImage from '../../public/images/tuma.png';
import wiseImage from '../../public/images/wise.png';
import vertoImage from '../../public/images/verto.png';

// Static exchange rates for other currencies
const staticExchangeRates = {
  'USD-KES': {
    terrapage: '120.50',
    tuma: '121.00',
    wise: 'Loading...', // Placeholder for Wise exchange rate
    verto: '118.80',
  },
  'GBP-KES': {
    terrapage: '150.25',
    tuma: '151.00',
    wise: 'Loading...',
    verto: '148.75',
  },
  'EUR-KES': {
    terrapage: '135.00',
    tuma: '136.00',
    wise: 'Loading...',
    verto: '133.90',
  },
};

// Currency data - Limited to USD, EUR, and GBP for base currency
const currencies = {
  USD: { flag: '/images/usd.png', fullName: 'US Dollar' },
  EUR: { flag: '/images/eur.png', fullName: 'Euro' },
  GBP: { flag: '/images/gbp.png', fullName: 'British Pound' },
  KES: { flag: '/flags/kenya.png', fullName: 'Kenyan Shilling' },
  TZS: { flag: '/flags/tanzania.png', fullName: 'Tanzanian Shilling' },
  BIF: { flag: '/flags/burundi.png', fullName: 'Burundian Franc' },
  CDF: { flag: '/flags/drc.png', fullName: 'Congolese Franc' },
  ETB: { flag: '/flags/ethiopia.png', fullName: 'Ethiopian Birr' },
  MWK: { flag: '/flags/malawi.png', fullName: 'Malawian Kwacha' },
  MZN: { flag: '/flags/mozambique.png', fullName: 'Mozambican Metical' },
  RWF: { flag: '/flags/rwanda.png', fullName: 'Rwandan Franc' },
  ZAR: { flag: '/flags/southafrica.png', fullName: 'South African Rand' },
  SSP: { flag: '/flags/southsudan.png', fullName: 'South Sudanese Pound' },
  UGX: { flag: '/flags/uganda.png', fullName: 'Ugandan Shilling' },
  ZMW: { flag: '/flags/zambia.png', fullName: 'Zambian Kwacha' },
  ZWL: { flag: '/flags/zimbabwe.png', fullName: 'Zimbabwean Dollar' },
};

export default function MarketComparison() {
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('USD');
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('KES');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wiseRate, setWiseRate] = useState(null);
  // Fetch Wise exchange rate
  useEffect(() => {
    const fetchWiseRate = async () => {
      const baseCurrency = selectedBaseCurrency;
      const targetCurrency = selectedTargetCurrency;
      try {
        const response = await fetch(
          `https://api.transferwise.com/v1/rates?source=${baseCurrency}&target=${targetCurrency}`,
          {
            headers: {
              Authorization: 'Bearer 4e8f4270-8d0e-46f2-a6a2-405029e49bca',
            },
          }
        );
        const data = await response.json();
        if (data && data[0]) {
          setWiseRate(data[0].rate);
        }
      } catch (error) {
        console.error('Error fetching Wise exchange rate:', error);
      }
    };

    fetchWiseRate();
  }, [selectedBaseCurrency, selectedTargetCurrency]);

  // Handle currency selection from dropdown
  const handleCurrencyChange = (type, currency) => {
    if (type === 'base' && ['USD', 'EUR', 'GBP'].includes(currency)) {
      setSelectedBaseCurrency(currency);
    } else {
      setSelectedTargetCurrency(currency);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white font-poppins rounded-lg px-6 py-6">
      {/* Header Section */}
      <h1 className="font-semibold font-lufga text-lg mt-2 mb-6">
        Market Comparison
      </h1>

      {/* Dropdowns for Base and Target Currency */}
      <div className="flex gap-4">
        {/* Base Currency Dropdown */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-medium text-gray-500">
            Base Currency
          </label>
          <div className="relative mt-1">
            <button
              className="flex items-center w-full  gap-2 px-4 h-[46px] border border-gray-300 
              rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Image
                src={currencies[selectedBaseCurrency].flag}
                alt={selectedBaseCurrency}
                width={30}
                height={12}
                className="rounded"
              />
              {currencies[selectedBaseCurrency].fullName}
              <Image
                src={arrowIcon}
                alt="Arrow"
                width={12}
                height={12}
                className="ml-auto"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 w-full text-[16px] text-gray-500 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul>
                  {['USD', 'EUR', 'GBP'].map((currency) => (
                    <li
                      key={currency}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCurrencyChange('base', currency)}
                    >
                      <Image
                        src={currencies[currency].flag}
                        alt={currency}
                        width={20}
                        height={12}
                        className='rounded'
                      />
                      {currencies[currency].fullName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Target Currency Dropdown */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg   text-gray-500">Target Currency</label>
          <div className="relative mt-1">
          <button
            className="flex items-center w-full gap-2 px-2 py-1 border h-[46px] border-gray-300 
            rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 overflow-hidden"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Image
              src={currencies[selectedTargetCurrency].flag}
              alt={selectedTargetCurrency}
              width={30}
              height={12}
              className="rounded"
            />
            <span className="truncate max-w-[100px]"> 
              {currencies[selectedTargetCurrency].fullName}
            </span>
            <Image src={arrowIcon} alt="Arrow" width={12} height={12} />
          </button>


            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 w-full text-[16px] h-60 overflow-y-scroll text-gray-500 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul>
                  {Object.keys(currencies).map((currency) => (
                    <li
                      key={currency}
                      className="flex items-center gap-2 px-2 py-2  hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCurrencyChange('target', currency)}
                    >
                      <Image
                        src={currencies[currency].flag}
                        alt={currency}
                        width={20}
                        height={12}
                        className='rounded'
                      />
                       <span className="truncate max-w-[145px]"> 
                      {currencies[currency].fullName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image and Exchange Rate Section */}
      <div className="mt-7">
        {/* Terrapage */}
        <div className="flex gap-2 justify-between mb-6">
          <Image
            src={terrapageImage}
            alt="Terrapage"
            width={100}
            height={80}
            className="py-2"
          />
        <span className="px-4 py-1 bg-green-50 text-lg rounded font-semibold text-green-600 w-[140px] my-1 text-center">
        {staticExchangeRates[
          `${selectedBaseCurrency}-${selectedTargetCurrency}`
        ]?.terrapage
          ? Number(
              staticExchangeRates[
                `${selectedBaseCurrency}-${selectedTargetCurrency}`
              ].terrapage
            ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : 'N/A'}
      </span>

        </div>

        {/* Tuma */}
        <div className="flex gap-2 justify-between mb-6">
          <Image
            src={tumaImage}
            alt="Tuma"
            width={70}
            height={15}
            className="py-2"
          />
      <span className="px-4 py-1 bg-blue-50 text-lg rounded font-semibold text-blue-600 w-[140px] text-center">
        {staticExchangeRates[
          `${selectedBaseCurrency}-${selectedTargetCurrency}`
        ]?.tuma
          ? Number(
              staticExchangeRates[
                `${selectedBaseCurrency}-${selectedTargetCurrency}`
              ].tuma
            ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : 'N/A'}
      </span>

        </div>

        {/* Wise */}
        <div className="flex gap-2 justify-between mb-6">
          <Image
            src={wiseImage}
            alt="Wise"
            width={70}
            height={15}
            className="py-3"
          />
        <span className="px-4 py-1 bg-orange-50 text-lg rounded font-semibold text-orange-600 w-[140px] text-center">
        {wiseRate
          ? Number(wiseRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
          : 'Loading...'}
      </span>

        </div>

        {/* Verto */}
        <div className="flex gap-2 justify-between mb-6">
          <Image
            src={vertoImage}
            alt="Verto"
            width={60}
            height={15} 
            className="py-2 ml-2"
          />
            <span className="px-4 py-2 bg-yellow-50 text-lg rounded font-semibold text-yellow-600 w-[140px] text-center">
          {staticExchangeRates[`${selectedBaseCurrency}-${selectedTargetCurrency}`]?.verto
            ? Number(staticExchangeRates[`${selectedBaseCurrency}-${selectedTargetCurrency}`].verto)
                .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) // ✅ Correct
            : 'N/A'}
        </span>

        </div>
      </div>
    </div>
  );
}
