"use client";

import { useState } from "react";

interface ResultItem {
  Variable: string;
  Value: string;
}

export default function VinDecoder() {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<ResultItem[] | null>(null);

  const decode = async () => {
    const res = await fetch(`/api/vin?vin=${vin}`);
    const json = await res.json();

    setResult(json.Results);
  };

  return (
    <div>
      <h1>VIN Decoder</h1>

      <input
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Wpisz VIN"
      />

      <button onClick={decode}>Decode</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Wynik:</h2>

          <p><strong>Marka:</strong> {result.find(x => x.Variable === "Make")?.Value}</p>
          <p><strong>Model:</strong> {result.find(x => x.Variable === "Model")?.Value}</p>
          <p><strong>Rok:</strong> {result.find(x => x.Variable === "Model Year")?.Value}</p>
          <p><strong>Pojemność:</strong> {result.find(x => x.Variable === "Displacement (L)")?.Value} L</p>
          <p><strong>Cylindry:</strong> {result.find(x => x.Variable === "Engine Number of Cylinders")?.Value}</p>
          <p><strong>Producent:</strong> {result.find(x => x.Variable === "Manufacturer Name")?.Value}</p>
          <p><strong>Fabryka:</strong> {result.find(x => x.Variable === "Plant City")?.Value}</p>
        </div>
      )}
    </div>
  );
}
