import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AddTagProps {
  tagInput: string
  tagList: string[]
  setTagList: (tags: string[]) => void
  setTagInput: (input: string) => void
}

export function addTag({ tagInput, tagList, setTagList, setTagInput }: AddTagProps) {
  let cleaned = tagInput.trim().replace(/\s+/g, '')

  if (!cleaned.startsWith('#')) {
    cleaned = `#${cleaned}`
  }

  const rawTag = cleaned.slice(1)

  if (
    rawTag.length >= 2 &&
    rawTag.length <= 15 &&
    !tagList.includes(cleaned)
  ) {
    setTagList([...tagList, cleaned])
    setTagInput('')
  }
}
interface ArticlesPlaceholderProps {
  bloggleNews: boolean
}

export function ArticlesPlaceholder({ bloggleNews }: ArticlesPlaceholderProps) {
  const [notFound, setNotFound] = useState(false);
  const LoadingAPIMessage = bloggleNews ? 'Looking for Bloggle posts...' : 'Looking for official posts...'

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotFound(true)
    }, 1000);

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-gray-500 flex-col text-center justify-center mt-20">
      {notFound ? (
        bloggleNews ? (
          <>
            <h1 className="text-4xl">˙◠˙</h1>
            <p className="text-lg">No interesting blogs or news found...</p>
            <br />
            <p className="text-lg">Sign in and create your own!</p>
          </>
        ) : (
                    <>
            <h1 className="text-3xl mb-1">o_O</h1>
            <p className="text-lg">No external news found...</p>
            <br />
            <p className="text-lg">Come back and try later</p>
          </>
        )
      ) : (
        <div>
        <span className="material-symbols-outlined revert animate-spin !text-[25px]">
          refresh</span>
        <div className="text-xl animate-pulse">{LoadingAPIMessage}</div>
        </div>
      )}
    </div>
  );
}

interface TOSProps {
  checkedTOS: boolean
  setCheckedTOS: React.Dispatch<React.SetStateAction<boolean>>
}

export function TOSagreement({ checkedTOS, setCheckedTOS }: TOSProps) {
  const navigate = useNavigate();

  return (
    <label className="cursor-pointer mt-[-10px]">
      <input
        className="mr-2 ml-1 scale-126 bg-green-400 transition-all 
                   cursor-pointer hover:bg-green-400"
        type="checkbox"
        checked={checkedTOS}
        onChange={() => setCheckedTOS((prev) => !prev)}
      />
      <span>
        I agree to the{" "}
        <span className="underline ml-1" onClick={() => navigate("/terms")}>
          terms of service
        </span>
      </span>
    </label>
  );
}

interface ContentPagesInterface{
  allPosts: any
  postsPerPage: number
  currentPage: number
  setCurrentPage:any
  moreThan15posts: boolean

}

export function ContentPages({allPosts, currentPage, setCurrentPage, postsPerPage,moreThan15posts}: ContentPagesInterface) {
    const totalPages = Math.ceil(allPosts.length / postsPerPage)

  const buttonsStyleBase =
    "p-1 border w-9 h-9 mx-1 rounded-xl sm:w-8 sm:h-8  transition-all cursor-pointer select-none flex items-center justify-center";
  const activeStyle = "bg-[#020303e9] text-white";
  const inactiveStyle = "hover:bg-gray-200";

  if(!moreThan15posts) return null

  return (
    <div className="text-center flex mb-3 justify-center mt-[-15px]">
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = currentPage === pageNum;
        return (
          <button
            key={i}
            className={`${buttonsStyleBase} ${isActive ? activeStyle : inactiveStyle}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        className={`material-symbols-outlined ${buttonsStyleBase} ${inactiveStyle}`}
        onClick={() => setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1)}
      >
        chevron_right
      </button>
    </div>
  );
}

export function ScrollToTopArrow({ moreThan3posts }: { moreThan3posts: boolean }) {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    };

    useEffect(() => {
        const handleScroll = () => {
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return(
      <>
            {moreThan3posts && (
                <div className="w-full">
                    <button
                        title="Scroll to top"
                        onClick={scrollToTop}
                        className="animate-bounce text-black py-2 px-4 pb-1 rounded-full cursor-pointer hover:bg-gray-100 transition-all mx-auto block"
                        aria-label="Scroll to top"
                    >
                        <span className="material-symbols-outlined">
                            keyboard_double_arrow_up
                        </span>
                    </button>
                </div>
        )
      }
      </>
    )
}

export interface RemoveTagProps {
  tag: string
  tagList: string[]
  setTagList: (tags: string[]) => void
}

export function removeTag({ tag, tagList, setTagList }: RemoveTagProps) {
  setTagList(tagList.filter(t => t !== tag))
}


interface HandleErrorsProps {
  title: string
  summary: string
  checkedTOS: boolean
  isModerated:boolean
  errorWarning: boolean
  loading:boolean
}

export function HandleErrors({ title,summary,checkedTOS,isModerated, errorWarning, loading }: HandleErrorsProps) {

    return (
      <h1 className="h-6 text-center text-[15px] text-red-600 mt-1">
    {loading
      ? 'Checking content...' : !errorWarning
      ? '' : title.length < 4 || title.length > 44
      ? 'Title must be between 4 and 44 characters' : summary.length < 10
      ? 'Post summary is too short' : !checkedTOS
      ? 'You have to agree to our terms of service' : isModerated
      ? 'Our moderation tools detected some offensive content, please try again' :
       'Failed to create post. Make sure all fields are filled in correctly.'}
      </h1>
    )
}