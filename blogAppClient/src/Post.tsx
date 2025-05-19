import { useState } from "react";
import ReactTimeAgo from 'react-time-ago'

export interface PostAuthor {
  _id: string;
  username: string;
}

export interface PostProps {
  id: number;
  cover: string;
  title: string;
  summary: string;
  content: string;
  createdAt: number;
  author: PostAuthor | string;
  tags?: [string];
}


function PostLayout(props: PostProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
     const authorName = typeof props.author === 'object' ? props.author.username : props.author;

     console.log('🖼️ Cover image path:', 'http://localhost:4000/'+props.cover);
     const tags = props.tags
function TagsDisplay() {
  const displayTags = tags && tags.length > 0 ? props.tags : ['#noHashtags'];

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


  return (
    <div
      onMouseEnter={() => setHoveredIndex(props.id)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="flex items-center space-x-4 h-[120px] xl:h-[200px] transition-all"
    >
<img
  className="w-[200px] h-[120px] xl:w-[400px] xl:h-[200px] object-cover rounded-xl"
  src={`http://localhost:4000/${props.cover}`}
  alt="Cover"
/>


      <div className="flex  flex-col">
        <h1
          className={`text-lg xl:text-3xl md:text-2xl font-semibold hover:cursor-pointer ${
            hoveredIndex === props.id ? "underline" : ""
          }`}
        >
          {props.title}
        </h1>
                <span className="text-xs xl:text-base text-gray-500">
                     <span className="font-bold mr-2">@{authorName}</span>•
          <span className="ml-2"><ReactTimeAgo date={props.createdAt} locale="en-US" /></span><br/>
        </span>

                <h1
          className={`text-sm mt-2 text-gray-500 xl:text-xl md:text-2xl font-semibold hover:cursor-pointer`}
        >
          {props.summary}
        </h1>
        <span className="text-xs xl:text-base text-gray-500 mt-2">

          <h1 className="mt-2">{TagsDisplay()}</h1>
        </span>
      </div>
    </div>
  );
}

export default PostLayout;
