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

  // Function to fetch rates from the API
  const fetchRate = async (transactionType) => {
    try {
      const url = `http://tuma-dev-backend-alb-1553448571.us-east-1.elb.amazonaws.com/api/exchange-rate/fees?transactionType=${transactionType}&amount=1&currency=GBP&direction=TO_SEND`;
      const response = await axios.get(url);
      return response.data.exchangeRate; // Extract exchangeRate from the response
      console.log(response.data.exchangeRate);
    } catch (error) {
      console.error("Error fetching rate:", error);
      return null;
    }
  };

  // Fetch all rates when the component mounts
  useEffect(() => {
    const fetchRates = async () => {
      const paybillRate = await fetchRate("UK_CARD_TO_PAYBILL");
      const mpesaRate = await fetchRate("UK_CARD_TO_MPESA");
      const bankRate = await fetchRate("UK_CARD_TO_KE_BANK");
      const cardRate = 164.04; // Static value for card as per your description

      setRates({
        paybill: paybillRate,
        mpesa: mpesaRate,
        bank: bankRate,
        card: cardRate,
      });
    };

    fetchRates();
  }, );

  return (
    <section className="p-6 bg-white rounded-xl font-poppins">
      <span className="flex justify-between mb-6">
        <span className="flex flex-col">
          <h2 className="text-[21px] font-bold text-gray-800 mb-4">Tuma App Rate</h2>
          <p className="text-gray-400">Updated on 12/10/24, 10:00am</p>
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
              {rates.paybill !== null ? `KES ${rates.paybill}` : "Loading..."}
            </h1>
            <p className="text-[#27AAE1] mt-1 text-[14px] bg-[#27AAE11A] w-fit px-2 p- rounded-md font-500">Paybill</p>
          </span>
        </div>

        {/* M-Pesa */}
        <div className="flex items-center p-4 bg-white rounded-xl border">
          <Image src="/svgs/mpesa.svg" alt="Mpesa" className="mr-4 p-5 px-3 bg-[#F3F5F8] rounded-full" width={60} height={60} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.mpesa !== null ? `KES ${rates.mpesa}` : "Loading..."}
            </h1>
            <p className="text-[#3CA8A4] mt-1 text-[14px] bg-[#3CA8A41A] w-fit px-2 p- rounded-md font-500">MPESA</p>
          </span>
        </div>

        {/* Bank */}
        <div className="flex items-center p-4 bg-white rounded-xl border">
          <Image src="/svgs/Bank.svg" alt="Bank" className="mr-4 p-4 px-4 bg-[#F3F5F8] rounded-full" width={60} height={50} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.bank !== null ? `KES ${rates.bank}` : "Loading..."}
            </h1>
            <p className="text-[#276EF1] mt-1 text-[14px] bg-[#276EF11A] w-fit px-2 p- rounded-md font-500">Bank</p>
          </span>
        </div>

        {/* Card Payment */}
        <div className="flex items-center p-4 bg-white rounded-xl border">
          <Image src="/svgs/card.svg" alt="Card Payment" className="mr-4 p-4 bg-[#F3F5F8] rounded-full" width={60} height={50} />
          <span className="flex flex-col">
            <h1 className="font-[700] text-[20px] text-[#101820] ">
              {rates.card !== null ? `KES ${rates.card}` : "Loading..."}
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