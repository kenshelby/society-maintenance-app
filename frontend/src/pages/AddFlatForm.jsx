import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./AddFlatForm.css";

export default function AddFlatForm({ onClose, onFlatAdded }) {
  const [block, setBlock] = useState("A");
  const [floor, setFloor] = useState("G");
  const [unit, setUnit] = useState(1);
  const [status, setStatus] = useState("vacant");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("consoledata", { block, floor, unit, status })
      await API.post("/flats", { block, floor, unit, status });
      alert("✅ Flat added successfully!")
      navigate('/admin-dashboard')
      //onFlatAdded();
      //onClose();
    } catch (err) {
      console.error(err);
      console.log(' this is my console ==',err.response.data);
      alert("❌ Failed to add flat");
    }
  };

  return (
    <div className="add-flat-container">
      <form onSubmit={handleSubmit} className="add-flat-form">
        <h2>Add New Flat</h2>

        <label>Block</label>
        <select value={block} onChange={(e) => setBlock(e.target.value)}>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <label>Floor</label>
        <select value={floor} onChange={(e) => setFloor(e.target.value)}>
          <option value="G">Ground (G)</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <label>Unit</label>
        <select value={unit} onChange={(e) => setUnit(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
          <option value="to-let">To-Let</option>
          <option value="for-sale">For Sale</option>
        </select>

        <button type="submit">Save Flat</button>
      </form>
    </div>
  );
}
