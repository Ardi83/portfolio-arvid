import {database} from '../firebase/setup';
import {
  collection,
  getDocs,
  QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore';

const getNotesData = async () => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(database, 'html')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
};

export default getNotesData;
