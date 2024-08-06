"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { db } from "../../../Firebase";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

export const useBlogData = (blogId?: string) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(blogsData);
      setLoading(false);
    };

    const fetchBlog = async (id: string) => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() } as Blog);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    setLoading(true);

    if (blogId) {
      fetchBlog(blogId);
    } else {
      fetchBlogs();
    }
  }, [blogId]);

  return { blogs, blog, loading };
};
