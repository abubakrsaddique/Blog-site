"use client";

import { useBlogData } from "@/src/app/hook/useBlogData";
import { Blog } from "@/src/app/hook/useBlogData";

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: blog } = useBlogData(params.id);

  if (!blog) {
    return (
      <div className="p-4 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2 text-white">
          {(blog as Blog).title}
        </h1>
        <h2 className="text-base font-semibold mb-4 text-white">
          {(blog as Blog).subtitle}
        </h2>
        <p className="text-white">{(blog as Blog).content}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
