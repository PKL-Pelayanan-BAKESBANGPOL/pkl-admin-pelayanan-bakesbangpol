import React, { useState } from "react";
import Sidebar from "../assets/components/sidebar";

export default function AdminProfil() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};

    if (touched.username && !username.trim()) {
      newErrors.username = "Mohon Diisi Nama Pengguna";
    }

    if (touched.password && password && password.length < 6) {
      newErrors.password = "Password Harus Diisi Miniman 6 Karakter";
    }

    if (touched.email && !email.trim()) {
      newErrors.email = "Mohon Diisi Email yang Ada";
    } else if (touched.email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email Tidak Valid";
    }

    if (touched.fullname && !fullname.trim()) {
      newErrors.fullname = "Mohon Diisi Nama Lengkap";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log({ username, password, email, fullname });
      // Optionally reset form and errors
      setErrors({});
    }
  };

  const handleBlur = (field) => (e) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col flex-1 bg-[#EEF5FF]">
        <main>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Profil Admin
              </h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                {/* Left Column: Profile Picture */}
                <div className="col-span-1">
                  <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-col items-center">
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="w-40 h-40 rounded-full mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <button className="text-blue-500 hover:text-blue-600 mb-4">
                        Ganti Foto
                      </button>
                      <p className="text-gray-600 text-center">
                        <span className="font-semibold">Wewenang:</span> Global
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Update Form */}
                <div className="col-span-2">
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6">
                      Ubah Data Diri
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="username"
                        >
                          Nama Pengguna
                        </label>
                        <input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={handleBlur("username")}
                          placeholder="admin"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
                            errors.username && touched.username
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.username && touched.username && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.username}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="password"
                        >
                          Kata Sandi
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={handleBlur("password")}
                          placeholder="Kosongkan jika tidak diganti"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <p className="text-xs text-yellow-500 mt-1">
                          *Kosongkan jika Password tidak diganti.
                        </p>
                        {errors.password && touched.password && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="email"
                        >
                          Email Aktif
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={handleBlur("email")}
                          placeholder="viantaum20@gmail.com"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
                            errors.email && touched.email
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <p className="text-xs text-yellow-500 mt-1">
                          *Pastikan E-mail Anda Aktif.
                        </p>
                        {errors.email && touched.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="mb-6">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="fullname"
                        >
                          Nama Lengkap
                        </label>
                        <input
                          id="fullname"
                          type="text"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          onBlur={handleBlur("fullname")}
                          placeholder="Vian Taum"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
                            errors.fullname && touched.fullname
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.fullname && touched.fullname && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.fullname}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-end">
                        <button
                          type="submit"
                          className="mt-4 bg-[#2A629A] text-white font-medium px-5 py-2 rounded-full hover:bg-[#003285] transition duration-300"
                        >
                          Perbarui Data
                        </button>
                      </div>
                    </form>
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
