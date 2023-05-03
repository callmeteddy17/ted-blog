import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from './Editor';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [img, setImg] = useState('none');

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file[0]);

    if (file === '') {
      e.preventDefault();
      setImg('block');
    } else {
      e.preventDefault();
      const respone = await fetch(`${import.meta.env.VITE_SOME_KEY_URL}/post`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      if (respone?.ok) {
        setRedirect(true);
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="create-post" onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files)}
      />
      <p style={{ color: 'red', display: `${img}`, fontSize: '1.5rem' }}>
        Please choose file
      </p>

      <Editor content={content} setContent={setContent} />
      <button>POST</button>
    </form>
  );
};

export default CreatePost;
