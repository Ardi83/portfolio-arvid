import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import useDataBlogStore from '../store/useDataBlogStore';
import arvidBack from '../assets/images/arvid-back.webp';
import '../blog.css';

const BlogPage = () => {
  const {dataBlog, loading, error, setDataBlog} = useDataBlogStore();

  useEffect(() => {
    setDataBlog();
  }, [setDataBlog]);

  // The portfolio paints body black; the blog is a light page. Swap it for as
  // long as this route is mounted, and put it back on the way out.
  useEffect(() => {
    document.body.classList.add('blog-theme');
    return () => document.body.classList.remove('blog-theme');
  }, []);

  return (
    <main className="blog-root">
      <section className="blog-page-section">
        <aside className="blog-page-aside">
          <div className="blog-page-aside-one">Arvid Nasirabadi Blog</div>
          <Link to="/" className="example-link-a-tag">
            ← Back to portfolio
          </Link>
          <img
            src={arvidBack}
            alt="Arvid Nasirabadi"
            width="100%"
            height="auto"
            style={{
              position: 'sticky',
              top: '20px', // distance from top when it sticks
            }}
          />
        </aside>
        <aside style={{ flex: 4, textAlign: 'left' }}>
          {loading && <p>Loading posts…</p>}
          {error && <p>Could not load posts: {error}</p>}
          {!loading && !error && dataBlog.length === 0 && (
            <p>No posts yet.</p>
          )}
          {dataBlog.map((item) => (
            <div style={{ textAlign: 'left' }} key={item.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <h2>{item.title}</h2>
                <h5 style={{ color: 'gray', fontWeight: 'lighter' }}>
                  Category: {item.category}
                </h5>
              </div>
              <p
                style={{ fontSize: '1.2rem' }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <p style={{ fontSize: '1rem', color: 'gray', fontStyle: 'italic' }}>
                example Link:{' '}
                <a className="example-link-a-tag" href={item.example_link}>
                  {item.example_link}
                </a>
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'gray',
                  fontStyle: 'italic',
                  textAlign: 'right',
                }}>
                Posted by: {item.posted_by}, at: {item.created_at}
              </p>
              <hr />
            </div>
          ))}
        </aside>
      </section>
    </main>
  );
};
export default BlogPage;
