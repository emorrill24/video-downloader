"use client";
export default function DownloadOptions({ options = [] }) {
  if (options.length === 0) return null;

  return (
    <div className="mt-6 w-full max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => console.log(`Selected: ${option}`)}
          className="bg-green-600 text-white font-medium py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
