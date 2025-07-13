"use client";

export default function Menu({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
          <strong>{item.name}</strong>
          <div>£{item.price?.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
