import { Link, useLocation } from "react-router-dom";

function CategoriesTab() {
  const location = useLocation();
  const currentPath = location.pathname;

  const baseStyle =
    "mr-3 p-1 rounded-t-xl cursor-pointer border-b-4 border-transparent hover:border hover:font-medium";
  const activeStyle = "border-b-4 border-b-white font-bold";

  return (
<main className="w-full sm:text-[16px] text-sm h-10 bg-[#020303b1] text-white flex items-center">
  <ul className="max-w-screen-xl select-none mx-auto w-full flex items-center px-2">
    <Link to="/">
      <li
        className={`${baseStyle} ${
          currentPath === "/" ? activeStyle : ""
        }`}
      >
        Only on bloggle
      </li>
    </Link>

    <Link to="/trustedPosts">
      <li
        className={`${baseStyle} ${
          currentPath === "/trustedPosts" ? activeStyle : ""
        }`}
      >
        Trusted sources
      </li>
    </Link>

    {currentPath === "/trustedPosts" && (
      <li className="ml-auto m-[21px] hover:font-medium text-sm p-1 rounded-xl bg-[hsla(180,10%,1%,0.3)] cursor-pointer">
        About this page
      </li>
    )}
  </ul>
</main>

  );
}

export default CategoriesTab;
