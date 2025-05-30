import { useEffect, useState } from "react";
import type { PostProps } from "../Post";
import PostLayout from "../Post";
import { API_NEWS } from "../components/api";

interface NewsApiArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

function OfficialArticles() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=22&apiKey=${API_NEWS}`
        );
        const data = await res.json();

        if (!data.articles) return;

        const formattedPosts: PostProps[] = data.articles.map(
          (article: NewsApiArticle, index: number): PostProps => ({
            _id: index + 1,
            cover: article.urlToImage || "/uploads/example.jpg",
            title: article.title,
            likes: 0,
            likedBy: [],
            postUrl: article.url,
            summary: article.description || "No summary available.",
            content: article.content || article.description || "No content available.",
            createdAt: new Date(article.publishedAt).getTime(),
            author: {
              _id: article.source.id ?? "newsapi",
              username: article.source.name ?? "Unknown Source",
            },
            tags: ["news", "official", "trusted"],
          })
        );

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto px-2 sm:px-4 py-6 min-h-[440px]">
      <ul>
        {posts.map((post: PostProps) => (
          <PostLayout key={post._id} {...post} />
        ))}
      </ul>
    </div>
  );
}

export default OfficialArticles;
