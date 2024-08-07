import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/Firebase";
import { toast } from "sonner";

const useDeleteBlog = (blogId: string, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error>({
    mutationFn: async () => {
      const blogRef = doc(db, "blogs", blogId);
      await deleteDoc(blogRef);
    },
    onSuccess: () => {
      toast.success("Blog has been deleted");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onSuccessCallback();
    },
    onError: () => {
      toast.error("Error deleting blog");
    },
  });

  return deleteMutation;
};

export default useDeleteBlog;
