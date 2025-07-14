"use client";

export default function AlertsHeader({ isOpen }) {
  return (
    <div
      className={`rounded-md p-4 text-center mb-4 ${
        isOpen
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {isOpen
        ? "We’re open and accepting orders!"
        : "Sorry, we’re currently closed."}
    </div>
  );
}
