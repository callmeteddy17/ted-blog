import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const param = useParams();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SOME_KEY_URL}/post/${param.id}`).then(
      (res) => {
        res.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    );
  }, []);

  if (!postInfo) {
    return 'loading...';
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>{postInfo.title}</h2>
        <Link to={`/edit/${postInfo._id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: '25px', color: 'black' }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </div>
      <p style={{ fontSize: '1rem' }}>Creator: {postInfo.creator.userName}</p>
      <time>{postInfo.createdAt}</time>
      <b style={{ fontSize: '1.2rem', margin: ' 20px 0px' }}>
        {postInfo.summary}
      </b>
      <img
        src={`${import.meta.env.VITE_SOME_KEY_URL}/${postInfo.cover}`}
        alt="cover"
      />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </>
  );
};

export default PostPage;
