/* eslint-disable @typescript-eslint/no-explicit-any */
// providers/AppProviders.tsx
import React, { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../core/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { App as AntApp } from "antd";
import AuthProvider from "./AuthProvider";

// import { PersistGate } from 'redux-persist/es/integration/react';
interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders combines all the context providers needed for the application.
 * This creates a clean provider hierarchy and keeps the _app.tsx file cleaner.
 */
const AppProvidersContent: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AntApp>
      <AuthProvider>{children}</AuthProvider>
    </AntApp>
  );
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {/* PersistGate - waits for persisted state to load */}
      <PersistGate loading={<div>Loading...</div>} persistor={persistor as any}>
        <AppProvidersContent>{children}</AppProvidersContent>
      </PersistGate>
    </Provider>
  );
};

// {
/* <ThemeProvider>
<NotificationProvider>{children}</NotificationProvider>
</ThemeProvider> */
// }
