import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../core/store/hooks";
import { selectIsAuthenticated } from "../../../../features/auth/store/authSelectors";
import { logout } from "../../../../features/auth/store/authSlice";
import { routes } from "../../../../config/routes";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.auth.login);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <div className="flex gap-4">
            <Button type="primary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            {!isAuthenticated ? (
              <Button onClick={() => navigate("/auth/login")}>Login</Button>
            ) : (
              <Button onClick={handleLogout}>Logout</Button>
            )}
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        }
      />
    </div>
  );
};

export default Forbidden;
