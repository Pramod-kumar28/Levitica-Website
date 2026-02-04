import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLazyVerifyAuthQuery } from '../Services/authService';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const [triggerVerify, { data: authData, error: authError, isLoading, isFetching }] =
    useLazyVerifyAuthQuery();

useEffect(() => {
  triggerVerify();
}, [triggerVerify]);

  useEffect(() => {
  if (isLoading || isFetching) return;

  if (authData?.verified) {
    dispatch(login(authData));

    const redirectPath =
      location.pathname && location.pathname !== '/'
        ? location.pathname
        : '/dashboard';

    navigate(redirectPath, { replace: true });
  } else if (authError) {
    dispatch(logout());
    navigate('/login', { replace: true });
  }

  setIsChecking(false);
}, [
  authData,
  authError,
  isLoading,
  isFetching,
  dispatch,
  navigate,
  location.pathname,
]);

  return { isChecking };
};

export default useAuthCheck;