import { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
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
  postUrl?: string;
}

function PostLayout(props: PostProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    typeof props.author === "object" ? props.author.username : props.author;

  const commonProps = {
    onMouseEnter: () => setHoveredIndex(props._id),
    onMouseLeave: () => setHoveredIndex(null),
    onTouchStart: () =>
      setHoveredIndex((prev) => (prev === props._id ? null : props._id)),
    className: `flex space-x-4 mb-2 h-[120px] xl:h-[200px] rounded-xl transition-all ${
      hoveredIndex === props._id ? "bg-gray-100" : ""
    }`,
  };

  if (props.postUrl) {
    return (
      <a
        href={props.postUrl}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        <PostContent {...props} hoveredIndex={hoveredIndex} />
      </a>
    );
  }

  return (
    <Link to={`/post/${props._id}`} {...commonProps}>
      <PostContent {...props} hoveredIndex={hoveredIndex} />
    </Link>
  );
}

interface PostContentProps extends PostProps {
  hoveredIndex: number | null;
}

function PostContent({
  _id,
  cover,
  title,
  summary,
  createdAt,
  author,
  tags,
  hoveredIndex,
}: PostContentProps) {
  const authorName = typeof author === "object" ? author.username : author;

  function TagsDisplay() {
    const displayTags = tags && tags.length > 0 ? tags : [""];
    return (
      <span className="flex flex-wrap">
        {displayTags.map((tag, index) => (
          <span key={index} className="text-black transition-all px-1 py-1">
            {tag.startsWith("#") ? tag : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="flex items-center space-x-3 shrink-0 sm:space-x-4 h-[120px] xl:h-[200px] transition-all">
      <img
        className={`w-[160px] min-w-[160px] xl:w-[350px]  sm:w-[200px] h-[120px] xl:h-[200px] object-fill rounded-xl ${
          hoveredIndex === _id ? "border" : ""
        }`}
        src={cover.startsWith("http") ? cover : `${API_BASE}/${cover}`}
        alt="Cover"
      />

      <div className="flex flex-col">
        <h1
          className={`text-lg xl:text-3xl md:text-2xl font-semibold hover:cursor-pointer truncate w-[300px] sm:w-[600px] ${
            hoveredIndex === _id ? "underline" : ""
          }`}
        >
          {title}
        </h1>

        <div className="text-xs xl:text-base text-gray-400">
          <div className="flex flex-wrap items-center gap-1">
            <span>@{authorName}</span>
            <span>•</span>
            <span>
              <ReactTimeAgo date={new Date(createdAt).getTime()} locale="en-US" />
            </span>

            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex">
              <TagsDisplay />
            </span>
          </div>

                    <div className="flex sm:hidden mt-1">
            <TagsDisplay />
          </div>
        </div>

          <h1 className="text-sm mt-2 text-gray-500 xl:text-xl md:text-xl font-semibold hover:cursor-pointer line-clamp-2 max-w-[90%]">
            {summary}
        </h1>
      </div>
    </div>
  );
}

export default PostLayout;
