import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import type { PostProps} from "./Post";
import { UserContext } from "./userContext";

function PostPage() {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const {userInfo} = useContext(UserContext)
  const { id } = useParams();
  const tags = postInfo?.tags

  const authorName = typeof postInfo?.author === 'object' ? postInfo?.author.username : postInfo?.author;

        function TagsDisplay() {
        const displayTags = tags && tags.length > 0 ? postInfo.tags : ['#noHashtags'];

        return (
          <div className="mt-2 flex flex-wrap">
            {displayTags?.map((tag, index) => (
              <span key={index} className="mr-1 text-black transition-all px-1 py-1">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        );
      }

useEffect(() => {
  fetch(`http://localhost:4000/post/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data: PostProps) => {
      setPostInfo(data);
    })
    .catch((err) => {
      console.error("Failed to fetch post:", err);
    });
}, [id]);



  if (!postInfo) return <div>Loading...</div>;

  return (
    <div className="post-page p-4 max-w-2xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-2 text-center bg-gray-100 w-[550px] mx-auto p-1 rounded-b-3xl">{postInfo.title}</h1>
      <p className="text-sm font-bold text-gray00 mb-4 text-center bg-gray-100 w-[200px] mx-auto p-1 rounded-b-3xl">@{authorName}</p>

      <div
        className="text-lg mb-4 prose pt-2 max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>

      <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover" className="w-full pt-2 rounded-lg mb-4" />
      <div className="flex flex-wrap gap-2">
        <TagsDisplay/>
              {userInfo.id === postInfo.author._id && (
        <Link to={`/edit/${postInfo._id}`}>
        <button className="bg-black cursor-pointer text-white absolute right-[300px] bottom-[20px] hover:bg-gray-700 p-1 pl-3 pr-3 rounded-xl">Edit post</button>
        </Link>
      )}
        <div className="flex self-end mb-1 absolute right-5"><ReactTimeAgo date={ new Date(postInfo.createdAt).getTime()} locale="en-US" /></div>
      </div>
    </div>
  );
}

export default PostPage;
