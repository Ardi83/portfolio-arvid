import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {database} from '../firebase/setup';

import {
  collection,
  getDocs,
  QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore';

type DataBlogType = {
  id: string;
  category: string;
  created_at?: string;
  description: string;
  example_link?: string;
  posted_by?: string;
  title: string;
};

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
      const htmlDataArray = await fetchDataBlog('blog-data');
      if (htmlDataArray) {
        set({
          dataBlog: htmlDataArray.map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            created_at: item.created_at,
            description: item.description,
            example_link: item.example_link,
            posted_by: item.posted_by,
          })),
        });
      }
    },
    setLoading: (loading: boolean) => set({loading: loading}),
    setError: (error: string | null) => set({error: error}),
  }))
);

const fetchDataBlog = async (
  collectionName: string
): Promise<DataBlogType[] | null> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(database, collectionName)
    );

    const htmlDataArray: DataBlogType[] = [];

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const id = doc.id;

      // Add each document as an item in the array
      htmlDataArray.push({
        category: docData.category || '',
        created_at: docData.created_at.toDate().toLocaleString() || '',
        description: docData.description || '',
        example_link: docData.example_link || '',
        posted_by: docData.posted_by || '',
        title: docData.title || '',
        id,
      });
    });

    return htmlDataArray;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return null;
  }
};

export default useDataBlogStore;
