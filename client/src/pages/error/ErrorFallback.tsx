import { useRouteError, isRouteErrorResponse } from "react-router";
import "./Error.css";

const ErrorFallback = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.statusText || "Unknown error"
    : error instanceof Error
      ? error.message
      : "Unknown error occurred";

  return (
    <div className="efb-wrapper">
      <div className="efb-card">
        <h1 className="efb-title">Something went wrong 😢</h1>
        <p className="efb-message">{message}</p>

        <button className="efb-btn" onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
