import { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'

export interface PostProps {
  _id: number;
  cover: string;
  title: string;
  likes: number;
  likedBy: Array<string>;
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
        const displayTags = tags && tags.length > 0 ? props.tags : [''];

        return (
          <span className="flex flex-wrap">
            {displayTags?.map((tag, index) => (
              <span key={index} className=" text-black transition-all px-1 py-1">
                {tag.startsWith('#') ? tag : ``}
              </span>
            ))}
          </span>
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
          className={`w-[200px] min-w-[150px] h-[120px] xl:w-[400px] ${hoveredIndex ? 'border' : ''} xl:h-[200px] object-fill rounded-xl`}
          src={`http://localhost:4000/${props.cover}`}
          alt="Cover"
      />


      <div className="flex  flex-col">
                <h1
          className={`text-lg xl:text-3xl md:text-2xl font-semibold hover:cursor-pointer truncate ${
            hoveredIndex === props._id ? "underline" : ""
          }`}>
          {props.title}
        </h1>
        <span className="text-xs xl:text-base text-gray-400 flex items-center">
          <span className="mr-1">@{authorName}</span>
          <span>•</span>
          <span className="ml-1 flex items-center gap-1">
            <ReactTimeAgo date={new Date(props.createdAt).getTime()} locale="en-US" />•
            <TagsDisplay />
          </span>
        </span>


                <h1
          className={`text-sm mt-2 text-gray-500 xl:text-xl md:text-2xl font-semibold hover:cursor-pointer`}
        >
          {props.summary}
        </h1>
      </div>
    </div>
    </Link>
  );
}

export default PostLayout;
