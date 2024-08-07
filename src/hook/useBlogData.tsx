import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { collection, onSnapshot, doc, DocumentData } from "firebase/firestore";
import { db } from "../../Firebase";

export interface BlogProps {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

export const useBlogs = (
  id?: string
): UseQueryResult<BlogProps[] | BlogProps, Error> => {
  const queryClient = useQueryClient();

  return useQuery<BlogProps[] | BlogProps, Error>({
    queryKey: id ? ["blog", id] : ["blogs"],
    queryFn: () =>
      new Promise<BlogProps[] | BlogProps>((resolve, reject) => {
        const collectionRef = collection(db, "blogs");

        // Use for Fetch Blog Details

        if (id) {
          const unsubscribe = onSnapshot(
            doc(collectionRef, id),
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const blog = {
                  id: docSnapshot.id,
                  ...docSnapshot.data(),
                } as BlogProps;
                resolve(blog);
                queryClient.setQueryData(["blog", id], blog);
              } else {
                reject(new Error("Blog not found"));
              }
            },
            (error) => reject(error)
          );

          return () => unsubscribe();
        } else {
          // Use For Fetch all Blogs at Blog Page
          const unsubscribe = onSnapshot(
            collectionRef,
            (querySnapshot) => {
              const blogs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as BlogProps[];
              resolve(blogs);
              queryClient.setQueryData(["blogs"], blogs);
            },
            (error) => reject(error)
          );

          return () => unsubscribe();
        }
      }),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
