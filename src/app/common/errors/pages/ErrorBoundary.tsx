import React, { useState, useEffect, type ReactNode } from "react";
import { Result, Button } from "antd";

interface Props {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
  });

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Uncaught error:", error.error);

      setErrorState({
        hasError: true,
        error: error.error,
      });

      // Log to error reporting service
      // errorReportingService.captureException(error.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);

      setErrorState({
        hasError: true,
        error: event.reason,
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  if (errorState.hasError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Result
          status="500"
          title="Something went wrong"
          subTitle="We're sorry, but something unexpected happened. Please try refreshing the page."
          extra={
            <Button type="primary" onClick={handleReload}>
              Refresh Page
            </Button>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
