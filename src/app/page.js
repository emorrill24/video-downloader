"use client";
import { useState } from "react";
import InputSection from "../components/InputSection";
import DownloadOptions from "../components/DownloadOptions";

export default function Home() {
  // State for available download options
  const [options, setOptions] = useState([]);
  // New state for loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async (url) => {
    console.log("URL submitted:", url);
    // Reset state at the start
    setLoading(true);
    setError(null);
    setOptions([]);

    try {
      const res = await fetch(`/api/getOptions?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        console.error("API error:", res.status);
        setError("Unable to fetch download options.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      console.log("API response:", data);
      if (data.options) {
        setOptions(data.options);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-8 pb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        YouTube Video Downloader
      </h1>

      <InputSection onSubmit={handleDownload} />

      {/* Show loading, error, or options */}
      {loading && (
        <p className="text-blue-500 mt-4 animate-pulse">Loading options...</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {options.length > 0 && <DownloadOptions options={options} />}
    </main>
  );
}
