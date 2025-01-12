import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "https://api-disasters-reports.vercel.app/api/disasters"
        );
        setTotalReports(response.data.data?.length || 0); // Mengambil jumlah laporan
      } catch (error) {
        console.error("Error fetching reports:", error.message);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-indigo-600">
          Dashboard
        </h2>
        <p className="mt-2 text-lg">Selamat Datang, Admin</p>
      </header>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card untuk total laporan */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl text-gray-700">Total Laporan</h3>
          <p className="text-2xl text-red-600 mt-2">{totalReports} Laporan</p>
        </div>

        {/* Card lainnya */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl text-gray-700">Korban Terkena</h3>
          <p className="text-2xl text-red-600 mt-2">120 Orang</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl text-gray-700">Status Evakuasi</h3>
          <p className="text-2xl text-yellow-500 mt-2">Evakuasi Sedang Berlangsung</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
