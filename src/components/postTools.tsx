
interface AddTagProps {
  tagInput: string;
  tagList: string[];
  setTagList: (tags: string[]) => void;
  setTagInput: (input: string) => void;
}

export function addTag({ tagInput, tagList, setTagList, setTagInput }: AddTagProps) {
  let cleaned = tagInput.trim().replace(/\s+/g, '');

  if (!cleaned.startsWith('#')) {
    cleaned = `#${cleaned}`;
  }

  const rawTag = cleaned.slice(1);

  if (
    rawTag.length >= 2 &&
    rawTag.length <= 15 &&
    !tagList.includes(cleaned)
  ) {
    setTagList([...tagList, cleaned]);
    setTagInput('');
  }
}


export interface RemoveTagProps {
  tag: string;
  tagList: string[];
  setTagList: (tags: string[]) => void;
}

export function removeTag({ tag, tagList, setTagList }: RemoveTagProps) {
  setTagList(tagList.filter(t => t !== tag));
}


interface HandleErrorsProps {
  title: string;
  errorWarning: boolean;
}

export function HandleErrors({ title, errorWarning }: HandleErrorsProps) {
  if (!errorWarning) return null;

  if (title.length < 4 || title.length > 35) {
    return (
      <h1 className="h-6 text-center text-red-600">
        Title must be between 4 and 35 characters
      </h1>
    );
  }

  return (
    <h1 className="h-6 text-center text-red-600">
      Failed to create post. Make sure all fields are filled in correctly.
    </h1>
  );
}

