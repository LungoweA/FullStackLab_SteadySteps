import { useState, useEffect } from "react";
import "./App.css";
import DailyLogList from "./components/DailyLogList";
import DailyLogForm from "./components/DailyLogForm";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = () => {
  fetch("http://localhost:5000/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch(() => setMessage("Failed to load users"));
};
  
  const fetchLogs = () => {
    setLoading(true);

    fetch("http://localhost:5000/api/dailylogs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Failed to load logs");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();

    const interval = setInterval(() => {
      fetchUsers();
      fetchLogs();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>SteadySteps</h1>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      <h3>Select User</h3>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Select a user --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <DailyLogForm onRefresh={fetchLogs} />
      <DailyLogList logs={logs} onRefresh={fetchLogs} />
    </div>
  );
}

export default App;