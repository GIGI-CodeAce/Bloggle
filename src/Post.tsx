import { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { API_BASE } from "./components/api";

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
  const tags = props.tags;

  function TagsDisplay() {
    const displayTags = tags && tags.length > 0 ? tags : [''];
    return (
      <span className="flex flex-wrap">
        {displayTags.map((tag, index) => (
          <span key={index} className="text-black transition-all px-1 py-1">
            {tag.startsWith('#') ? tag : ''}
          </span>
        ))}
      </span>
    );
  }

  return (
    <Link
      to={`/post/${props._id}`}
      onMouseEnter={() => setHoveredIndex(props._id)}
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={() =>
        setHoveredIndex((prev) => (prev === props._id ? null : props._id))
      }
      className={`flex space-x-4 h-[120px] xl:h-[200px] rounded-xl transition-all ${
        hoveredIndex === props._id ? 'bg-gray-100' : ''
      }`}
    >
      <div className="flex items-center space-x-3 sm:space-x-4 h-[120px] xl:h-[200px] transition-all">
        <img
          className={`w-[160px] xl:w-[400px]  sm:w-[200px] h-[120px] xl:h-[200px] object-fill rounded-xl ${
            hoveredIndex === props._id ? 'border' : ''
          }`}
          src={`${API_BASE}/${props.cover}`}
          alt="Cover"
        />

        <div className="flex flex-col">
          <h1
            className={`text-lg xl:text-3xl md:text-2xl font-semibold hover:cursor-pointer truncate ${
              hoveredIndex === props._id ? 'underline' : ''
            }`}
          >
            {props.title}
          </h1>

          <div className="text-xs xl:text-base text-gray-400">
            <div className="flex flex-wrap items-center gap-1">
              <span>@{authorName}</span>
              <span>•</span>
              <span><ReactTimeAgo date={new Date(props.createdAt).getTime()} locale="en-US" /></span>

              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex"><TagsDisplay /></span>
            </div>

            <div className="flex sm:hidden mt-1">
              <TagsDisplay />
            </div>
          </div>

          <h1 className="text-sm mt-2 text-gray-500 xl:text-xl md:text-xl font-semibold hover:cursor-pointer">
            {props.summary}
          </h1>
        </div>
      </div>
    </Link>
  );
}

export default PostLayout;
