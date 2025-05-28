import { useEffect, useState } from "react";
import type { PostProps } from "../Post";
import PostLayout from "../Post";

function OfficialArticles() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const addTestPost = () => {
    const newPost: PostProps = {
      _id: 1,
      cover: "/uploads/example.jpg",
      title: "Test Blog Post",
      likes: 0,
      likedBy: [],
      summary: "This is a test post summary.",
      content: "This is some dummy content for the test post.",
      createdAt: Date.now(),
      author: {
        _id: "author123",
        username: "tester",
      },
      tags: ["test", "demo"]
    };

    setPosts(prevPosts => [...prevPosts, newPost]);
  };

  useEffect(()=>{
    addTestPost()
  }, [])

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto px-4 py-6 min-h-[440px]">

      <ul>
            {posts.map((post: PostProps) => (
            <PostLayout key={post._id} {...post} />
            ))}
      </ul>
    </div>
  );
}

export default OfficialArticles
