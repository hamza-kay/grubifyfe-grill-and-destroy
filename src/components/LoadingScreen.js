"use client";

import { Loader } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-red-600" />
        <p className="text-sm font-medium text-gray-600"></p>
      </div>
    </div>
  );
}
