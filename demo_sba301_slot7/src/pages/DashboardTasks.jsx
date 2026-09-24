/**
 * DashboardTasks.jsx
 *
 * Child route rendered inside Dashboard's <Outlet> at "/dashboard/tasks".
 */
import { useState } from "react";

const initialTasks = [
  { id: 1, label: "Water Phalaenopsis orchids", done: false },
  { id: 2, label: "Repot Cattleya in fresh bark", done: true },
  { id: 3, label: "Check humidity levels in greenhouse", done: false },
  { id: 4, label: "Fertilize Dendrobiums (half-strength)", done: false },
  { id: 5, label: "Order new Vanda mounts", done: true },
];

function DashboardTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="child-route">
      <div className="child-route-header">
        <h2>✅ Tasks</h2>
        <p>
          Rendered by <code>&lt;DashboardTasks&gt;</code> inside{" "}
          <code>&lt;Outlet&gt;</code> at <code>/dashboard/tasks</code>
        </p>
        <p className="task-progress">
          {completed}/{tasks.length} completed
        </p>
      </div>

      <ul className="task-list" aria-label="Task list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggle(task.id)}
                id={`task-${task.id}`}
              />
              <span className="task-text">{task.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardTasks;
