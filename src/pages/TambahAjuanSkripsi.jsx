import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TambahDataSkripsi({
  initialData,
  onAdd,
  onCancel,
  isEditing,
}) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [nama, setNama] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [statusAjuan, setStatusAjuan] = useState("Belum Diproses");
  const [focusedField, setFocusedField] = useState(null);
  const [id, setId] = useState(null);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER}/api/penelitian`
      );
      if (response && response.data) {
        const fetchedData = response.data[0];
        const readableDate = formatDateTime(fetchedData.date);
        console.log("Readable Date:", readableDate); // Debugging log
        setDate(readableDate); // Set dalam format yang baru
        setTaskName(fetchedData.name || "");
        setNama(fetchedData.nama || "");
        setNomorSurat(fetchedData.nomorSurat || "");
        setStatusAjuan(fetchedData.statusAjuan || "Belum Diproses");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      console.log("Initial data in TambahDataSkripsi:", initialData); // Debugging log
      setId(initialData.id || null);
      setTaskName(initialData.name || "");
      setDate(formatDateTime(initialData.date || ""));
      setNama(initialData.nama || "");
      setNomorSurat(initialData.nomorSurat || "");
      setStatusAjuan(initialData.statusAjuan || "Belum Diproses");
    } else {
      // Reset form jika tidak ada initialData
      fetchData();
    }
  }, [initialData]);

  console.log("ID after setting:", id); // Debugging log

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim() || !date || !nama.trim() || !nomorSurat.trim()) {
      alert("Mohon isi semua field!");
      return;
    }

    const updatedTask = {
      id,
      name: taskName,
      date: date, // Pastikan ini dalam format YYYY-MM-DD
      nama,
      nomorSurat,
      statusAjuan: statusAjuan || "Belum Diproses",
      // completed: initialData ? initialData.completed : false,
    };

    console.log("Submitting Task:", updatedTask);

    if (!id) {
      console.error("ID is required for updating.");
      alert("ID is missing. Cannot update.");
      return;
    }

    try {
      if (isEditing) {
        // Update data di server menggunakan API
        const response = await axios.post(
          // `${
          //   import.meta.env.VITE_REACT_APP_SERVER
          // }/api/penelitian/update/${id}`
          `https://api-admin-one.vercel.app/api/penelitian/update`,
          updatedTask
        );
        if (response && response.data) {
          onAdd(response.data); // Send updated data to parent component
        } else {
          console.error("Invalid response format", response);
        }
      } else {
        // Add new data if not editing
        const params = new URLSearchParams(updatedTask).toString(); // Convert object to query string
        const response = await axios.get(
          "https://api-admin-one.vercel.app/api/penelitian?${params}"
          // `${import.meta.env.VITE_REACT_APP_SERVER}/api/penelitian?${params}`
        );
        if (response && response.data) {
          onAdd(response.data); // Send new data to parent component
          console.log("response data", response.data);
        } else {
          console.error("Invalid response format", response);
        }
      }
      onCancel(); // Close modal after submitting
    } catch (error) {
      console.error(
        "Failed to submit task:",
        error?.response?.data,
        error?.response?.status,
        error?.response?.message
      );
    }
  };

  const inputClassName = (field, isEditable = true) =>
    `w-full bg-transparent border-b-2 text-sm py-2 px-0 focus:outline-none focus:ring-0 transition-colors duration-300 ${
      focusedField === field ? "border-[#2A629A]" : "border-gray-300"
    } ${
      isEditable
        ? "text-gray-900"
        : "text-gray-500 bg-gray-100 cursor-not-allowed"
    }`;

  // if (isEditing && (!initialData || !initialData.id)) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="bg-white rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            id
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setTaskName(e.target.value)}
            onFocus={() => setFocusedField("id")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName("id", !isEditing)}
            required
            disabled={isEditing}
          />
        </div> */}
        <div>
          <label
            htmlFor="taskName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Jenis Ajuan
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onFocus={() => setFocusedField("taskName")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName("taskName", !isEditing)}
            required
            disabled={isEditing}
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Waktu
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => setFocusedField("date")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName("date", !isEditing)}
            required
            disabled={isEditing}
          />
        </div>
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            onFocus={() => setFocusedField("nama")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName("nama", !isEditing)}
            required
            disabled={isEditing}
          />
        </div>
        <div>
          <label
            htmlFor="nomorSurat"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nomor Surat
          </label>
          <input
            type="text"
            id="nomorSurat"
            name="nomorSurat"
            value={nomorSurat}
            onChange={(e) => setNomorSurat(e.target.value)}
            onFocus={() => setFocusedField("nomorSurat")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName("nomorSurat")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={statusAjuan}
            onChange={(e) => setStatusAjuan(e.target.value)}
            onFocus={() => setFocusedField("status")}
            onBlur={() => setFocusedField(null)}
            className={inputClassName("status")}
            required
          >
            <option value="Belum Diproses">Belum Diproses</option>
            <option value="Sedang Diproses">Sedang Diproses</option>
            <option value="Sudah Selesai">Sudah Selesai</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition duration-300 focus:outline-none"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2A629A] hover:bg-[#003285] transition duration-300 focus:outline-none"
          >
            {isEditing ? "Update Data" : "Tambah Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
