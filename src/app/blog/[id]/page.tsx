import BlogDetailPageActions from "@/src/components/BlogDetailPageActions";

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  return <BlogDetailPageActions id={params.id} />;
};

export default BlogDetailPage;
