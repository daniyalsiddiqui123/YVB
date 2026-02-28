"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StudioPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [studioUrl, setStudioUrl] = useState("http://localhost:3333");

  useEffect(() => {
    // Check if Sanity Studio is running
    const checkStudio = async () => {
      try {
        const response = await fetch(studioUrl, { method: 'HEAD', mode: 'no-cors' });
        setIsLoading(false);
      } catch (error) {
        console.log("Studio not reachable at localhost:3333");
        setIsLoading(false);
      }
    };
    
    checkStudio();
  }, [studioUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-white to-cherry/5">
      {/* Header */}
      <div className="glass-header">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient-navy">
              Sanity Studio
            </h1>
            <a
              href="http://localhost:3333"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy text-sm px-4 py-2"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-80px)] w-full">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy mb-4"
            />
            <p className="text-gray-600">Loading Sanity Studio...</p>
          </div>
        ) : (
          <iframe
            src={studioUrl}
            className="w-full h-full border-0"
            title="Sanity Studio"
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>

      {/* Info Banner */}
      <div className="fixed bottom-4 right-4 max-w-sm glass-card p-4 rounded-2xl shadow-2xl">
        <h3 className="font-semibold text-gray-900 mb-2">Sanity Studio</h3>
        <p className="text-sm text-gray-600 mb-3">
          Manage your products, categories, and content.
        </p>
        <div className="flex gap-2">
          <a
            href="http://localhost:3333"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy text-xs px-3 py-1.5"
          >
            Open Full Studio
          </a>
          <button
            onClick={() => window.location.reload()}
            className="btn-glass-navy text-xs px-3 py-1.5"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
