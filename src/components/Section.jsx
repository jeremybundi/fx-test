import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Update from "./Update"; // Import modal component

const Section = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rates, setRates] = useState({
    paybill: null,
    mpesa: null,
    bank: null,
    card: null,
  });
  const [lastUpdated, setLastUpdated] = useState("");

  // Function to fetch rates from the new API endpoint
  const fetchRates = async () => {
    try {
      const url = `https://api.tuma-app.com/api/treasury/latest-exchange-rate?baseCurrency=GBP&targetCurrency=KES`;
      const response = await axios.get(url);
      
      // Set rates from the new response structure
      setRates({
        paybill: response.data.paybillRate,
        mpesa: response.data.mpesaRate,
        bank: response.data.bankRate,
        card: response.data.currentRate, // Using currentRate for card
      });
      
      // Format and set the last updated time with +3 hours for EAT
      if (response.data.updatedAt) {
        const updatedDate = new Date(response.data.updatedAt);
        
        // Add 3 hours to convert to East African Time (EAT)
        updatedDate.setHours(updatedDate.getHours() + 3);
        
        const formattedDate = updatedDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        });
        
        // Format time in 24-hour format
        const formattedTime = updatedDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(/\./g, '');
        
        setLastUpdated(`Updated on ${formattedDate}, ${formattedTime}`);
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  // Fetch all rates when the component mounts
  useEffect(() => {
    fetchRates();
  }, );

  return (
    <section className="p-6 bg-white rounded-xl font-poppins">
      <span className="flex justify-between mb-6">
        <span className="flex flex-col">
          <h2 className="text-[21px] font-bold text-gray-800 mb-4">Tuma App Rate</h2>
          <p className="text-gray-400">
            {lastUpdated || "Loading update time..."}
          </p>
        </span>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 h-fit mt-2 bg-[#276EF1] font-[600] text-white rounded-lg text-[16px] shadow hover:bg-blue-700 transition"
        >
          Update Rate
        </button>
      </span>

      <div className="grid grid-cols-4 gap-10">
        {/* Paybill */}
        <div className="flex items-center border p-4 bg-white rounded-xl ">
          <Image src="/svgs/paybill.svg" alt="Paybill" className="mr-4 p-4 bg-[#F3F5F8] rounded-full" width={60} height={50} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.paybill !== null ? `KES ${rates.paybill.toFixed(2)}` : "Loading..."}
            </h1>
            <p className="text-[#27AAE1] mt-1 text-[14px] bg-[#27AAE11A] w-fit px-2 p- rounded-md font-500">Paybill</p>
          </span>
        </div>

        {/* M-Pesa */}
        <div className="flex items-center p-4 bg-white rounded-xl border">
          <Image src="/svgs/mpesa.svg" alt="Mpesa" className="mr-4 p-5 px-3 bg-[#F3F5F8] rounded-full" width={60} height={60} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.mpesa !== null ? `KES ${rates.mpesa.toFixed(2)}` : "Loading..."}
            </h1>
            <p className="text-[#3CA8A4] mt-1 text-[14px] bg-[#3CA8A41A] w-fit px-2 p- rounded-md font-500">MPESA</p>
          </span>
        </div>

        {/* Bank */}
        <div className="flex items-center p-4 bg-white rounded-xl border">
          <Image src="/svgs/Bank.svg" alt="Bank" className="mr-4 p-4 px-4 bg-[#F3F5F8] rounded-full" width={60} height={50} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.bank !== null ? `KES ${rates.bank.toFixed(2)}` : "Loading..."}
            </h1>
            <p className="text-[#276EF1] mt-1 text-[14px] bg-[#276EF11A] w-fit px-2 p- rounded-md font-500">Bank</p>
          </span>
        </div>

        {/* Card Payment */}
        <div className="flex items-center p-4 bg-white rounded-xl border">
          <Image src="/svgs/card.svg" alt="Card Payment" className="mr-4 p-4 bg-[#F3F5F8] rounded-full" width={60} height={50} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.card !== null ? `KES ${rates.card.toFixed(2)}` : "Loading..."}
            </h1>
            <p className="text-[#F9CB38] mt-1 text-[14px] bg-[#F9CB381A] w-fit px-2 p- rounded-md font-500">Card</p>
          </span>
        </div>
      </div>

      {/* Modal Component */}
      <Update isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Section;