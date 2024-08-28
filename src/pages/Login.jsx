import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { login } from "../redux/loginAction";
import {
  setUsername,
  setPassword,
  setShowPassword,
} from "../redux/loginReducer";
import Bakesbangpol from "../assets/images/Logo Bakesbangpol.png";
import BakesbangpolFoto from "../assets/images/Foto Bakesbangpol.jpg";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, password, showPassword, loading } = useSelector(
    (state) => state.login
  );

  // Mengatur ulang state login ke nilai awal atau kosong
  useEffect(() => {
    dispatch(setUsername(""));
    dispatch(setPassword(""));
    dispatch(setShowPassword(false));
  }, []);

  // Fungsi untuk menangani tombol masuk akun
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Jika kolom nama pengguna tidak diisi
    if (username === "") {
      toast("Mohon isi kolom nama pengguna!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });

      return false;
    }

    // Jika kolom kata sandi tidak diisi
    if (password === "") {
      toast("Mohon isi kata sandi!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });

      return false;
    }

    // Jika kolom nama pengguna dan kata sandi tidak diisi
    if (username === "" || password === "") {
      toast("Mohon isi nama pengguna dan kata sandi!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });

      return false;
    }

    const data = {
      username,
      password,
    };

    dispatch(login(data, navigate));
  };

  // Fungsi untuk menangani tombol toggle password
  const toggleShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
  };

  return (
    <div>
      <div className="min-h-screen flex mx-3 md:mx-0 bg-white">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-40">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo Bakesbangpol, Title, dan Desc */}
            <div>
              <img
                className="h-28 w-auto"
                src={Bakesbangpol}
                alt="Logo Bakesbangpol"
              />
              <h2 className="mt-6 text-2xl md:text-3xl font-bold text-main">
                Masuk Akun Admin
              </h2>
              <p className="mt-4 text-xs md:text-sm font-semibold text-primary text-[#86B6F6]">
                Masuk{" "}
                <span href="#" className="font-medium text-main text-gray-900">
                  untuk mengelola dan memproses ajuan permohonan dengan lebih
                  mudah dan efisien.
                </span>
              </p>
            </div>

            {/* Form Section */}
            <div className="mt-14">
              <form
                // action="#"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm md:text-base font-medium text-gray"
                  >
                    Nama Pengguna
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Masukkan Nama Pengguna"
                      value={username}
                      onChange={(e) => dispatch(setUsername(e.target.value))}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-[#2A629A] text-sm md:text-base text-gray-900 py-2 px-0 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-1 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm md:text-base font-medium text-gray"
                  >
                    Kata Sandi
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-[#2A629A] text-sm md:text-base text-gray-900 py-2 px-0 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8A8A8A]"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <FaEye className="w-[17px] text-gray-400 hover:text-[#86B6F6]" />
                      ) : (
                        <FaEyeSlash className="w-[17px] text-gray-400 hover:text-[#86B6F6]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Loader dan Tombol Masuk Akun */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2A629A] text-white font-medium w-full py-2 rounded-full hover:bg-[#003285] transition duration-300 flex items-center justify-center"
                  >
                    {loading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="w-20 h-6"
                      >
                        <circle cx="12" cy="2" r="0" fill="currentColor">
                          <animate
                            attributeName="r"
                            begin="0"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(45 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.125s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(90 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.25s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(135 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.375s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(180 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.5s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(225 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.625s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(270 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.75s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(315 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.875s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                      </svg>
                    ) : (
                      "Masuk"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Photo on Login Section */}
        <div className="hidden lg:block relative w-0 flex-1 bg-main">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={BakesbangpolFoto}
            alt="Foto Bakesbangpol"
          />
          <div className="absolute inset-0 bg-black opacity-25"></div>
        </div>
      </div>
    </div>
  );
}
