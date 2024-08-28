import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IoIosArrowBack, IoMdArrowRoundBack } from "react-icons/io";
import Sidebar from "../assets/components/sidebar";

const InfoRow = ({ label, value }) => (
  <div className="grid grid-cols-[150px_1fr] py-2">
    <p className="font-semibold text-gray-700 text-sm sm:text-base">{label}:</p>
    <p className="text-gray-600 text-sm sm:text-base">{value || "N/A"}</p>
  </div>
);

const AttachmentLink = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:underline"
  >
    {label}
  </a>
);

export default function DetailAjuanSkripsi() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [formData, setFormData] = useState(location.state?.formData || null);

  useEffect(() => {
    if (!formData) {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        setFormData(JSON.parse(storedData));
      } else {
        navigate("/daftar-ajuan-penelitian/tesis/skripsi");
      }
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData, navigate]);

  if (!formData) {
    return <div>Data tidak ditemukan!</div>;
  }

  if (!formData) {
    return <div>Data tidak ditemukan</div>;
  }

  // const handleBack = () => {
  //   navigate("/daftar-ajuan-penelitian/tesis/skripsi");
  // };

  return (
    <div className="flex flex-col min-h-screen bg-[#EEF5FF]">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 flex flex-col px-2">
          <div className="flex-1 py-6">
            <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
              {/* Back Button */}
              <div className={`${isMobile ? "mb-5" : "mb-10"}`}>
                <Link to="/daftar-ajuan-penelitian/tesis/skripsi">
                  <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3] cursor-pointer">
                    {isMobile ? (
                      <IoMdArrowRoundBack className="text-2xl" />
                    ) : (
                      <>
                        <IoIosArrowBack className="text-2xl" />
                        <h6 className="text-base ml-1">Kembali</h6>
                      </>
                    )}
                  </div>
                </Link>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 mt-0 md:mt-5 text-center md:text-left">
                Hasil Pengajuan Penelitian/Tesis/Skripsi
              </h1>
              <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-200">
                <div className="flex flex-col gap-4">
                  {/* Info Rows */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Nomor Surat
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.letterNumber}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Nama Lengkap
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.name}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Nama Peneliti
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.researcherName}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Alamat Rumah
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.address}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      No. Telepon/Email
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.inputValue}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Perguruan Tinggi
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.institution}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Pekerjaan
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.occupation}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Judul Penelitian
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.judulPenelitian}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Bidang Penelitian
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.researchField}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Tujuan Penelitian
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.tujuanPenelitian}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Dosen Pembimbing
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.supervisorName}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Anggota Tim Peneliti
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.teamMembers}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Waktu Penelitian
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.researchPeriod}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Status Penelitian
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.statusPenelitian}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-3/3 sm:w-1/4">
                      Lokasi Penelitian
                    </span>
                    <span className="text-gray-900 text-sm md:text-base w-3/3 sm:w-3/4">
                      {formData.researchLocation}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
                    <span className="font-semibold text-gray-700 text-sm md:text-base w-full sm:w-1/4 mb-2 sm:mb-0">
                      Lampiran
                    </span>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full sm:w-3/4">
                      <a
                        href={formData.ktpUrl}
                        className="flex-1 bg-blue-600 text-white text-sm md:text-base py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 mb-2 sm:mb-0 block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AttachmentLink label="KTP" />
                      </a>
                      <a
                        href={formData.suratPengantarUrl}
                        className="flex-1 bg-green-600 text-white text-sm md:text-base py-3 px-4 rounded-lg shadow-md hover:bg-green-700 mb-2 sm:mb-0 block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AttachmentLink label="Surat Pengantar" />
                      </a>
                      <a
                        href={formData.proposalUrl}
                        className="flex-1 bg-yellow-600 text-white text-sm md:text-base py-3 px-4 rounded-lg shadow-md hover:bg-yellow-700 mb-2 sm:mb-0 block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AttachmentLink label="Proposal" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
