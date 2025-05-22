import { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'

export interface PostProps {
  _id: number;
  cover: string;
  title: string;
  summary: string;
  content: string;
  createdAt: number;
  author: { _id: string; username: string };
  tags?: string[];
}

function PostLayout(props: PostProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
     const authorName = typeof props.author === 'object' ? props.author.username : props.author;

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
    <Link 
      onMouseEnter={() => setHoveredIndex(props._id)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="flex space-x-4 h-[120px] xl:h-[200px] rounded-xl hover:bg-gray-100 transition-all" 
      to={`/post/${props._id}`}>
    <div
      className="flex items-center space-x-4 h-[120px] xl:h-[200px] transition-all"
    >
        <img
          className="w-[200px] h-[120px] xl:w-[400px] xl:h-[200px] object-fill rounded-xl"
          src={`http://localhost:4000/${props.cover}`}
          alt="Cover"
      />


      <div className="flex  flex-col">
                <h1
          className={`text-lg xl:text-3xl md:text-2xl font-semibold hover:cursor-pointer ${
            hoveredIndex === props._id ? "underline" : ""
          }`}
        >
          {props.title}
        </h1>
                <span className="text-xs xl:text-base text-gray-400">
                     <span className=" mr-2">@{authorName}</span>•
          <span className="ml-2"><ReactTimeAgo date={ new Date(props.createdAt).getTime()} locale="en-US" /></span><br/>
        </span>

                <h1
          className={`text-sm mt-2 text-gray-500 xl:text-xl md:text-2xl font-semibold hover:cursor-pointer`}
        >
          {props.summary}
        </h1>
        <span className="text-xs xl:text-base text-gray-500 mt-2">
        <TagsDisplay/>
        </span>
      </div>
    </div>
    </Link>
  );
}

export default PostLayout;
