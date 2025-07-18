// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "YouTube Video Downloader",
  description: "Download YouTube videos for personal use only.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        {/* Main content area */}
        <div className="flex-grow">{children}</div>

        {/* Footer disclaimer */}
        <footer className="fixed bottom-0 left-0 w-full bg-gray-100 text-gray-600 text-sm text-center py-2 border-t border-gray-300 z-50">
  Downloads are for personal use only. Respect copyright and platform terms of service.
</footer>
      </body>
    </html>
  );
}
