"use client";

import { useCreateBlog } from "@/src/hook/useCreateBlog";

const CreateBlogPageActions = () => {
  const {
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
  } = useCreateBlog();
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
            disabled={mutation.status === "pending"}
          >
            {mutation.status === "pending" ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateBlogPageActions;
