'use client'
import BaseComponent from "@/components/base/BaseComponent";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetch data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
          {/* Simple spinner for loading */}
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <BaseComponent />
      )}
    </div>
  );
}
