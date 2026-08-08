import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type DataBlogType = {
  id: string;
  category: string;
  created_at?: string;
  description: string;
  example_link?: string;
  posted_by?: string;
  title: string;
};

// Shape returned by /api/blog-data — created_at is stored as an ISO string.
type BlogPostRow = Omit<DataBlogType, 'created_at'> & {created_at?: string | null};

type DataBlogStoreType = {
  dataBlog: DataBlogType[];
  loading: boolean;
  error: string | null;
  setDataBlog: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

const useDataBlogStore = create<DataBlogStoreType>()(
  devtools((set) => ({
    dataBlog: [],
    loading: false,
    error: null,
    setDataBlog: async () => {
      set({loading: true, error: null});
      try {
        const rows = await fetchDataBlog();
        set({
          dataBlog: rows.map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            created_at: formatCreatedAt(item.created_at),
            description: item.description,
            example_link: item.example_link,
            posted_by: item.posted_by,
          })),
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching blog posts: ', error);
        set({
          error: error instanceof Error ? error.message : 'Unknown error',
          loading: false,
        });
      }
    },
    setLoading: (loading: boolean) => set({loading: loading}),
    setError: (error: string | null) => set({error: error}),
  }))
);

const fetchDataBlog = async (): Promise<BlogPostRow[]> => {
  const response = await fetch('/api/blog-data');
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  // Guards against the API route not being served at all, in which case the
  // dev server answers with HTML or a JS module and response.json() throws
  // something unreadable.
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('the API route did not return JSON — is the dev server running?');
  }
  return (await response.json()) as BlogPostRow[];
};

// Preserves the previous Firestore behaviour, which rendered
// `created_at.toDate().toLocaleString()`.
const formatCreatedAt = (value?: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

export default useDataBlogStore;
