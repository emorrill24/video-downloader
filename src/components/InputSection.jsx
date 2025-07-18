"use client";
import { useState } from "react";
import validateUrl from "../lib/validateUrl";

export default function InputSection({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate URL
    if (!validateUrl(url)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
    // Clear error if valid
    setError("");
    if (onSubmit) {
      onSubmit(url);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Download
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
