import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, onSnapshot, doc, DocumentData } from "firebase/firestore";
import { db } from "../../../Firebase";

export interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const useBlogs = () => {
  const queryClient = useQueryClient();

  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: () =>
      new Promise<Blog[]>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collection(db, "blogs"),
          (querySnapshot) => {
            const blogs = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Blog[];
            resolve(blogs);

            queryClient.setQueryData(["blogs"], blogs);
          },
          (error) => reject(error)
        );

        return () => unsubscribe();
      }),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

const useBlog = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Blog | null, Error>({
    queryKey: ["blog", id],
    queryFn: () =>
      new Promise<Blog | null>((resolve, reject) => {
        const docRef = doc(db, "blogs", id);
        const unsubscribe = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const blog = { id: docSnap.id, ...docSnap.data() } as Blog;
              resolve(blog);
              queryClient.setQueryData(["blog", id], blog);
            } else {
              resolve(null);
            }
          },
          (error) => reject(error)
        );

        return () => unsubscribe();
      }),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!id,
  });
};

export const useBlogData = (id?: string) => {
  return id ? useBlog(id) : useBlogs();
};
