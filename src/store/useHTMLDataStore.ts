import {create} from 'zustand';
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

// Shape returned by /api/html — SQLite columns are snake_case.
type HTMLNoteRow = {
  type: string;
  title: string;
  sub_title: string;
  description: string;
  example: string;
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
      try {
        const rows = await fetchHTMLData();
        set({
          data: {
            about: 'Modern HTML semantic structure',
            htmlData: rows.map((item) => ({
              title: item.title,
              type: item.type,
              subTitle: item.sub_title,
              description: item.description,
              example: item.example,
            })),
          },
        });
      } catch (error) {
        console.error('Error fetching html notes: ', error);
      }
    },
    setHTMLData: (data: HTMLDataType) => set({data}),
  }))
);

const fetchHTMLData = async (): Promise<HTMLNoteRow[]> => {
  const response = await fetch('/api/html');
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('the API route did not return JSON — is the dev server running?');
  }
  return (await response.json()) as HTMLNoteRow[];
};
