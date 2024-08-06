"use client";

import { useBlogData } from "@/src/app/hook/useBlogData";

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  const { blog, loading } = useBlogData(params.id);

  if (loading) {
    return (
      <div className="p-4 text-white flex justify-center items-center">
        Loading.....
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-4 text-white flex justify-center items-center">
        No such document!
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">{blog.title}</h1>
      <h2 className="text-base font-semibold mb-4 text-white">
        {blog.subtitle}
      </h2>
      <p className="text-white">{blog.content}</p>
    </div>
  );
};

export default BlogDetailPage;
