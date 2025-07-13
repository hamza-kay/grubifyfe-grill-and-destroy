"use client";

import { useState, useEffect } from "react";

export default function ItemModal({ item, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (item?.sizes) {
      const firstSize = Object.keys(item.sizes)[0];
      setSelectedSize(firstSize);
    }
  }, [item]);

  const toggleAddon = (addonName) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : [...prev, addonName]
    );
  };

  function formatPrice(value) {
  return typeof value === "number"
    ? value.toFixed(2)
    : "N/A";
}


  const calculatePrice = () => {
    let basePrice = item.sizes?.[selectedSize] || item.price || 0;

    if (selectedVariation && item.variation?.[selectedVariation]) {
      const variationPrices = item.variation[selectedVariation].prices;
      basePrice += variationPrices?.[selectedSize] || 0;
    }

    let addonTotal = 0;
    if (item.addons) {
      selectedAddons.forEach((addon) => {
        const addonData = item.addons[addon];

        if (typeof addonData === "object" && selectedSize) {
          addonTotal += addonData[selectedSize] || 0;
        } else {
          addonTotal += addonData;
        }
      });
    }

    return (basePrice + addonTotal).toFixed(2);
  };

  if (!item) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <h2>{item.name}</h2>
        <p>{item.description}</p>

        {/* Sizes */}
        {item.sizes && (
          <div>
            <h4>Size</h4>
            {Object.keys(item.sizes).map((size) => (
              <label key={size} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                />
                {size}” - £{size}” - £{formatPrice(item.sizes?.[size])}
              </label>
            ))}
          </div>
        )}

        {/* Variations */}
        {item.variation && Object.keys(item.variation).length > 0 && (
          <div>
            <h4>Variation</h4>
            {Object.keys(item.variation).map((key) => (
              <label key={key} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="variation"
                  value={key}
                  checked={selectedVariation === key}
                  onChange={() => setSelectedVariation(key)}
                />
                {item.variation[key].name}
                {selectedSize &&
                  item.variation[key].prices[selectedSize] > 0 &&
                  ` (+£${formatPrice(item.variation[key].prices?.[selectedSize])}`}
              </label>
            ))}
          </div>
        )}

        {/* Addons */}
        {item.addons && Object.keys(item.addons).length > 0 && (
          <div>
            <h4>Addons</h4>
            {Object.keys(item.addons).map((addonName) => {
              const addonData = item.addons[addonName];
              let price;
              if (typeof addonData === "object" && selectedSize) {
                price = addonData[selectedSize] || 0;
              } else {
                price = addonData;
              }

              return (
                <label key={addonName} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addonName)}
                    onChange={() => toggleAddon(addonName)}
                  />
                  {addonName} (+£{formatPrice(price)})
                </label>
              );
            })}
          </div>
        )}

        <h3>Total Price: £{calculatePrice()}</h3>

        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "dodgerblue",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
