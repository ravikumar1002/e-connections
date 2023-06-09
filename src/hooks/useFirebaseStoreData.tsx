import { db } from "App";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useAppDispatch } from "./useAppDispatch";

export const firebaseStoreDataUpdate = async (data: object, ...args: any) => {
  const dispatch = useAppDispatch();

  try {
    // @ts-ignore
    const docRef = await updateDoc(doc(db, ...args), { ...data });
    console.log(docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const useFirebaseStoreDataAdd = async (data: object, ...args: any) => {
  const dispatch = useAppDispatch();

  try {
    // @ts-ignore
    const docRef = await setDoc(doc(db, ...args), { ...data });
    console.log(docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
