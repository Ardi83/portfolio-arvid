import useDataBlogStore from '../store/useDataBlogStore';
import cristianBack from '../assets/img/cristian-back.webp';

const BlogPage = () => {
  const { dataBlog } = useDataBlogStore();
  return (
    <main>
      <section className="blog-page-section">
        <aside className="blog-page-aside">
          <div className="blog-page-aside-one">Cristian Nass Blog</div>
          <img
            src={cristianBack}
            alt="Cristian Nass"
            width="100%"
            height="auto"
            style={{
              position: 'sticky',
              top: '20px', // distance from top when it sticks
            }}
          />
        </aside>
        <aside style={{ flex: 4, textAlign: 'left' }}>
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
