import './App.css';
import BlogPage from './pages/BlogPage';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useDataBlogStore from './store/useDataBlogStore';
function App() {
  const { setDataBlog } = useDataBlogStore();
  useEffect(() => {
    setDataBlog();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
