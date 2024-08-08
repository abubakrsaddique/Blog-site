"use client";

import Link from "next/link";

import { useBlogs } from "@/src/hook/useBlogData";
import { BlogProps } from "@/src/hook/useBlogData";

const BlogPageActions = () => {
  const { data: blogs, isLoading, isError } = useBlogs();
  if (isLoading) {
    return (
      <div className="p-4 text-white flex justify-center items-center">
        Loading.....
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 flex justify-center items-center">
        An error occurred!
      </div>
    );
  }

  return (
    <div className="p-4">
      <Link href="/blog/create">
        <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
          Create Blog
        </button>
      </Link>
      <div className="flex flex-row flex-wrap gap-6 w-full">
        {(blogs as BlogProps[]).map((blog) => (
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

export default BlogPageActions;
