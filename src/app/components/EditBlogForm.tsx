"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { db } from "@/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Blog } from "@/src/app/hook/useBlogData";

interface EditBlogFormProps {
  blog: Blog;
  setIsEditing: (isEditing: boolean) => void;
}

export const EditBlogForm = ({ blog, setIsEditing }: EditBlogFormProps) => {
  const [title, setTitle] = useState(blog.title);
  const [subtitle, setSubTitle] = useState(blog.subtitle);
  const [content, setContent] = useState(blog.content);
  const router = useRouter();

  const mutation = useMutation<void, Error, Blog>({
    mutationFn: async (updatedBlog: Blog) => {
      const blogRef = doc(db, "blogs", updatedBlog.id!);
      await updateDoc(blogRef, {
        title: updatedBlog.title,
        subtitle: updatedBlog.subtitle,
        content: updatedBlog.content,
      });
    },
    onSuccess: () => {
      toast.success("Blog has been updated");
      setIsEditing(false);
      router.push(`/blog/${blog.id}`);
    },
    onError: () => {
      toast.error("Error updating blog");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...blog, title, subtitle, content });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-white mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Subtitle</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full px-3 py-2 text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 text-black"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};
