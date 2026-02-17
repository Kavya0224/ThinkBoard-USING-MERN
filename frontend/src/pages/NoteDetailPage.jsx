import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to fetch note ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("🗑 Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title and content 🚨");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("✨ Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <LoaderIcon className="animate-spin w-12 h-12 text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        {/* Top Buttons */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-400 text-red-300 hover:bg-red-500 hover:text-white transition"
          >
            <Trash2Icon className="w-5 h-5" />
            Delete
          </button>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-white mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">
            Content
          </label>
          <textarea
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition h-36 resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-lg bg-yellow-400 text-black hover:bg-yellow-300 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default NoteDetailPage;
