function DailyLogRow({ log, onRefresh }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this log?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/dailylogs/${log._id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to delete log");
      }

      onRefresh();
    } catch (err) {
      alert("Error deleting log");
      console.error(err);
    }
  };

  return (
    <tr>
      <td>{log.steps}</td>
      <td>{log.stairs}</td>
      <td>{log.weight}</td>
      <td>{log.mood}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default DailyLogRow;