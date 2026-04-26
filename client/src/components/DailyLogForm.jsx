import { useState } from "react";

function DailyLogForm({ onRefresh, selectedUser }) {
  const [form, setForm] = useState({
    steps: "",
    stairs: "",
    weight: "",
    mood: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select a user first");
      return;
    }

    if (!form.steps || !form.stairs || !form.weight || !form.mood) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/dailylogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          steps: Number(form.steps),
          stairs: Number(form.stairs),
          weight: Number(form.weight),
          userId: selectedUser
        })
      });

      if (!res.ok) {
        throw new Error("Failed to create log");
      }

      // reset form
      setForm({
        steps: "",
        stairs: "",
        weight: "",
        mood: ""
      });

      onRefresh();

    } catch (err) {
      console.error(err);
      alert("Error creating log");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="steps"
        placeholder="Steps"
        value={form.steps}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stairs"
        placeholder="Stairs"
        value={form.stairs}
        onChange={handleChange}
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={form.weight}
        onChange={handleChange}
      />
      <input
        name="mood"
        placeholder="Mood"
        value={form.mood}
        onChange={handleChange}
      />

      <button type="submit">Add Log</button>
    </form>
  );
}

export default DailyLogForm;