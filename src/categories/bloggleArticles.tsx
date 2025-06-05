import { useEffect, useState } from "react";
import PostLayout from "../components/Post";
import type { PostProps } from "../components/Post";
import { API_BASE } from "../components/api";
import { ArticlesPlaceholder } from "../components/postTools";

function Articles() {
    const [posts, setPosts] = useState([]);
    const bloggleNews = true

    useEffect(() => {
        fetch(`${API_BASE}/post`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, []);
    

    return (
        <main className="space-y-6 max-w-screen-xl mx-auto px-2 sm:px-4 py-6 min-h-[440px]">
            {posts.length == 0 ?
             <ArticlesPlaceholder bloggleNews={bloggleNews} />
            :
             posts.map((post: PostProps) => (
                <PostLayout key={post._id} {...post} />
            ))}
        </main>
    );
}

export default Articles;