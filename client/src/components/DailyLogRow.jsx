function DailyLogRow({ log, onRefresh }) {
  const handleDelete = () => {
    if (!confirm("Delete this log?")) return;

    fetch(`http://localhost:5000/api/dailylogs/${log._id}`, {
      method: "DELETE"
    }).then(() => onRefresh());
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