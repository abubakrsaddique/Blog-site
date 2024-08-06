import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase";

export interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
};

const fetchBlog = async (id: string): Promise<Blog | null> => {
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Blog;
  }
  return null;
};

export const useBlogData = (id?: string) => {
  return useQuery<Blog[] | Blog | null, Error>({
    queryKey: id ? ["blog", id] : ["blogs"],
    queryFn: id ? () => fetchBlog(id) : fetchBlogs,
    enabled: id ? !!id : true,
  });
};
