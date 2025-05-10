import { useState } from "react";

function Articles() {
    const articles = [
        {
            title: "Microsoft employees are banned from using DeepSeek app, president says",
            author: "Charles Rollet",
            tags: "#AI #News",
        },
        {
            title: "Microsoft employees are banned from using DeepSeek app, president says",
            author: "Charles Rollet",
            tags: "#AI #News",
        },
        {
            title: "Microsoft employees are banned from using DeepSeek app, president says",
            author: "Charles Rollet",
            tags: "#AI #News",
        },
        {
            title: "Microsoft employees are banned from using DeepSeek app, president says",
            author: "Charles Rollet",
            tags: "#AI #News",
        },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <main className="space-y-6 max-w-screen-xl mx-auto px-4 py-6">
            {articles.map((article, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex items-center space-x-4 h-[120px] xl:h-[200px] transition-all"
                >
                    <div className="bg-[url('/employee.webp')] w-[200px] h-[120px] xl:w-[400px] xl:h-[200px] bg-cover rounded" />

                    <div className="flex flex-col justify-center">
                        <h1
                            className={`text-sm xl:text-2xl md:text-xl font-semibold hover:cursor-pointer ${
                                hoveredIndex === index ? "underline" : ""
                            }`}
                        >
                            {article.title}
                        </h1>
                        <span className="text-xs xl:text-base text-gray-500 mt-2">
                            <span className="font-bold">{article.author}</span> • {article.tags}
                        </span>
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Articles;
