"use client";

export default function DownloadOptions({ options = [], url }) {
  if (options.length === 0) return null;

  const handleDownload = async (format) => {
    try {
      console.log("Starting download for:", format);

      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          quality: format.includes("Audio") ? "audio" : "video",
        }),
      });

      if (!res.ok) {
        console.error("Download error:", await res.text());
        alert("Failed to start download");
        return;
      }

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = format.includes("Audio") ? "audio.mp3" : "video.mp4";
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("Download triggered successfully!");
    } catch (err) {
      console.error("Download handler error:", err);
      alert("Unexpected error occurred");
    }
  };

  return (
    <div className="mt-6 w-full max-w-xl mx-auto">
      {/* Download buttons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleDownload(option)}
            className="bg-green-600 text-white font-medium py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            {option}
          </button>
        ))}
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-6 p-4 rounded-lg bg-gray-100 text-gray-600 text-sm leading-relaxed">
        ⚠️ <span className="font-semibold">For personal use only.</span> This tool
        does not store any content and complies with YouTube’s Terms of Service.
      </div>
    </div>
  );
}
