import React from "react";

const DeleteBlog = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
      <p className="mb-4">Are you sure you want to delete this blog?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteBlog;
