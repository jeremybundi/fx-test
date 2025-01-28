import Link from 'next/link'; 
import SideNav from "@/components/SideNav";
import Exchange from "@/components/ExchangeRates";
import Market from "@/components/MarketComparison";



export default function Home() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex flex-col w-full px-12 py-6">
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
        <div className="grid grid-cols-[60%_40%] gap-6">
            <Exchange/>
           

          <div className="bg-white rounded-lg ">
          <Market />
          </div>
        </div>

      </div>
    </div>
  );
}
