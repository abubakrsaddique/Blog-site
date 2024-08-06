"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { db } from "@/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";

interface Blog {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
}

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        subtitle,
        content,
      });

      setTitle("");
      setSubTitle("");
      setContent("");
      setShowForm(false);
      toast.success("Blog has been created");
      router.push("/blog");
    } catch (error) {
      toast.error("Error adding blog");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={toggleForm}
      >
        {showForm ? "Cancel" : "Create Blog"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Sub-Title</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={subtitle}
              onChange={(e) => setSubTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Content</label>
            <textarea
              className="w-full p-2 border rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateBlogPage;
