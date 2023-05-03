import { Routes, Route } from 'react-router-dom';

import {
  Post,
  Header,
  LoginPage,
  RegisterPage,
  CreatePost,
  PostPage,
  EditPost,
} from './components';
import './App.css';
import { UserContextProvider } from './components/UserContext';

function App() {
  return (
    <UserContextProvider>
      <main>
        <Header />
        <Routes>
          <Route index element={<Post />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
