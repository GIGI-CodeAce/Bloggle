import 'react-quill/dist/quill.snow.css';
import { RichTextEditor } from '@mantine/rte';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function CreatePost() {
 const [content, setContent] = useState('<span >Your content here</span>');
 const [title, setTitle] = useState('')
 const [summary, setSummary] = useState('')
 const [files, setFiles] = useState<FileList | null>(null);
 const [redirect, setRedirect] = useState(false)

async function SubmitPost(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const data = new FormData();
  data.set('title', title);
  data.set('summary', summary);
  data.set('content', content);

  if (files && files[0]) {
    data.set('file', files[0]);
    console.log(files[0]);
    
  }

  try {
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      credentials: 'include',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }else{
      setRedirect(true)
      
    }

    response.ok ? setRedirect(true) : Promise.reject(new Error('Failed to create post'))

    const result = await response.json();
    console.log('Post created:', result);
  } catch (err) {
    console.error('Error creating post:', err);
  }
}

if (redirect) {
  return <Navigate to="/" />;
}

  return (
    <main>
      <h1 className="text-center text-3xl font-extrabold">Create post</h1>
      <form onSubmit={SubmitPost} className="flex flex-col gap-4 mt-10 w-full max-w-xl mx-auto">
        <input
          value={title}
          onChange={((e)=> setTitle(e.target.value))}
          className="border border-gray-500 p-2"
          type="text"
          placeholder="Post title"
        />
        <input
          value={summary}
          onChange={((e)=> setSummary(e.target.value))}
          className="border border-gray-500 p-2"
          type="text"
          placeholder="Post summary"
        />
        <input className="border rounded p-2" type="file" 
               onChange={((e)=> setFiles(e.target.files))}/>
        <RichTextEditor
          controls={[
          ['bold', 'italic', 'underline', 'strike'],
          ['h1', 'h2', 'h3'],
          ['unorderedList', 'orderedList'],
          ['link', 'video'],
          ['code', 'blockquote'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
         value={content} onChange={setContent} />

        <button
          type="submit"
          className="text-white px-4 py-2 rounded bg-black hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
