"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Something went wrong
        </h2>
        <p className="mb-6 text-zinc-700">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
