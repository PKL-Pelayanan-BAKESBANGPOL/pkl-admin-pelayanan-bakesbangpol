import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../redux/loginAction";

export default function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.login);
  const hasCheckedToken = useRef(false);

  // Jika token tidak ada, maka akan menampilkan toast error dan direct ke login page
  useEffect(() => {
    if (!hasCheckedToken.current) {
      dispatch(checkToken(navigate));
      hasCheckedToken.current = true;
    }
  }, [dispatch, navigate]);

  return null;
}
