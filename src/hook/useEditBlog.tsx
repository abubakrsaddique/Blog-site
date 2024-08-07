import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { db } from "@/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { BlogProps } from "@/src/hook/useBlogData";

interface UseEditBlogProps {
  setIsEditing: (isEditing: boolean) => void;
}

const useEditBlog = ({ setIsEditing }: UseEditBlogProps) => {
  const router = useRouter();

  const mutation = useMutation<void, Error, BlogProps>({
    mutationFn: async (updatedBlog: BlogProps) => {
      const blogRef = doc(db, "blogs", updatedBlog.id!);
      await updateDoc(blogRef, {
        title: updatedBlog.title,
        subtitle: updatedBlog.subtitle,
        content: updatedBlog.content,
      });
    },
    onSuccess: (data, variables) => {
      toast.success("Blog has been updated");
      setIsEditing(false);
      router.push(`/blog/${variables.id}`);
    },
    onError: () => {
      toast.error("Error updating blog");
    },
  });

  return mutation;
};

export default useEditBlog;
