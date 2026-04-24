import DailyLogRow from "./DailyLogRow";

function DailyLogList({ logs, onRefresh }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Steps</th>
          <th>Stairs</th>
          <th>Weight</th>
          <th>Mood</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => (
          <DailyLogRow key={log._id} log={log} onRefresh={onRefresh} />
        ))}
      </tbody>
    </table>
  );
}

export default DailyLogList;