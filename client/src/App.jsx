import { useState, useEffect } from "react";
import "./App.css";
import DailyLogList from "./components/DailyLogList";
import DailyLogForm from "./components/DailyLogForm";

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
      fetchLogs();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>SteadySteps</h1>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      <DailyLogForm onRefresh={fetchLogs} />
      <DailyLogList logs={logs} onRefresh={fetchLogs} />
    </div>
  );
}

export default App;