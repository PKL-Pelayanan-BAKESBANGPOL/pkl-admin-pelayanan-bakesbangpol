import React from "react";
import { Link } from "react-router-dom";

export default function TidakDitemukan() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EEF5FF] p-4">
      <div className="w-full max-w-md">
        <iframe
          src="https://lottie.host/embed/dcf35d6e-1a0e-41b7-aaff-b79367afa106/uwbqGPKt4t.json"
          className="w-full h-64 mb-10"
          title="404 Animation"
        ></iframe>
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2 text-center">
        Halaman Tidak Ditemukan!
      </h2>
      <p className="text-base md:text-lg font-medium text-gray-600 mb-6 text-center">
        Maaf, halaman yang Anda cari tidak ada. Silakan kembali ke halaman
        utama.
      </p>
      <Link
        to="/"
        className="text-base md:text-base bg-[#2A629A] text-white font-medium px-5 py-2 rounded-full hover:bg-[#003285] transition duration-300"
      >
        Masuk Akun
      </Link>
    </div>
  );
}
