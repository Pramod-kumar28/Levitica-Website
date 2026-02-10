// components/auth/AuthBootstrap.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyVerifyAuthQuery } from "../Services/authService";
import { login, logout } from "../features/authSlice";

const AuthBootstrap = () => {
  const dispatch = useDispatch();
  const [triggerVerify, result] = useLazyVerifyAuthQuery();

  // 🔑 Always attempt restore ONCE on mount
  useEffect(() => {
    triggerVerify();
  }, [triggerVerify]);

  // 🔑 Resolve auth state
  useEffect(() => {
    if (result.isSuccess && result.data?.verified && result.data?.user) {
      dispatch(login({ user: result.data.user }));
    } else if (result.isSuccess || result.isError) {
      dispatch(logout());
    }
  }, [result, dispatch]);

  return null;
};

export default AuthBootstrap;
