// Import React 19 compatibility patch for Ant Design v5
// This patch fixes compatibility issues between React 19 and Ant Design v5
// Must be imported before any other React or Ant Design imports
import "@ant-design/v5-patch-for-react-19";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider, App as AntApp } from "antd";
import { store, persistor } from "./core/store/store";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./app/common/errors/pages/ErrorBoundary.tsx";
import PersistGateLoading from "./app/common/loading/PersistGateLoading.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<PersistGateLoading />} persistor={persistor}>
          <BrowserRouter>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#36bed3",
                },
              }}
            >
              <AntApp>
                <App />
              </AntApp>
            </ConfigProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
