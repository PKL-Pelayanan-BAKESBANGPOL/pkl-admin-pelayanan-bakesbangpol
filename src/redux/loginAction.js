import axios from "axios";
import toast from "react-hot-toast";
import {
  setUser,
  setToken,
  setShowPassword,
  setLoading,
  setIsLoggedIn,
} from "./loginReducer";

// Fungsi untuk login akun admin
export const login = (data, navigate) => async (dispatch, getState) => {
  const { username } = getState().login;
  dispatch(setLoading(true));
  try {
    const responseLogin = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/login-admin`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (responseLogin?.status === 200) {
      dispatch(setUser(responseLogin?.data?.user));
      dispatch(setToken(responseLogin?.data?.token));
      // console.log("Cek token: ", responseLogin?.data?.token);
      dispatch(setIsLoggedIn(true));
      dispatch(setShowPassword(false));
      // setLoading(false);
      toast(`Anda berhasil masuk sebagai admin ${username}.`, {
        icon: null,
        style: {
          background: "#28A745",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/beranda");
      }, 3000);
    }
  } catch (error) {
    // Cek jika error dari respons server adalah "Username atau Password salah"
    if (error?.response?.data?.message === "Username atau Password salah") {
      toast.error("Nama pengguna atau kata sandi salah! Silakan coba lagi.", {
        icon: null,
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
    } else {
      // Jika error lain yang tidak dikenali
      toast.error(
        "Maaf, terjadi kesalahan pada sistem. Silakan coba lagi nanti.",
        {
          icon: null,
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
        }
      );
      // console.log(
      //   "Cek error: ",
      //   error.response?.data,
      //   error.response?.status,
      //   error.message
      // );
    }
  } finally {
    dispatch(setLoading(false));
  }
};

// Fungsi untuk logout akun admin
export const logout = (navigate) => (dispatch, getState) => {
  const { username } = getState().login;
  try {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    toast(`Anda telah keluar sebagai admin ${username}.`, {
      style: {
        background: "#28A745",
        color: "#FFFFFF",
        borderRadius: "10px",
        fontSize: "14px",
        textAlign: "center",
        maxWidth: "900px",
      },
      position: "top-center",
      duration: 3000,
    });
    navigate("/");
  } catch (error) {
    toast.error(error?.message);
    // console.log("Error Logout:", error);
  }
};

// Fungsi untuk mengecek token untuk Protected Routes
export const checkToken = (navigate) => (dispatch, getState) => {
  const { token, isLoggedIn } = getState().login;
  if (token === null || isLoggedIn === false) {
    navigate("/");
    setTimeout(() => {
      toast("Silakan masuk terlebih dahulu!", {
        icon: null,
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
    });
  }
};

// Fungsi untuk mengecek jika akun admin sudah login
export const checkIsLoggedIn = (navigate) => (dispatch, getState) => {
  const { token, isLoggedIn, username } = getState().login;
  if (token && isLoggedIn) {
    navigate("/beranda");
    setTimeout(() => {
      toast(`Anda sudah masuk sebagai ${username}.`, {
        icon: null,
        style: {
          background: "#28A745",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
    });
  }
};
