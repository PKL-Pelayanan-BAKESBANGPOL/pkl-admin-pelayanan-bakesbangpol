import axios from "axios";
// import { toast } from "react-hot-toast";
import { setUsername } from "./userReducer";
// import { setIsLoggedIn } from "./loginReducer";

export const getUser = () => async (dispatch, getState) => {
  const { token } = getState().login; // Mengambil token dari state login
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/profile`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`, // Menyertakan token dalam header
        },
      }
    );
    const { username } = response?.data;
    dispatch(setUsername(username));
  } catch (error) {
    // console.error(
    //   "Token tidak valid: ",
    //   error.response?.data,
    //   error.response?.status,
    //   error.message
    // );
    // if (!token && !setIsLoggedIn)
    // const { token, isLoggedIn } = getState().login;
    // if (token === null || isLoggedIn === false)
    //   toast("Maaf, terjadi kesalahan.", {
    //     style: {
    //       background: "#FF0000",
    //       color: "#FFFFFF",
    //       borderRadius: "10px",
    //       fontSize: "14px",
    //       textAlign: "center",
    //       maxWidth: "900px",
    //     },
    //     position: "top-center",
    //     duration: 3000,
    //   });
  }
};
