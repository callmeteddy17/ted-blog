import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from './Editor';

const EditPost = () => {
  const param = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [display, setDisplay] = useState('none');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SOME_KEY_URL}/post/${param.id}`).then(
      (res) => {
        res.json().then((post) => {
          setTitle(post.title);
          setSummary(post.summary);
          setContent(post.content);
        });
      }
    );
  }, []);

  const updatePost = async (e) => {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', param.id);
    if (file[0]) {
      data.set('file', file[0]);
    }

    e.preventDefault();

    const respone = await fetch(`${import.meta.env.VITE_SOME_KEY_URL}/post`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    if (respone?.ok) {
      setRedirect(true);
    } else {
      setDisplay('block');
    }
  };

  if (redirect) {
    return <Navigate to={`/`} />;
  }

  return (
    <form className="create-post" onSubmit={updatePost}>
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

      <Editor content={content} setContent={setContent} />
      <p
        style={{
          color: 'red',
          display: `${display}`,
          fontSize: '1.5rem',
          textAlign: 'center',
        }}>
        You are not the creator
      </p>
      <button>UPDATE POST</button>
    </form>
  );
};

export default EditPost;
