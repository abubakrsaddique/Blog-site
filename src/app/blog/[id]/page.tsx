"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/Firebase";
import { doc, getDoc } from "firebase/firestore";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() } as Blog);
      } else {
        console.log("No such document!");
      }
    };

    fetchBlog();
  }, [params.id]);

  if (!blog) {
    return (
      <div className="p-4 text-white flex justify-center items-center ">
        Loading.....
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">{blog.title}</h1>
      <h1 className="text-base font-semibold mb-4 text-white">
        {blog.subtitle}
      </h1>
      <p className="text-white">{blog.content}</p>
    </div>
  );
};

export default BlogDetailPage;
