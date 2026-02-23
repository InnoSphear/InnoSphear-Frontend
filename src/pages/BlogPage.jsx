import React from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import MotionReveal from "../components/MotionReveal";
import useBlogs from "../api/useBlogs";

const BlogPage = () => {
  const { blogs } = useBlogs({ status: "published", limit: 50 });

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Blog"
          title="Thought leadership from our architects and strategists."
          description="Product insights, engineering trends, and growth systems for global teams."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((post) => (
            <MotionReveal key={post._id}>
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {post.status}
                </p>
                <h3 className="mt-4 font-display text-lg text-white">
                  {post.title}
                </h3>
                <p className="mt-4 text-xs text-slate-400">
                  {new Date(post.createdAt).toDateString()}
                </p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;




