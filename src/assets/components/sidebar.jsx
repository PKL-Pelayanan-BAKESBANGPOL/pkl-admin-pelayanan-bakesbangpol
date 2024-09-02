import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbListLetters, TbListNumbers } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import {
  HomeIcon,
  // UserIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { logout } from "../../redux/loginAction";
import { getUser } from "../../redux/userAction";
import Bakesbangpol from "../images/Logo Bakesbangpol.png";

const navigationItems = [
  { name: "Beranda", href: "/beranda", icon: HomeIcon },
  {
    name: "Daftar Ajuan Penelitian",
    href: "/daftar-ajuan-penelitian/tesis/skripsi",
    icon: TbListNumbers,
  },
  {
    name: "Daftar Ajuan Magang",
    href: "/daftar-ajuan-magang/pkl/kkn",
    icon: TbListLetters,
  },
  // { name: "Akun", href: "/admin-profil", icon: UserIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Modal Component
const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-[95%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[35%] max-h-full animate__animated animate__zoomIn mx-4">
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Konfirmasi Keluar
            </h3>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
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
            <p className="text-sm md:text-base leading-relaxed text-gray-500">
              Apakah Anda yakin ingin{" "}
              <span className="text-[#FF0000] font-medium text-sm md:text-base">
                keluar
              </span>
              <span className="text-gray-500 text-sm md:text-base">?</span>
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              onClick={onClose}
              className="py-1.5 px-6 me-3 text-sm md:text-base font-medium text-gray-900 bg-white rounded-full border hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="text-white bg-[#FF0000] hover:bg-red-600 border font-medium rounded-full text-sm md:text-base px-5 py-1.5 text-center"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = useSelector((state) => state.user.username);
  // console.log("Cek username", username);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setModalOpen(false);
    // console.log("Logging out..."); // Tambahkan log
    dispatch(logout(navigate));
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden p-4">
        <button
          type="button"
          className="text-gray-500 hover:text-[#86B6F6] focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className={"h-8 w-8"} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-[#86B6F6] to-[#003285] overflow-y-auto">
          <div className="absolute top-0 left-0 ml-3 pt-2">
            <button
              type="button"
              className="flex items-center justify-center p-2 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon
                className="h-6 w-6 text-white hover:bg-white/30 hover:scale-110 hover:rounded-md transition-transform duration-200 ease-in-out"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center px-4 py-4">
            <img
              src={Bakesbangpol}
              alt="Logo Bakesbangpol"
              className="w-32 h-auto m-5"
            />
            <span className="text-white text-xl mb-4 flex flex-col items-center">
              <span className="font-medium text-xl mb-1">Pelayanan</span>
              <span className="font-bold text-2xl">BAKESBANGPOL</span>
            </span>

            <div className="flex flex-col space-y-1 w-full px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={classNames(
                    currentRoute === item.href
                      ? "bg-white/30 text-white"
                      : "text-white hover:bg-white/10",
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md w-full"
                  )}
                >
                  {item.icon &&
                    React.createElement(item.icon, {
                      className: "mr-4 flex-shrink-0 h-6 w-6 text-white",
                      "aria-hidden": true,
                    })}
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Nama Pengguna dengan Dropdown */}
          {username && (
            <div className="mt-auto flex-shrink-0 px-4 pb-4">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="group flex items-center justify-between px-4 py-3 text-sm font-medium bg-white/10 hover:bg-white/30 text-white w-full rounded-md"
                >
                  <div className="flex items-center">
                    <FaCircleUser className="h-8 w-8 text-white mr-3" />
                    <span className="truncate">{username}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 text-white transform transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 w-full bg-white/10 rounded-md shadow-lg z-10">
                    <button
                      onClick={handleLogoutClick}
                      className="group flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white/30 rounded-md w-full"
                    >
                      <LuLogOut
                        className="mr-3 h-6 w-6 text-white rotate-180"
                        aria-hidden="true"
                      />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gradient-to-b from-[#86B6F6] to-[#003285]">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex flex-col items-center px-4 py-4">
            <img
              src={Bakesbangpol}
              alt="Logo Bakesbangpol"
              className="w-36 h-auto mb-8"
            />
            <span className="text-white text-xl mb-4 flex flex-col items-center">
              <span className="font-medium text-xl mb-1">Pelayanan</span>
              <span className="font-bold text-2xl">BAKESBANGPOL</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={classNames(
                    currentRoute === item.href
                      ? "bg-white/30 text-white"
                      : "text-white hover:bg-white/10",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                  )}
                >
                  {item.icon &&
                    React.createElement(item.icon, {
                      className: "mr-3 flex-shrink-0 h-6 w-6 text-white",
                      "aria-hidden": true,
                    })}
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Nama Pengguna dengan Dropdown */}
          {username && (
            <div className="mt-auto flex-shrink-0 px-4 pb-4">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="group flex items-center justify-between px-4 py-3 text-sm font-medium bg-white/10 hover:bg-white/30 text-white w-full rounded-md"
                >
                  <div className="flex items-center">
                    <FaCircleUser className="h-8 w-8 text-white mr-3" />
                    <span className="truncate">{username}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 text-white transform transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 w-full bg-white/10 rounded-md shadow-lg z-10">
                    <button
                      onClick={handleLogoutClick}
                      className="group flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white/30 rounded-md w-full"
                    >
                      <LuLogOut
                        className="mr-3 h-6 w-6 text-white rotate-180"
                        aria-hidden="true"
                      />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Konfirmasi Modal */}
      <ConfirmationModal
        show={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
