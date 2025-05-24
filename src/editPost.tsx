import { useEffect, useState } from "react";
import RichTextEditor from "@mantine/rte";
import { Navigate, useParams } from "react-router-dom";
import type { PostProps } from "./Post";

function EditPost(){
      const [content, setContent] = useState('<span >Your content here</span>');
      const [title, setTitle] = useState('');
      const [summary, setSummary] = useState('');
      const [files, setFiles] = useState<FileList | null>(null);
      const [tagInput, setTagInput] = useState('');
      const [tags, settags] = useState<string[]>([]);
      const [redirect, setRedirect] = useState(false);
      const {id} = useParams()

        useEffect(() => {
          if(!id) return
        fetch(`http://localhost:4000/post/${id}`)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
            })
            .then((data: PostProps) => {
            const { title, content, summary, tags } = data;
            setTitle(title);
            setContent(content);
            setSummary(summary);
            settags(tags || []);
            
            })
            .catch((err) => {
            console.error("Failed to fetch post:", err);
            });
        }, [id]);
        

      const addTag = () => {
      let cleaned = tagInput.trim();

        cleaned = cleaned.replace(/\s+/g, '');

        if (!cleaned.startsWith('#')) cleaned = `#${cleaned}`;

        if (
            cleaned.length >= 4 &&
            cleaned.length <= 14 &&
            !tags.includes(cleaned)
        ) {
            settags([...tags, cleaned]);
            setTagInput('');
        }
        };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission
    addTag(); // Add the tag instead
  }
};



  const removeTag = (tag: string) => {
    settags(tags.filter(t => t !== tag));
  };

 async function updatePost(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (id !== undefined) {
      data.set('id', id);
    }
    data.set('tags', JSON.stringify(tags));
    if (files && files[0]) {
      data.set('file', files[0]);
    }

    await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include'
    });

    setRedirect(true);
  }

        if(redirect){
        
        return <Navigate to={`/post/${id}`}/>
      }

    return(
        <main>
                  <h1 className="text-center text-3xl font-extrabold">Edit post</h1>
                  <form
                    onSubmit={updatePost}
                    className="flex flex-col gap-4 mt-10 w-full max-w-xl mx-auto"
                  >
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="border border-gray-500 p-2"
                      type="text"
                      placeholder="Post title"
                    />
                    <input
                      value={summary}
                      onChange={e => setSummary(e.target.value)}
                      className="border border-gray-500 p-2"
                      type="text"
                      placeholder="Post summary"
                    />
                    {files?.[0] && (
                      <p className="text-sm text-gray-600">Selected: {files[0].name}</p>
                      )}
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
                      <span
                        className=" text-3xl select-none absolute left-[6px] top-[3px]">#</span>
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
                          className="bg-black hover:bg-gray-800 text-white px-3 rounded"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map(tag => (
                          <span
                            key={tag}
                            className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-red-500 hover:text-red-700"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
            
                    <button
                      type="submit"
                      className="text-white px-4 py-2 rounded bg-black hover:bg-gray-800"
                    >
                      Update post
                    </button>
                  </form>
        </main>
    )
}

export default EditPost 