import 'react-quill/dist/quill.snow.css';
import { RichTextEditor } from '@mantine/rte';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function CreatePost() {
  const [content, setContent] = useState('<span >Your content here</span>');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [redirect, setRedirect] = useState(false);
  const [errorWarning, setErrorWarning] = useState(false);

  async function SubmitPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('tags', JSON.stringify(tagList));

    if (files && files[0]) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      if (!response.ok) {
        setErrorWarning(true);
        throw new Error('Failed to create post');
      }
      const result = await response.json();
      console.log('Post created:', result);
      setRedirect(true);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  }

  const addTag = () => {
    let cleaned = tagInput.trim().replace(/\s+/g, '');

    if (!cleaned.startsWith('#')) {
      cleaned = `#${cleaned}`;
    }

    const rawTag = cleaned.slice(1);

    if (
      rawTag.length >= 3 &&
      rawTag.length <= 15 &&
      !tagList.includes(cleaned)
    ) {
      setTagList([...tagList, cleaned]);
      setTagInput('');
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag: string) => {
    setTagList(tagList.filter(t => t !== tag));
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

function HandleErrors() {
  let error = '';
  console.log(errorWarning);
  

  if (title.length > 44 || title.length < 4) {
    error = 'Title length is less than 4 or more than 45';
  } else {
    error = 'Failed to create post, make sure no input is empty';
  }

  return errorWarning ? (
    <h1 className="h-6 text-center text-red-600">{error}</h1>
  ) : null;
}


  return (
    <main>
      <h1 className="text-center text-3xl font-extrabold">Create post</h1>
        <HandleErrors/>
      <form
        onSubmit={SubmitPost}
        className="flex flex-col gap-4 mt-6 w-full max-w-xl mx-auto"
      >
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-500 p-2"
          type="text"
          placeholder="Post title (max 45 chars)"
        />
        <input
          value={summary}
          onChange={e => setSummary(e.target.value)}
          className="border border-gray-500 p-2"
          type="text"
          placeholder="Post summary"
        />
        <input
          className="border rounded p-2"
          type="file"
          onChange={e => setFiles(e.target.files)}
        />
        <RichTextEditor
          controls={[
            ['bold', 'italic', 'underline', 'strike'],
            ['h1', 'h2', 'h3'],
            ['unorderedList', 'orderedList'],
            ['link', 'video'],
            ['code', 'blockquote'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
          value={content}
          onChange={setContent}
        />

        {/* --- Tag Input --- */}
        <div>
          <div className="flex gap-2 relative">
            <span className="text-3xl select-none absolute left-[6px] top-[3px]">#</span>
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-500 p-2 flex-1 pl-7"
              type="text"
              placeholder="Add a tag (min 3, max 13 chars)"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-black hover:bg-gray-800 transition-all cursor-pointer hover:rounded-lg text-white px-3 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tagList.map(tag => (
              <span
                key={tag}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
        title='Click to submit your post'
          type="submit"
          className="text-white hover:rounded-xl transition-all px-4 py-2 rounded cursor-pointer bg-black hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
      <div className="text-center m-2">
        <h1 className="text-center text-xl font-extrabold mt-8">
          Bloggle It Out: <span className="text-gray-600">Share What’s On Your Mind</span>
        </h1>
      </div>
    </main>
  );
}

export default CreatePost;
