import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import ReactTimeAgo from "react-time-ago"
import type { PostProps } from "../components/Post"
import { UserContext } from "../userContext"
import { API_BASE } from "../components/api"
import { ScrollToTopArrow } from "../components/postTools"
import PostPageLayout from "./postPagePlaceholder"

function PostPage() {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const { userInfo } = useContext(UserContext)
  const [likes, setLikes] = useState(0)
  const [isHovering, setIsHovering] = useState('')
  const { id } = useParams()
  const [moreThan450Chars,setMoreThan450Chars] = useState(false)
  const navigate = useNavigate()

  const authorName = typeof postInfo?.author === "object"
    ? postInfo?.author.username
    : postInfo?.author;

  const tags = postInfo?.tags ?? []

  function TagsDisplay() {
    const displayTags = tags.length > 0 ? tags : ["#noHashTags"]

    return (
      <div className="flex">
        {displayTags.map((tag, index) => (
          <span
            key={index}
            className="mr-1 text-white transition-all px-1 py-1"
          >
            {tag.startsWith("#") ? tag : `#${tag}`}
          </span>
        ))}
      </div>
    );
  }

  useEffect(() => {
    fetch(`${API_BASE}/post/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data: PostProps) => {
        setPostInfo(data);
        setLikes(data.likes || 0)
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err)
      });
  }, [id])

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`${API_BASE}/delete/${postInfo?._id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (res.ok) {
        navigate("/")
      } else {
        const data = await res.json()
        alert("Failed to delete post: " + (data.error || data.message))
      }
    } catch (err) {
      alert("Error deleting post")
      console.error(err)
    }
  }

useEffect(() => {
  if (typeof postInfo?.content === 'string' && postInfo.content.length >= 550) {
    setMoreThan450Chars(true)
  } else {
    setMoreThan450Chars(false)
  }
}, [postInfo?.content])

// console.log(postInfo?.content);

function CoverImage({ src, alt }:any) {
  const [imageError, setImageError] = useState(false);

  return (
    <div>
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full mt-2 h-[400px] sm:h-[510px] rounded-xl mb-4 border"
        />
      ) : (
        <div className="w-full mt-2 h-[400px] sm:h-[510px] rounded-xl mb-4 border flex items-center justify-center bg-gray-200 text-gray-700">
          Image not available..
        </div>
      )}
    </div>
  );
}

  useEffect(() => {
    if (postInfo) {
      setLikes(postInfo.likes)
    }
  }, [postInfo, userInfo])

  async function handleLike() {
    const res = await fetch(`${API_BASE}/post/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json()
    setLikes(data.likes);
  }

  const handleHoverToggle = () => {
  };

  // console.log(postInfo?.content.length);
  
  const isOwner = userInfo &&
    (userInfo.id === postInfo?.author._id || userInfo.username === "admin")

  if (!postInfo) return <PostPageLayout/>

  return (
    <div className="px-4 pt-4 pb-1 max-w-2xl mx-auto relative overflow-hidden min-h-[300px]">
      <h1 className="text-xl md:text-3xl sm:text-2xl font-bold mb-2 text-center bg-gray-100 mx-auto p-1 rounded-b-3xl break-words">
        {postInfo.title}
      </h1>

      <p className="text-sm font-bold text-gray00 mb-4 text-center bg-gray-100 w-[200px] mx-auto p-1 rounded-b-3xl">
        @{authorName}
      </p><hr /><br />

      <h1 className="text-xl text-center">{postInfo.summary}</h1><br />
      <hr />

      <div
        className={`text-lg mb-4 prose pt-2 max-w-none break-words ${
          postInfo.content.length > 550
            ? "first-letter:text-5xl first-letter:font-medium first-letter:float-left first-letter:leading-none first-letter:mr-2"
            : ""
        }`}
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>

      <div className="relative">
          <CoverImage
            src={`${API_BASE}/${postInfo.cover}`}
            alt="cover"
          />

        <div
          className={`absolute z-50 items-center gap-2 top-5 right-5`}>
          <button
            onClick={handleLike}
            className="bg-black border-white border-2 w-[103px] hover:bg-gray-800 cursor-pointer transition-all active:bg-blue-600 text-white px-4 py-1 rounded-xl"
          >
            {likes === 0 ? "Like post" : <h1>{likes} Like{likes > 1 ? "s" : ""}</h1>}
          </button>
        </div>
      </div>

      {isOwner && (
        <div
          onClick={handleHoverToggle}
          className={`flex items-center justify-center flex-wrap mb-1 text-white rounded-xl border-black border-3 transition-all bg-[#020303c9] p-2 w-full gap-4 ${
            isHovering ? "bg-opacity-80" : ""
          }`}
        >
          <Link to={`/edit/${postInfo._id}`}>
            <button
              onMouseEnter={() => setIsHovering('edit')}
              onMouseLeave={() => setIsHovering('')}
              aria-label="Edit post"
              className={`bg-black cursor-pointer transition-all p-1 px-3 rounded-xl active:scale-95
                          ${isHovering == 'edit' ? 'bg-white text-black' :''}`}
            >
              Edit post
            </button>
          </Link>

          <button
            onMouseEnter={() => setIsHovering('delete')}
            onMouseLeave={() => setIsHovering('')}
            aria-label="Delete post"
            onClick={handleDelete}
            className={`bg-black cursor-pointer text-white transition-all p-1 px-3 rounded-xl active:scale-95
                        ${isHovering == "delete" ? 'bg-red-500 text-black' :''}`}
          >
            Delete post
          </button>
        </div>
      )}

      <div className="flex items-center flex-wrap mb-5 text-white rounded-t-xl bg-[#020303c9] p-2 w-full">
        <TagsDisplay />
        <div className="ml-auto text-sm opacity-80">
          <ReactTimeAgo
            date={new Date(postInfo.createdAt).getTime()}
            locale="en-US"
          />
        </div>
      </div>
      {moreThan450Chars && <ScrollToTopArrow moreThan3posts={moreThan450Chars} />}
    </div>
  );
}

export default PostPage
