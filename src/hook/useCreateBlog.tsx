import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { db } from "@/Firebase";
import { collection, addDoc } from "firebase/firestore";

interface Blog {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
}

export const useCreateBlog = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const mutation = useMutation<void, Error, Blog>({
    mutationFn: async (newBlog: Blog) => {
      await addDoc(collection(db, "blogs"), newBlog);
    },
    onSuccess: () => {
      setTitle("");
      setSubTitle("");
      setContent("");
      setShowForm(false);
      toast.success("Blog has been created");
      router.push("/blog");
    },
    onError: () => {
      toast.error("Error adding blog");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, subtitle, content });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return {
    title,
    subtitle,
    content,
    showForm,
    setTitle,
    setSubTitle,
    setContent,
    handleSubmit,
    toggleForm,
    mutation,
  };
};
