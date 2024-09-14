import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  if (!currentUser) {
    return <Navigate to="/404" />;
  }

  const users = useSelector((state: any) => state.registration.users);

  const isAuthenticated = users.some(
    (user) =>
      user.email === currentUser.email && user.password === currentUser.password
  );

  return isAuthenticated ? element : <Navigate to="/404" />;
};

export default PrivateRoute;
