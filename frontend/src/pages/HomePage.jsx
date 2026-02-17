import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes", error);

        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes ❌");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      <Navbar></Navbar>

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-6 mt-6">
        
        {/* Glass container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">

          {loading && (
            <div className="text-center text-white text-lg py-10 animate-pulse">
              🚀 Loading notes...
            </div>
          )}

          {!loading && notes.length === 0 && !isRateLimited && (
            <NotesNotFound />
          )}

          {!loading && notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  setNotes={setNotes}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
