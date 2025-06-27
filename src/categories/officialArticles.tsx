import React,{ useEffect, useState } from "react"
import type { PostProps } from "../components/Post"
import PostLayout from "../components/Post"
import { API_BASE } from "../components/api"
import {
  ArticlesPlaceholder,
  ScrollToTopArrow,
  ContentPages,
} from "../components/postTools"

function OfficialArticles() {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [moreThan15posts, setMoreThan15posts] = useState(false)
  const bloggleNews = false

  const postsPerPage = 15
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

    useEffect(() => {
    setMoreThan15posts(posts.length >= 15)
    }, [posts.length])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/news`)
        const data = await res.json()

        if (!data.response?.results || data.response.results.length === 0) {
          setPosts([])
          return
        }

        const formattedPosts: PostProps[] = data.response.results
          .map((article: any, index: number): PostProps => ({
            _id: index + 1,
            cover:
              article.fields?.thumbnail ||
              "https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/others/imageNotFound.jpeg",
            title: article.webTitle,
            likes: 0,
            likedBy: [],
            postUrl: article.webUrl,
            summary: article.fields?.trailText || "No summary available.",
            content: article.fields?.bodyText || "No content available.",
            createdAt: new Date(article.webPublicationDate).getTime(),
            author: {
              _id: article.fields?.byline || "guardian",
              username: article.fields?.byline || "The Guardian",
            },
            tags: ["news", "official", "guardian"],
          }))

        setPosts(formattedPosts)
      } catch (error) {
        console.error("Error fetching Guardian news:", error)
      }
    }

    fetchNews()
  }, [])

  return (
    <main className="space-y-6 max-w-screen-xl mx-auto px-2 sm:px-4 pt-6 pb-2 min-h-[440px]">
      {posts.length === 0 ? (
        <ArticlesPlaceholder bloggleNews={bloggleNews} />
      ) : (
        paginatedPosts.map((post: PostProps) => (
          <PostLayout key={post._id} {...post} />
        ))
      )}

      <ScrollToTopArrow moreThan3posts={posts.length >= 3} />
      <ContentPages
        allPosts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
        moreThan15posts={moreThan15posts}
      />
    </main>
  )
}

export default React.memo(OfficialArticles)
