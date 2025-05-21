import { useEffect, useState } from "react";
import PostLayout from "./Post";
import type { PostProps } from "./Post";

function Articles() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, []);

    return (
        <main className="space-y-6 max-w-screen-xl mx-auto px-4 py-6">
            {posts.length == 0 ?  
            <div className="text-gray-500 flex-col text-center justify-center mt-20">
            <h1 className="text-4xl">˙◠˙</h1>
            <p className="text-lg">No interesting blogs or news found</p>
          </div>
           : posts.map((post: PostProps) => (
                <PostLayout key={post._id} {...post} />
            ))}
        </main>
    );
}

export default Articles;