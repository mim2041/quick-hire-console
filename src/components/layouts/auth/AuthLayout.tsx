import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-[#F2F5F7] min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
