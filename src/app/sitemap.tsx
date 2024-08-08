import { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

const WEBSITE_HOST_URL = process.env.SITE_URL || "http://localhost:3000";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const changeFrequency: ChangeFrequency = "daily";

  const blogRoutes = await fetchBlogRoutes();

  const routes = ["", "/about", "/blog"].map((route) => ({
    url: `${WEBSITE_HOST_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
  }));

  return [...routes, ...blogRoutes];
}

async function fetchBlogRoutes() {
  const collectionRef = collection(db, "blogs");
  const snapshot = await getDocs(collectionRef);

  const blogRoutes = snapshot.docs.map((doc) => ({
    url: `${WEBSITE_HOST_URL}/blog/${doc.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as ChangeFrequency,
  }));

  return blogRoutes;
}
