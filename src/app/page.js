"use client";
import { useState } from "react";
import InputSection from "../components/InputSection";
import DownloadOptions from "../components/DownloadOptions";

export default function Home() {
  // State for available download options
  const [options, setOptions] = useState([]);

  const handleDownload = (url) => {
    console.log("URL submitted:", url);

    // In the future, you might fetch available formats from an API here.
    // For now, we just set mock options:
    setOptions(["MP4 720p", "MP4 1080p", "Audio Only"]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-8 pb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        YouTube Video Downloader
      </h1>

      <InputSection onSubmit={handleDownload} />

      {/* Render options only if we have some */}
      {options.length > 0 && <DownloadOptions options={options} />}
    </main>
  );
}
