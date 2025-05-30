
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
  let error = '';

  if (title.length > 40 || title.length < 4) {
    error = 'Title length is less than 4 or more than 45';
  } else {
    error = 'Failed to create post, make sure no input is empty';
  }

  return errorWarning ? (
    <h1 className="h-6 text-center text-red-600">{error}</h1>
  ) : null;
}
