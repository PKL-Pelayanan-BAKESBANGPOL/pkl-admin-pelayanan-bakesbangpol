import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTimes, FaEye } from "react-icons/fa";
import { TbListSearch } from "react-icons/tb";
import { VscFilter } from "react-icons/vsc";
import axios from "axios";
import Modal from "react-modal";
import Sidebar from "../assets/components/sidebar";
import TambahData from "./TambahAjuanMagang";

Modal.setAppElement("#root");

export default function DaftarAjuanMagang() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDateFilterModalOpen, setIsDateFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data using Axios with async/await
  const fetchData = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER}/api/magang`
      );
      const fetchedData = response.data.map((task) => ({
        ...task,
        formattedDate: formatDateTime(task.timestamp),
      }));
      setTasks(fetchedData);
      setFilteredTasks(fetchedData);
    } catch (error) {
      setError("Failed to fetch data. Please try again later."); // Set error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };

    const formattedDate = date.toLocaleDateString("id-ID", optionsDate);
    const formattedTime = date
      .toLocaleTimeString("id-ID", optionsTime)
      .replace(".", ".");

    return `${formattedDate}, ${formattedTime} WIB`;
  };

  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter((task) => {
      const tujuanPermohonan = task.tujuanPermohonan || "";
      const applicantsName = task.applicantsName || "";
      const nomorSurat = task.nomorSurat || "";

      return (
        tujuanPermohonan.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        applicantsName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        nomorSurat.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });

    setFilteredTasks(filtered);
  };

  // const checklistTask = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index].completed = !updatedTasks[index].completed;
  //   setTasks(updatedTasks);
  // };

  const handleEditClick = (task, index) => {
    setEditingTask({
      index,
      id: task.id,
      name: task.tujuanPermohonan,
      date: task.timestamp,
      nama: task.applicantsName,
      nomorSurat: task.nomorSurat,
      // completed: task.completed,
      status: task.statusAjuan,
    });
    setShowEditTask(true);
  };

  const handleEditTask = async (updatedTask) => {
    try {
      // Update data di server menggunakan API
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/api/magang/update/${
          updatedTask.id
        }`,
        updatedTask
      );

      // Jika update berhasil, perbarui state lokal
      const updatedTasks = tasks.map((task, index) =>
        index === editingTask.index ? response.data : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Update filteredTasks juga
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setShowEditTask(false);
      setEditingTask(null);
    }
  };

  const handleDateFilter = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedSelectedDate = selectedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (formattedSelectedDate) {
      const filtered = tasks.filter((task) =>
        task.formattedDate.startsWith(formattedSelectedDate)
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  };

  const handleClearFilter = () => {
    setFilterDate("");
    setFilteredTasks(tasks);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Belum Diproses":
        return "bg-yellow-200 text-yellow-800";
      case "Sedang Diproses":
        return "bg-blue-200 text-blue-800";
      case "Sudah Selesai":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleViewClick = (task) => {
    navigate("/detail-ajuan-magang/pkl/kkn", { state: { formData: task } });
  };

  // Menggulir ke atas saat komponen dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col flex-1 min-h-screen bg-[#EEF5FF] pt-5 px-2">
        <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 mt-0 md:mt-5">
            Daftar Ajuan Rekomendasi Magang/PKL/KKN
          </h1>
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex-grow flex items-center space-x-4 w-1/2">
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full bg-transparent border-b-2 text-sm md:text-base text-gray-900 py-2 px-0 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    isFocused || searchKeyword
                      ? "border-[#2A629A]"
                      : "border-gray-300"
                  }`}
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-1.5 bg-[#2A629A] hover:bg-[#003285] text-white rounded-md"
                >
                  <TbListSearch size={22} />
                </button>
              </div>
              <button
                onClick={() => setIsDateFilterModalOpen(true)}
                className="px-4 py-1.5 bg-[#2A629A] text-white rounded-md flex items-center space-x-2 hover:bg-[#003285] focus:outline-none"
              >
                <VscFilter size={22} />
                <span className="text-sm md:text-base font-medium">Filter</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-4 text-gray-500 text-sm md:text-base">
                  Memuat...
                </div>
              ) : error ? (
                <div className="text-center py-4 text-red-500 text-sm md:text-base">
                  {error}
                </div>
              ) : filteredTasks.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Jenis Ajuan
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Waktu
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Nama
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Nomor Surat
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map((task, index) => {
                      const key =
                        task.tujuanPermohonan && task.timestamp
                          ? `${task.tujuanPermohonan}-${task.timestamp}`
                          : `task-${index}`;
                      return (
                        <tr key={key}>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-sm md:text-base whitespace-nowrap">
                            {task.tujuanPermohonan}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-sm md:text-base whitespace-nowrap">
                            {formatDateTime(task.timestamp)}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-sm md:text-base whitespace-nowrap">
                            {task.applicantsName}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-sm md:text-base whitespace-nowrap">
                            {task.nomorSurat}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-sm md:text-base whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-sm md:text-base leading-5 font-semibold rounded-full ${getStatusColor(
                                task.statusAjuan
                              )}`}
                            >
                              {task.statusAjuan}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap flex items-center">
                            <button
                              onClick={() => handleViewClick(task)}
                              className="text-[#2A629A] hover:text-[#86B6F6] mr-2"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEditClick(task, index)}
                              className="text-[#2A629A] hover:text-[#86B6F6] mx-1"
                            >
                              <FaEdit />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center col-span-1 md:col-span-2 lg:col-span-3">
                  <iframe
                    src="https://lottie.host/embed/4a3394e0-e810-4308-a6ed-8e6b8e27c074/u5FXJGkSUr.json"
                    width="300"
                    height="250"
                    title="Search Not Found Animation"
                  ></iframe>
                  <p className="text-sm md:text-base text-gray-700 text-center">
                    Maaf, pencarian Anda tidak ditemukan!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Filter Modal */}
        {isDateFilterModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-full max-w-[95%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[35%] max-h-full animate__animated animate__fadeInDown mx-4">
              <div className="relative bg-white rounded-lg shadow">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Filter Berdasarkan Tanggal
                  </h2>
                  <button
                    onClick={() => setIsDateFilterModalOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-xs md:text-sm leading-relaxed text-gray-500 text-center mt-2">
                    Pilih tanggal untuk menyaring hasil Anda.
                  </p>
                  <div>
                    <label
                      className="block text-gray-700 my-2 text-sm md:text-base font-medium"
                      htmlFor="filterDate"
                    >
                      Pilih Tanggal
                    </label>
                    <input
                      id="filterDate"
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-1.5 text-gray-700 bg-gray-50 focus:border-[#2A629A] hover:border-[#2A629A] focus:outline-none transition duration-150"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b">
                  <button
                    onClick={handleClearFilter}
                    className="py-1.5 px-4 me-3 text-sm md:text-base font-medium text-gray-900 bg-white rounded-full border border-gray-300 hover:bg-gray-200"
                  >
                    Hapus Filter
                  </button>
                  <button
                    onClick={() => {
                      setIsDateFilterModalOpen(false);
                      handleDateFilter({ target: { value: filterDate } });
                    }}
                    className="text-white bg-[#2A629A] hover:bg-[#003285] border border-gray-300 font-medium rounded-full text-sm md:text-base px-4 py-1.5 text-center"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditTask && (
          <Modal
            isOpen={showEditTask}
            onRequestClose={() => setShowEditTask(false)}
            style={customModalStyles}
          >
            <TambahData
              initialData={editingTask}
              onAdd={handleEditTask}
              onCancel={() => setShowEditTask(false)}
              isEditing={true}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
