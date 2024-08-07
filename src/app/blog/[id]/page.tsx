"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBlogs } from "@/src/hook/useBlogData";
import { Blog } from "@/src/hook/useBlogData";
import { EditBlogForm } from "@/src/components/EditBlogForm";
import DeleteBlog from "@/src/components/DeleteBlog";
import { useModal } from "@/src/modal/useModal";
import useDeleteBlog from "@/src/hook/useDeleteBlog";

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: blog } = useBlogs(params.id);
  const [isEditing, setIsEditing] = useState(false);
  const { isVisible, showModal, hideModal } = useModal();
  const router = useRouter();

  const onSuccessCallback = () => {
    router.push("/blog");
  };

  const deleteMutation = useDeleteBlog(params.id, onSuccessCallback);

  if (!blog) {
    return (
      <div className="p-4 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    showModal();
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate();
    hideModal();
  };

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <button
          onClick={handleUpdateClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
      {isEditing ? (
        <EditBlogForm blog={blog as Blog} setIsEditing={setIsEditing} />
      ) : (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2 text-white">
            {(blog as Blog).title}
          </h1>
          <h2 className="text-base font-semibold mb-4 text-white">
            {(blog as Blog).subtitle}
          </h2>
          <p className="text-white">{(blog as Blog).content}</p>
        </div>
      )}
      {isVisible && (
        <DeleteBlog onConfirm={handleConfirmDelete} onCancel={hideModal} />
      )}
    </div>
  );
};

export default BlogDetailPage;
