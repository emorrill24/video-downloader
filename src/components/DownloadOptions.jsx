"use client";

export default function DownloadOptions({ options = [] }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="mt-6 w-full max-w-xl mx-auto">
      {/* Grid of download links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option, idx) => (
          <a
            key={idx}
            href={option.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-medium py-3 rounded-lg shadow hover:bg-green-700 transition text-center"
          >
            {option.label}
          </a>
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
