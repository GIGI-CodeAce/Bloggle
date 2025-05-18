import { useEffect, useState } from "react";
import PostLayout from "./Post";
import type { PostProps } from "./Post";

function Articles() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPosts(data);
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, []);

    return (
        <main className="space-y-6 max-w-screen-xl mx-auto px-4 py-6">
            {posts.length > 0 && posts.map((post: PostProps) => (
                <PostLayout key={post.id} {...post} />
            ))}
        </main>
    );
}

export default Articles;