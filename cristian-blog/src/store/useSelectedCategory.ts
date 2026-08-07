import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type SelectedCategory = {
  category: string;
  subCategory: string;
  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
};

const useSelectedCategory = create<SelectedCategory>()(
  devtools((set) => ({
    category: '',
    subCategory: '',
    setCategory: (category: string) => set({category: category}),
    setSubCategory: (subCategory: string) => set({subCategory: subCategory}),
  }))
);

export default useSelectedCategory;
