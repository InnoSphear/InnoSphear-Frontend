import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";
import {
  DndContext,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const columns = [
  { id: "pending", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-2xl border border-white/10 bg-white/5 p-3"
    >
      <p className="text-sm font-semibold text-white">{task.title}</p>
      <p className="mt-1 text-xs text-slate-400">
        {task.project?.name || "Unassigned"}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-rose-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Column = ({ columnId, label, tasks, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className="space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <SortableContext items={tasks.map((task) => task._id)}>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const AdminTasks = () => {
  const { push } = useToast();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", project: "", status: "pending" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", project: "", status: "pending" });

  const grouped = useMemo(() => {
    const map = { pending: [], in_progress: [], completed: [] };
    tasks.forEach((task) => {
      map[task.status || "pending"].push(task);
    });
    return map;
  }, [tasks]);

  const load = async () => {
    const [tasksRes, projectsRes] = await Promise.all([
      api.get("/tasks"),
      api.get("/projects?limit=100"),
    ]);
    setTasks(tasksRes.data.data.items || []);
    setProjects(projectsRes.data.data.items || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/tasks", form);
    push("Task created");
    setForm({ title: "", project: "", status: "pending" });
    load();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditForm({
      title: task.title || "",
      project: task.project?._id || "",
      status: task.status || "pending",
    });
  };

  const saveEdit = async () => {
    await api.put(`/tasks/${editingId}`, editForm);
    push("Task updated");
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    push("Task deleted");
    load();
  };

  const onDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    if (!activeTask) return;

    let nextStatus = over.id;
    const overTask = tasks.find((task) => task._id === over.id);
    if (overTask) {
      nextStatus = overTask.status;
    }

    if (nextStatus && activeTask.status !== nextStatus) {
      await api.put(`/tasks/${activeTask._id}`, { status: nextStatus });
      push("Task status updated");
      load();
      return;
    }

    const items = [...tasks];
    const oldIndex = items.findIndex((task) => task._id === active.id);
    const newIndex = items.findIndex((task) => task._id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setTasks(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Task Tracker</h2>
        <p className="mt-2 text-sm text-slate-300">
          Kanban-style workflow with priorities and activity logs.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Create task</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <select
            name="project"
            value={form.project}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          >
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="md:col-span-3">
            <Button>Create Task</Button>
          </div>
        </form>
      </Card>

      {editingId && (
        <Card>
          <h3 className="font-display text-xl text-white">Edit task</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <input
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
            />
            <select
              name="project"
              value={editForm.project}
              onChange={handleEditChange}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="md:col-span-3 flex gap-2">
              <Button variant="dark" className="px-4" onClick={saveEdit}>
                Save
              </Button>
              <button
                onClick={() => setEditingId(null)}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((col) => (
            <Card key={col.id}>
              <Column
                columnId={col.id}
                label={col.label}
                tasks={grouped[col.id]}
                onEdit={startEdit}
                onDelete={remove}
              />
            </Card>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default AdminTasks;






