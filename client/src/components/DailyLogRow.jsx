import { useState } from "react";

function DailyLogRow({ log, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    steps: log.steps,
    stairs: log.stairs,
    weight: log.weight,
    mood: log.mood
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this log?")) return;

    await fetch(`http://localhost:5000/api/dailylogs/${log._id}`, {
      method: "DELETE"
    });

    onRefresh();
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/dailylogs/${log._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setIsEditing(false);
    onRefresh();
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td><input name="steps" value={form.steps} onChange={handleChange} /></td>
          <td><input name="stairs" value={form.stairs} onChange={handleChange} /></td>
          <td><input name="weight" value={form.weight} onChange={handleChange} /></td>
          <td><input name="mood" value={form.mood} onChange={handleChange} /></td>

          <td>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{log.steps}</td>
          <td>{log.stairs}</td>
          <td>{log.weight}</td>
          <td>{log.mood}</td>

          <td>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
}

export default DailyLogRow;