import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Tailwind is working!
      </h1>
      <p className="text-lg text-gray-700">
        Edit <code className="bg-gray-200 px-1 py-0.5 rounded">src/app/page.js</code> and save to test hot reloading.
      </p>
    </main>
  );
}
