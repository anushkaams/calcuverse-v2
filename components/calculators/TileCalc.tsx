"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How much extra tile should I buy?", answer: "Add 10% for straight patterns, 15% for diagonal, and 20% for complex patterns. Always buy extra from the same batch for colour consistency." },
  { question: "What size grout joint should I use?", answer: "Floor tiles typically use 3–5mm joints; wall tiles 1.5–3mm; large-format tiles may use 3–5mm. Unsanded grout is for joints under 3mm." },
  { question: "How do I estimate grout quantity?", answer: "Grout needed (kg) ≈ (tile length + tile width) / (tile length × tile width) × joint width × tile depth × 1.7 × area" },
  { question: "What should I use for adhesive?", answer: "Ceramic and porcelain tiles use standard tile adhesive. Natural stone requires special adhesive. Large format tiles need high-grip adhesive." },
];

export default function TileCalc() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [tileLength, setTileLength] = useState("30");
  const [tileWidth, setTileWidth] = useState("30");
  const [waste, setWaste] = useState("10");
  const [pricePerTile, setPricePerTile] = useState("");

  const roomArea = (parseFloat(roomLength) || 0) * (parseFloat(roomWidth) || 0);
  const tileAreaM2 = ((parseFloat(tileLength) || 0) / 100) * ((parseFloat(tileWidth) || 0) / 100);
  const withWaste = roomArea * (1 + (parseFloat(waste) || 10) / 100);
  const tilesNeeded = tileAreaM2 > 0 ? Math.ceil(withWaste / tileAreaM2) : 0;
  const cost = parseFloat(pricePerTile) > 0 ? tilesNeeded * parseFloat(pricePerTile) : 0;
  const boxes10 = Math.ceil(tilesNeeded / 10);

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="font-medium mb-3 text-sm" style={{ color: "var(--text-primary)" }}>Room Dimensions (m)</div>
        <div className="grid grid-cols-2 gap-3">
          <div><div className="field-label">Length</div><input type="number" className="field-input" value={roomLength} onChange={e => setRoomLength(e.target.value)} placeholder="4" /></div>
          <div><div className="field-label">Width</div><input type="number" className="field-input" value={roomWidth} onChange={e => setRoomWidth(e.target.value)} placeholder="3" /></div>
        </div>
      </div>

      <div>
        <div className="font-medium mb-3 text-sm" style={{ color: "var(--text-primary)" }}>Tile Size (cm)</div>
        <div className="grid grid-cols-2 gap-3">
          <div><div className="field-label">Length</div><input type="number" className="field-input" value={tileLength} onChange={e => setTileLength(e.target.value)} placeholder="30" /></div>
          <div><div className="field-label">Width</div><input type="number" className="field-input" value={tileWidth} onChange={e => setTileWidth(e.target.value)} placeholder="30" /></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Waste %</div><input type="number" className="field-input" value={waste} onChange={e => setWaste(e.target.value)} /></div>
        <div><div className="field-label">Price per Tile ($)</div><input type="number" className="field-input" value={pricePerTile} onChange={e => setPricePerTile(e.target.value)} /></div>
      </div>

      {roomArea > 0 && tilesNeeded > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Room Area</div><div className="result-value">{roomArea.toFixed(2)} m²</div></div>
          <div className="result-box" style={{ borderColor: "#8b5cf640", background: "#8b5cf612" }}>
            <div className="result-label">Tiles Needed</div>
            <div className="result-value text-3xl">{tilesNeeded.toLocaleString()}</div>
            <div className="result-sub">~{boxes10} boxes (assuming 10/box)</div>
          </div>
          {cost > 0 && <div className="result-box"><div className="result-label">Estimated Cost</div><div className="result-value">${cost.toFixed(2)}</div></div>}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
