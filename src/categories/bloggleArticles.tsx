import { useEffect, useState } from "react"
import PostLayout from "../components/Post"
import type { PostProps } from "../components/Post"
import { API_BASE } from "../components/api"
import { ArticlesPlaceholder, ScrollToTopArrow, ContentPages } from "../components/postTools"

function Articles() {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [moreThan3posts, setMoreThan3posts] = useState(false)
  const bloggleNews = true
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 1
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  useEffect(() => {
    fetch(`${API_BASE}/post`)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
      .catch(err => console.error("Error fetching posts:", err))
  }, [])

  useEffect(() => {
    setMoreThan3posts(posts.length >= 3)
  }, [posts.length])

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
      />
    </main>
  )
}

export default Articles
