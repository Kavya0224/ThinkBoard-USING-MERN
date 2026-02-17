import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required 🚨");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { title, content });

      toast.success("✨ Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);

      const status = error?.response?.status;

      if (status === 429) {
        toast.error("Slow down! You're creating notes too fast 💀", {
          duration: 4000,
        });
      } else if (!status) {
        toast.error("Server not reachable ⚠️");
      } else {
        toast.error("Failed to create note ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        
        <Link
          to="/"
          className="flex items-center gap-2 text-white mb-6 hover:text-yellow-300 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>

        <h2 className="text-3xl font-bold text-white mb-6">
          ✍️ Create New Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-white mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter note title..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">
              Content
            </label>
            <textarea
              placeholder="Write your note here..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition h-32 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-lg bg-yellow-400 text-black hover:bg-yellow-300 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "🚀 Create Note"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePage;
