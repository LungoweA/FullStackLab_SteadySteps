import { useState } from "react";

function DailyLogForm({ onRefresh, selectedUser }) {
  const [form, setForm] = useState({
    steps: "",
    stairs: "",
    weight: "",
    mood: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) {
    alert("Please select a user first");
    return;
    }
    fetch("http://localhost:5000/api/dailylogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...form, userId: selectedUser})
    }).then(() => {
      setForm({ steps: "", stairs: "", weight: "", mood: "" });
      onRefresh();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="steps" placeholder="Steps" onChange={handleChange} value={form.steps} />
      <input name="stairs" placeholder="Stairs" onChange={handleChange} value={form.stairs} />
      <input name="weight" placeholder="Weight" onChange={handleChange} value={form.weight} />
      <input name="mood" placeholder="Mood" onChange={handleChange} value={form.mood} />

      <button type="submit">Add Log</button>
    </form>
  );
}

export default DailyLogForm;