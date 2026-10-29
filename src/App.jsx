
import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React basics", completed: false },
    { id: 2, title: "Design the To-Do page", completed: true },
    { id: 3, title: "Plan the REST APIs", completed: false },
  ]);

  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      },
    ]);

    setTitle("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const remaining = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <main className="app">
      <header className="header">
        <div className="logo">TaskFlow</div>
        <span className="tagline">Plan your day better</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Make today count.</h1>
        <p>Organize your tasks, one step at a time.</p>
      </section>

      <section className="task-card">
        <div className="card-heading">
          <div>
            <h2>My Tasks</h2>
            <p>{remaining} tasks left to complete</p>
          </div>
          <span className="task-count">{tasks.length}</span>
        </div>

        <form className="add-form" onSubmit={addTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            aria-label="New task"
          />
          <button type="submit">+ Add Task</button>
        </form>

        <nav className="filters" aria-label="Filter tasks">
          {["all", "active", "completed"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "selected" : ""}
              onClick={() => setFilter(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">
              No tasks here. Add a task to get started!
            </p>
          ) : (
            filteredTasks.map((task) => (
              <article className="task-row" key={task.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "done" : ""}>
                    {task.title}
                  </span>
                </label>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>

        <footer className="card-footer">
          <span>{tasks.length} total tasks</span>
          <span>{tasks.length - remaining} completed</span>
        </footer>
      </section>

      <footer className="page-footer">
        Built with React · TaskFlow
      </footer>
    </main>
  );
}

export default App;
