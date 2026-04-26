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
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

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

  const fetchGoals = () => {
    fetch("http://localhost:5000/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch(() => setMessage("Failed to load goals"));
  };

  useEffect(() => {
    fetchUsers();
    fetchLogs();
    fetchGoals();

    const interval = setInterval(() => {
      fetchUsers();
      fetchLogs();
      fetchGoals();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(
  (log) => log.userId && log.userId._id === selectedUser
);

  const userGoal = goals?.find(
  (goal) => goal.userId && goal.userId._id === selectedUser
);

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

      <h3>Goal</h3>

      {!selectedUser ? (
        <p>Please select a user</p>
      ) : userGoal ? (
        <div>
          <p>Step goal: {userGoal.dailyStepGoal}</p>
          <p>Target weight: {userGoal.targetWeight}</p>

          <button onClick={() => setEditingGoal(userGoal._id)}>
            Edit
          </button>
        </div>
      ) : (
        <p>No goal set for this user</p>
      )}

      <DailyLogForm onRefresh={fetchLogs} selectedUser={selectedUser}/>
      <DailyLogList logs={filteredLogs} onRefresh={fetchLogs} />
    </div>
  );
}

export default App;