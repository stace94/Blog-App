
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";


export default function EditPost() {
  // Extracting post ID from the URL parameters
  const { id } = useParams();

  // State variables to store post information, title, summary, content, files, and redirection status
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  // useEffect hook to fetch the existing post information when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/post/' + id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  // Async function to update the post when the form is submitted
  async function updatePost(ev) {
    ev.preventDefault();

    // Creating a FormData object to send data as a multipart/form-data
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    // Adding the file to the FormData if available
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    // Sending a PUT request to update the post
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    // If the update is successful, set redirection to true
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Redirecting to the post page if the update is successful
  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  // JSX for rendering the edit post form
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update post</button>
    </form>
  );
}
