import { useContext, useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import type { PostProps} from "../Post";
import { UserContext } from "../userContext";
import { API_BASE } from "../components/api";

function PostPage() {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const {userInfo} = useContext(UserContext)
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
  fetch(`${API_BASE}/post/${id}`)
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

const navigate = useNavigate();

async function handleDelete() {
  if (!window.confirm('Are you sure you want to delete this post?')) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/delete/${postInfo?._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      navigate('/');
    } else {
      const data = await res.json();
      alert('Failed to delete post: ' + (data.error || data.message));
    }
  } catch (err) {
    alert('Error deleting post');
    console.error(err);
  }
}


useEffect(() => {
  if (postInfo) {
    setLikes(postInfo.likes);
  }
}, [postInfo, userInfo]);

async function handleLike() {
  const res = await fetch(`${API_BASE}/post/${id}/like`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await res.json();

  setLikes(data.likes);
}

  if (!postInfo) return <div className="text-center text-xl text-gray-700">Loading...</div>;

  return (
    <div className=" p-4 mb-5 max-w-2xl mx-auto relative overflow-hidden min-h-[300px]">
      <h1 className="text-xl md:text-3xl sm:text-2xl font-bold mb-2 text-center bg-gray-100 mx-auto p-1 rounded-b-3xl">{postInfo.title}</h1>
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


      <div>
        <img src={`${API_BASE}/${postInfo.cover}`} alt="cover" className="w-full mt-2 h-[400px] sm:h-[510px] rounded-xl mb-4 border" />

                <div className={`absolute z-50 items-center gap-2 right-8 
                ${userInfo && (userInfo.id === postInfo.author._id || userInfo.username === 'admin') ? 'bottom-121 sm:bottom-148' : 'bottom-107 sm:bottom-134'}`}>
          <button
            onClick={handleLike}
            className="bg-black border-white border-3 hover:bg-gray-700 cursor-pointer transition-all active:bg-blue-600 text-white px-4 py-1 rounded-xl"
          >
            {likes === 0 ? 'Like post' : <h1>{likes} Like{likes > 1 ? 's' : ''}</h1>}
          </button>
        </div>
      </div>
                  {(userInfo && (userInfo.id === postInfo.author._id || userInfo.username === 'admin')) && (
          <div className="flex items-center justify-center flex-wrap mb-1 text-white rounded-xl border-black border-3 bg-[#020303c9] p-2 w-full gap-4">
              <>
                <Link to={`/edit/${postInfo._id}`}>
                  <button className="bg-black cursor-pointer text-white hover:bg-white transition-all hover:text-black p-1 px-3 rounded-xl">
                    Edit post
                  </button>
                </Link>
              <button 
                onClick={handleDelete}
                className="bg-black cursor-pointer text-white hover:bg-red-500 transition-all hover:text-black p-1 px-3 rounded-xl"
              >
                Delete post
              </button>
              </>
          </div>
          )}

        <div className="flex items-center flex-wrap text-white rounded-t-xl bg-[#020303c9] p-2 w-full">
          <TagsDisplay />
          
          <div className="ml-auto text-sm opacity-80">
            <ReactTimeAgo date={new Date(postInfo.createdAt).getTime()} locale="en-US" />
          </div>
        </div>
    </div>
  );
}

export default PostPage;
