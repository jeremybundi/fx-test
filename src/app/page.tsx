import Link from 'next/link'; 
import SideNav from "@/components/SideNav";
import Exchange from "@/components/ExchangeRates";
import Market from "@/components/MarketComparison";
import AuditTrail from "@/components/AuditTrail";

export default function Home() {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex flex-col w-full px-10  py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[24px] font-semibold">Rate Manager</h1>
          <Link href="/another-page">
            <button className="px-4 py-3 bg-[#101820] font-semibold text-sm text-white rounded-xl hover:bg-gray-800 transition duration-300 ease-in-out">
              Bulk Update Rates
            </button>
          </Link>
        </div>

        {/* Two-Column Layout */}
        <div /*className='overflow-y-auto h-[calc(100vh*0.88)]'*/>
        <div className="grid grid-cols-[59%_39%]  max-h-[100vh] gap-6">
            <Exchange/>
           

          <div className="bg-white rounded-lg ">
          <Market />
          </div>
        </div>
        <div className='mt-8 mb-3'>
        <AuditTrail />
        </div>
        </div>
       

      </div>
    </div>
  );
}
