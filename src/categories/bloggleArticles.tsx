import React,{ useEffect, useState } from "react"
import PostLayout from "../components/Post"
import type { PostProps } from "../components/Post"
import { API_BASE } from "../components/api"
import {
  ArticlesPlaceholder,
  ScrollToTopArrow,
  ContentPages,
} from "../components/postTools"

function Articles() {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [moreThan3posts, setMoreThan3posts] = useState(false)
   const [moreThan15posts, setMoreThan15posts] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 15
  const maxPosts = 45

  const bloggleNews = true

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  useEffect(() => {
    fetch(`${API_BASE}/post`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, maxPosts))
      })
      .catch((err) => console.error("Error fetching posts:", err))
  }, [])

  useEffect(() => {
    setMoreThan3posts(posts.length >= 3)
    setMoreThan15posts(posts.length >= 15)

  }, [posts.length])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  return (
    <main className="relative space-y-6 max-w-screen-xl mx-auto px-2 sm:px-4 pt-6 pb-2 min-h-[440px]">
      {posts.length === 0 ? (
        <ArticlesPlaceholder bloggleNews={bloggleNews} />
      ) : (
        paginatedPosts.map((post: PostProps) => (
          <PostLayout key={post._id} {...post} />
        ))
      )}

      <ScrollToTopArrow moreThan3posts={moreThan3posts} />
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

export default React.memo(Articles)
