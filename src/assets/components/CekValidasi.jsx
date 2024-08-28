import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIsLoggedIn } from "../../redux/loginAction";

export default function CekValidasi() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasCheckedLogin = useRef(false);

  // Jika token tidak ada, maka akan menampilkan toast error dan direct ke login page
  useEffect(() => {
    if (!hasCheckedLogin.current) {
      dispatch(checkIsLoggedIn(navigate));
      hasCheckedLogin.current = true;
    }
  }, [dispatch, navigate]);

  return null;
}
