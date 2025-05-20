import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import type { PostProps} from "./Post";

function PostPage() {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const { id } = useParams();
  const tags = postInfo?.tags

  console.log(postInfo);
  

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
      <h1 className="text-3xl font-bold mb-2 text-center bg-gray-100 w-[500px] mx-auto p-1 rounded-b-3xl">{postInfo.title}</h1>
      <p className="text-sm text-gray00 mb-4 text-center bg-gray-100 w-[200px] mx-auto p-1 rounded-b-3xl">@{authorName}</p>
      <div
        className="text-lg mb-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>

      <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover" className="w-full rounded-lg mb-4" />
      <div className="flex flex-wrap gap-2">
        <TagsDisplay/>
        <div className="flex self-end mb-1 absolute right-5"><ReactTimeAgo date={postInfo.createdAt} locale="en-US" /></div>
      </div>
    </div>
  );
}

export default PostPage;
