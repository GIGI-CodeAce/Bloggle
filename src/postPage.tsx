import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import type { PostProps} from "./Post";
import { UserContext } from "./userContext";

function PostPage() {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const {userInfo} = useContext(UserContext)
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { id } = useParams();
  const tags = postInfo?.tags

  const authorName = typeof postInfo?.author === 'object' ? postInfo?.author.username : postInfo?.author;

        function TagsDisplay() {
        const displayTags = tags && tags.length > 0 ? postInfo.tags : ['#noHashtags'];

        return (
          <div className="flex">
            {displayTags?.map((tag, index) => (
              <span key={index} className="mr-1 text-white transition-all px-1 py-1">
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
      setLikes(data.likes || 0);
    })
    .catch((err) => {
      console.error("Failed to fetch post:", err);
    });
}, [id]);

useEffect(() => {
  if (postInfo) {
    setLikes(postInfo.likes);
    const userLiked = postInfo.likedBy?.some((id: string) => id === userInfo.id);
    setLiked(userLiked);
  }
}, [postInfo, userInfo]);

async function handleLike() {
  const res = await fetch(`http://localhost:4000/post/${id}/like`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await res.json();

  setLikes(data.likes);
  setLiked(data.liked);
}


  if (!postInfo) return <div>Loading...</div>;

  return (
    <div className="post-page p-4 max-w-2xl mx-auto relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-2 text-center bg-gray-100 w-[550px] mx-auto p-1 rounded-b-3xl">{postInfo.title}</h1>
      <p className="text-sm font-bold text-gray00 mb-4 text-center bg-gray-100 w-[200px] mx-auto p-1 rounded-b-3xl">@{authorName}</p>
      <hr/>

      <br/>
      <h1 className="text-xl text-center">{postInfo.summary}</h1>
      <br/>
      <hr/>
      <div
        className="text-lg mb-4 prose pt-2 max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>

        <div className="absolute bottom-134 right-7 z-50 items-center gap-2">
          <button
            onClick={handleLike}
            className="bg-black border-white border-3 hover:bg-gray-700 cursor-pointer transition-all active:bg-red-600 text-white px-4 py-1 rounded-xl"
          >
            {likes === 0 ? 'Like post' : <h1>{likes} Like{likes > 1 ? 's' : ''}</h1>}
          </button>
        </div>


      <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover" className="w-full pt-2 rounded-xl mb-4" />
        <div className="flex items-center flex-wrap rounded-xl text-white bg-[#020303c9] p-2 w-full">
          <TagsDisplay />

          {userInfo.id === postInfo.author._id && (
            <Link to={`/edit/${postInfo._id}`} className="ml-auto mr-4">
              <button className="bg-black cursor-pointer text-white hover:bg-white transition-all hover:text-black p-1 px-3 rounded-xl">
                Edit post
              </button>
            </Link>
          )}

          <div className="ml-auto text-sm opacity-80">
            <ReactTimeAgo date={new Date(postInfo.createdAt).getTime()} locale="en-US" />
          </div>
        </div>

    </div>
  );
}

export default PostPage;
