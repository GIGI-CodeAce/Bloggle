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
            <p className="text-lg">No external API news found...</p>
            <br />
            <p className="text-lg">Come back and retry later</p>
          </>
        )
      ) : (
        <div>
        <span className="material-symbols-outlined revert !text-[25px]">
          refresh</span>
        <div className="text-xl animate-pulse">Loading API...</div>
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
        className="mr-2 ml-1 scale-126 bg-green-400 transition-all hover:bg-green-400"
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
  errorWarning: boolean
}

export function HandleErrors({ title,summary,checkedTOS, errorWarning }: HandleErrorsProps) {

    return (
      <h1 className="h-6 text-center text-[15px] text-red-600 mt-1">
        {!errorWarning ? '' : title.length < 4 || title.length > 35 ? 
        'Title must be between 4 and 35 characters' : summary.length < 10 ? 'Post summary is too short' : 
        !checkedTOS ? 'You have to agree to our terms of service' : 
        'Failed to create post. Make sure all fields are filled in correctly.'}
      </h1>
    )
}