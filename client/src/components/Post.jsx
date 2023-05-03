import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SOME_KEY_URL}/post`).then((respone) => {
      respone.json().then((post) => {
        setPost(post);
      });
    });
  }, []);
  return (
    <>
      {post.length > 0 &&
        post.map((post, i) => (
          <div className="post" key={i}>
            <div className="img">
              <Link to={`/post/${post._id}`}>
                <img
                  src={`${import.meta.env.VITE_SOME_KEY_URL}/${post.cover}`}
                  alt="img"
                />
              </Link>
            </div>
            <div className="blog-info">
              <b>{post.creator.userName}</b>
              <Link to={`/post/${post._id}`} style={{ color: 'black' }}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.summary}</p>
              <i>{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</i>
            </div>
          </div>
        ))}
    </>
  );
};

export default Post;
