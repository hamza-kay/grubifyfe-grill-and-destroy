"use client";

export default function Header({ title }) {
  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>{title}</h1>
    </header>
  );
}
