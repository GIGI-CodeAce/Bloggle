import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function CategoriesTab() {
  const location = useLocation()
  const currentPath = location.pathname;
  const [hoveringLink, setHoveringLink] = useState<string | null>(null)

  const baseStyle =
    "mr-3 p-1 rounded-t-xl cursor-pointer border-b-4 border-transparent hover:border hover:font-medium";
  const activeStyle = "border-b-4 border-b-white font-bold";

  const handleEnter = (name: string) => setHoveringLink(name);
  const handleLeave = () => setHoveringLink(null);

  return (
    <main className="w-full sm:text-[16px] text-sm h-10 bg-[#020303b1] text-white flex items-center">
      <ul className="max-w-screen-xl select-none mx-auto w-full flex items-center px-2">
        <Link
          to="/"
          onMouseEnter={() => handleEnter("home")}
          onMouseLeave={handleLeave}
          onTouchStart={() => handleEnter("home")}
          onTouchEnd={handleLeave}
        >
          <li
            className={`${baseStyle} ${
              currentPath === "/" || hoveringLink === "home" ? activeStyle : ""
            }`}
          >
            Only on bloggle
          </li>
        </Link>

        {/* Trusted sources link */}
        <Link
          to="/trustedPosts"
          onMouseEnter={() => handleEnter("trusted")}
          onMouseLeave={handleLeave}
          onTouchStart={() => handleEnter("trusted")}
          onTouchEnd={handleLeave}
        >
          <li
            className={`${baseStyle} ${
              currentPath === "/trustedPosts" || hoveringLink === "trusted"
                ? activeStyle
                : ""
            }`}
          >
            Trusted sources
          </li>
        </Link>

        {currentPath === "/trustedPosts" && (
          <li
            onClick={() =>
              confirm(
                "Trusted Sources category are official news coming from a safe news API where you could check out updates about what's happening around the world."
              )
            }
            className="ml-auto m-[20px] text-[12px] p-1 rounded-xl hover:font-light hover:bg-[hsla(180,10%,1%,0.3)] bg-[hsla(180,10%,11%,0.3)] cursor-pointer"
          >
            About this page
          </li>
        )}
      </ul>
    </main>
  );
}

export default CategoriesTab
