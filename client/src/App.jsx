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
  const [avgSteps, setAvgSteps] = useState(null);

  // ---------- FETCH USERS ----------
  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setMessage("Failed to load users"));
  };

  // ---------- FETCH LOGS ----------
  const fetchLogs = () => {
    setLoading(true);

    fetch("http://localhost:5000/api/dailylogs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data || []);
        setMessage("");
      })
      .catch(() => setMessage("Failed to load logs"))
      .finally(() => setLoading(false));
  };

  // ---------- FETCH GOALS ----------
  const fetchGoals = () => {
    fetch("http://localhost:5000/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data || []))
      .catch(() => setMessage("Failed to load goals"));
  };

  // ---------- INIT + AUTO REFRESH ----------
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

  // ---------- SAFE FILTERED LOGS ----------
  const filteredLogs = Array.isArray(logs)
    ? logs.filter((log) => log?.userId?._id === selectedUser)
    : [];

  // ---------- SAFE GOAL ----------
  const userGoal = Array.isArray(goals)
    ? goals.find((goal) => goal?.userId?._id === selectedUser)
    : null;

  // ---------- AVERAGE STEPS ----------
  const fetchAvgSteps = (userId) => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/dailylogs/stats/average-steps/${userId}`)
      .then((res) => res.json())
      .then((data) => setAvgSteps(data?.averageSteps ?? null))
      .catch(() => setAvgSteps(null));
  };

  return (
    <div className="container">

      <h1>SteadySteps</h1>

      {/* MESSAGE + LOADING */}
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      {/* USER SELECT */}
      <p>Select username to get started</p>
      <select
        value={selectedUser}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedUser(id);
          fetchAvgSteps(id);
        }}
      >
        <option value="">-- Select a user --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* GOAL */}
      <h3>Goal</h3>

      {!selectedUser ? (
        <p>Please select a user</p>
      ) : userGoal ? (
        <div className="card">
          <p>Step goal: {userGoal.dailyStepGoal}</p>
          <p>Target weight: {userGoal.targetWeight}</p>

        </div>
      ) : (
        <p>No goal set for this user</p>
      )}

      {/* STATS */}
      <h3>Statistics</h3>

      {!selectedUser ? (
        <p>Please select a user</p>
      ) : avgSteps === null ? (
        <p>Loading statistics...</p>
      ) : (
        <p>Average Steps: {avgSteps}</p>
      )}

      {/* FORM */}
      <DailyLogForm
        onRefresh={fetchLogs}
        selectedUser={selectedUser}
      />

      {/* TABLE */}
      <DailyLogList
        logs={filteredLogs}
        onRefresh={fetchLogs}
      />

    </div>
  );
}

export default App;