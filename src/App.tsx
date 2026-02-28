import { Suspense } from "react";
import { Spin } from "antd";
import AppRouter from "./core/router/AppRouter";

const GlobalLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
    <div className="text-center">
      <Spin size="large" />
      <p className="mt-4 text-gray-600">Loading application...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<GlobalLoading />}>
        <AppRouter />
      </Suspense>
    </div>
  );
};

export default App;
