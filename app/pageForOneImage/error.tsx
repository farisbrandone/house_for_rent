"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center mt-5">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-center text-lg">Un imprévue est survenue!</h2>
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-lg text-white transition-colors hover:bg-blue-400 mr-auto ml-auto"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Essayez encore
        </button>
      </div>
    </main>
  );
}
