import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminBlog = () => {
  const { push } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "draft",
    excerpt: "",
    content: "",
    coverImage: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    status: "draft",
    excerpt: "",
    content: "",
    coverImage: "",
  });

  const load = async () => {
    const res = await api.get("/blogs");
    setBlogs(res.data.data.items || []);
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

  const uploadImage = async (file) => {
    const body = new FormData();
    body.append("image", file);
    const res = await api.post("/uploads/image", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data.url;
  };

  const handleCoverUpload = async (event, isEdit = false) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (isEdit) {
      setEditForm((prev) => ({ ...prev, coverImage: url }));
    } else {
      setForm((prev) => ({ ...prev, coverImage: url }));
    }
    push("Cover image uploaded");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/blogs", form);
    push("Blog created");
    setForm({ title: "", slug: "", status: "draft", excerpt: "", content: "", coverImage: "" });
    load();
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setEditForm({
      title: blog.title || "",
      slug: blog.slug || "",
      status: blog.status || "draft",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      coverImage: blog.coverImage || "",
    });
  };

  const saveEdit = async () => {
    await api.put(`/blogs/${editingId}`, editForm);
    push("Blog updated");
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/blogs/${id}`);
    push("Blog deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Blog CMS</h2>
        <p className="mt-2 text-sm text-slate-300">
          Draft, publish, and manage SEO metadata for posts.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Create blog post</h3>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              required
            />
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Slug"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short excerpt"
            rows={3}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Blog content"
            rows={8}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <div className="flex flex-wrap items-center gap-4">
            <input type="file" accept="image/*" onChange={(event) => handleCoverUpload(event)} />
            {form.coverImage && (
              <span className="text-xs text-emerald-200">Cover ready</span>
            )}
          </div>
          <Button>Create Post</Button>
        </form>
      </Card>

      {editingId && (
        <Card>
          <h3 className="font-display text-xl text-white">Edit blog post</h3>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              />
              <input
                name="slug"
                value={editForm.slug}
                onChange={handleEditChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              />
              <select
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <textarea
              name="excerpt"
              value={editForm.excerpt}
              onChange={handleEditChange}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            />
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              rows={8}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            />
            <div className="flex flex-wrap items-center gap-4">
              <input type="file" accept="image/*" onChange={(event) => handleCoverUpload(event, true)} />
              {editForm.coverImage && (
                <span className="text-xs text-emerald-200">Cover ready</span>
              )}
            </div>
            <div className="flex gap-2">
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

      <div className="grid gap-4 md:grid-cols-2">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <p className="text-sm font-semibold text-white">{blog.title}</p>
            <p className="mt-2 text-xs text-slate-400">{blog.slug}</p>
            <p className="text-xs text-slate-400">Status: {blog.status}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="dark" className="px-4" onClick={() => startEdit(blog)}>
                Edit
              </Button>
              <button
                onClick={() => remove(blog._id)}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-200"
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;






