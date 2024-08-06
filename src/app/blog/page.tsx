"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { db } from "@/Firebase";
import { collection, getDocs } from "firebase/firestore";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      <Link href="/blog/create">
        <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
          Create Blog
        </button>
      </Link>
      <div className="flex flex-row flex-wrap gap-6 w-full">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`} className="py-3">
            <div className="p-4 border text-white rounded shadow hover:bg-gray-100 hover:text-black">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <h2 className="text-base font-semibold">{blog.subtitle}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
