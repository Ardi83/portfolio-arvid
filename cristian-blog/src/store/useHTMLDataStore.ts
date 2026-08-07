import {create} from 'zustand';
import {database} from '../firebase/setup';
import {
  collection,
  getDocs,
  QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore';
import {devtools} from 'zustand/middleware';

export type HTMLDataItemsType = {
  type: string;
  title: string;
  subTitle: string;
  description: string;
  example: string;
};

export type HTMLDataType = {
  about: string;
  htmlData: HTMLDataItemsType[];
};

type HTMLData = {
  data: HTMLDataType;
  getHTMLData: () => Promise<void>;
  setHTMLData: (data: HTMLDataType) => void;
};

export const useHTMLDataStore = create<HTMLData>()(
  devtools((set) => ({
    data: {
      about: '',
      htmlData: [],
    },
    getHTMLData: async () => {
      const htmlDataArray = await fetchHTMLData('html');
      if (htmlDataArray) {
        set({
          data: {
            about: 'Modern HTML semantic structure',
            htmlData: htmlDataArray.map((item) => ({
              title: item.title,
              type: item.type,
              subTitle: item.subTitle,
              description: item.description,
              example: item.example,
            })),
          },
        });
      }
    },
    setHTMLData: (data: HTMLDataType) => set({data}),
  }))
);

const fetchHTMLData = async (
  collectionName: string
): Promise<HTMLDataItemsType[] | null> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(database, collectionName)
    );

    const htmlDataArray: HTMLDataItemsType[] = [];

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      // Add each document as an item in the array
      htmlDataArray.push({
        title: docData.title || '',
        subTitle: docData.subTitle || '',
        description: docData.description || '',
        example: docData.example || '',
        type: docData.type || '',
      });
    });

    return htmlDataArray;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    return null;
  }
};
