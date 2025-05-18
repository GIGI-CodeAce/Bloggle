import { useState } from "react";
import ReactTimeAgo from 'react-time-ago'

export interface PostAuthor {
  _id: string;
  username: string;
}

export interface PostProps {
  id: number;
  img: string;
  title: string;
  content: string;
  createdAt: number;
  author: PostAuthor | string;
  tags?: string;
}


function PostLayout(props: PostProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
     const authorName = typeof props.author === 'object' ? props.author.username : props.author;
  return (
    <div
      onMouseEnter={() => setHoveredIndex(props.id)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="flex items-center space-x-4 h-[120px] xl:h-[200px] transition-all"
    >
      <div
        className="w-[200px] h-[120px] xl:w-[400px] xl:h-[200px] bg-cover bg-center rounded"
        style={{ backgroundImage: `url(${props.img})` }}
      />

      <div className="flex flex-col justify-center">
        <h1
          className={`text-sm xl:text-2xl md:text-xl font-semibold hover:cursor-pointer ${
            hoveredIndex === props.id ? "underline" : ""
          }`}
        >
          {props.title}
        </h1>
        <span className="text-xs xl:text-base text-gray-500 mt-2">
          <span className="font-bold mr-2">@{authorName}</span>•
          <span className="ml-2"><ReactTimeAgo date={props.createdAt} locale="en-US" /></span>
        </span>
      </div>
    </div>
  );
}

export default PostLayout;
