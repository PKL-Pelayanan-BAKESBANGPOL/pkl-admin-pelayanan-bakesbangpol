import React, { useState, useEffect } from "react";
import { FaMailBulk } from "react-icons/fa";
import { GiFiles } from "react-icons/gi";
import { RiMailCheckFill } from "react-icons/ri";
import axios from "axios";
import Sidebar from "../assets/components/sidebar";

const CardSkeleton = () => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col border border-gray-200 h-full">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mr-4 flex-shrink-0"></div>
      <div className="flex flex-col">
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
    <div className="text-gray-500 text-sm text-center mt-auto animate-pulse">
      <div className="w-full h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalAjuanPenelitian, setTotalAjuanPenelitian] = useState(0);
  const [totalAjuanMagang, setTotalAjuanMagang] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Set loading true while fetching
      setLoading(true);

      // Mengirim dua permintaan API secara paralel
      const [penelitianResponse, magangResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/api/penelitian`),
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/api/magang`),
      ]);

      // Menghitung total ajuan penelitian dan magang dari masing-masing API
      const totalPenelitian = penelitianResponse.data.length;
      const totalMagang = magangResponse.data.length;

      setTotalAjuanPenelitian(totalPenelitian);
      setTotalAjuanMagang(totalMagang);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      // Set loading false after fetching
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col flex-1 bg-[#EEF5FF]">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Dashboard
              </h1>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {/* Card 1 */}
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                      <FaMailBulk className="text-6xl text-blue-500 mr-4 flex-shrink-0" />
                      <div>
                        <div className="text-gray-600 text-base md:text-lg mb-1">
                          Total Ajuan Penelitian, Skripsi, Tesis
                        </div>
                        <div className="text-4xl font-bold text-gray-900">
                          {totalAjuanPenelitian}
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-gray-500 text-sm text-center mt-auto">
                      Jumlah dan detail pemohon aktif.
                    </div> */}
                  </div>
                )}

                {/* Card 2 */}
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                      <GiFiles className="text-6xl text-orange-500 mr-4 flex-shrink-0" />
                      <div>
                        <div className="text-gray-600 text-base md:text-lg mb-1">
                          Total Ajuan Magang, PKL, KKN
                        </div>
                        <div className="text-4xl font-bold text-gray-900">
                          {totalAjuanMagang}
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-gray-500 text-sm text-center mt-auto">
                      Count of registered numbers.
                    </div> */}
                  </div>
                )}

                {/* Card 3 */}
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        viewBox="0 0 24 24"
                        className="text-yellow-500 mr-4 flex-shrink-0"
                      >
                        <path
                          fill="currentColor"
                          d="M23 6.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0M17.5 3a.5.5 0 0 1 .5.5V6h2a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m4.5 8.19A6.48 6.48 0 0 1 17.5 13a6.5 6.5 0 0 1-2.735-.602l-2.417 1.266a.75.75 0 0 1-.696 0L2 8.608v8.142l.005.184A3.25 3.25 0 0 0 5.25 20h13.5l.184-.005A3.25 3.25 0 0 0 22 16.75zM11.498 4H5.25l-.186.005a3.25 3.25 0 0 0-3.048 2.919L12 12.154l1.308-.686A6.49 6.49 0 0 1 11 6.5c0-.886.177-1.73.498-2.5"
                        />
                      </svg>
                      <div>
                        <div className="text-gray-600 text-base md:text-lg mb-1">
                          Ajuan Diproses
                        </div>
                        <div className="text-4xl font-bold text-gray-900">
                          0
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-gray-500 text-sm text-center mt-auto">
                      Number of messages sent.
                    </div> */}
                  </div>
                )}

                {/* Card 4 */}
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                      <RiMailCheckFill className="text-6xl text-green-500 mr-4 flex-shrink-0" />
                      <div>
                        <div className="text-gray-600 text-base md:text-lg mb-1">
                          Ajuan Selesai Diproses
                        </div>
                        <div className="text-4xl font-bold text-gray-900">
                          0
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-gray-500 text-sm text-center mt-auto">
                      Number of messages failed to send.
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
