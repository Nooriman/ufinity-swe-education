import { useState } from "react";
import "./Error.css";

type Props = {
  error: Error;
  resetErrorBoundary?: () => void; // provided by react-error-boundary
};

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="efb-wrapper">
      <div className="efb-card" role="alert" aria-live="assertive">
        <div className="efb-icon" aria-hidden>
          ⚠️
        </div>
        <h1 className="efb-title">Something went wrong</h1>
        <p className="efb-subtitle">
          An unexpected error occurred. You can try again, or reload the page.
        </p>

        <div className="efb-actions">
          {resetErrorBoundary && (
            <button
              className="efb-btn efb-btn-primary"
              onClick={resetErrorBoundary}
            >
              Try Again
            </button>
          )}
          <button
            className="efb-btn efb-btn-ghost"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
          <button
            className="efb-btn efb-btn-ghost"
            onClick={() => setShowDetails((v) => !v)}
            aria-expanded={showDetails}
            aria-controls="efb-details"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showDetails && (
          <pre id="efb-details" className="efb-details">
            {error?.message || "Unknown error"}
          </pre>
        )}
      </div>
    </div>
  );
}
