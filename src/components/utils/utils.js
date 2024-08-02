import { db } from '../utils/Firebase';
import {
  query,
  collection,
  getDocs,
  addDoc,
  where
} from 'firebase/firestore';


export const saveUserDataIfNewUser = async (user) => {

    try{
        const collection_ref = collection(db, 'users')
        const querySnapshot = query(collection_ref, where("email", "==", user.email))
        const doc_refs = await getDocs(querySnapshot);
        const res = []
        doc_refs.forEach(user => {
            res.push({
                id: user.id, 
                ...user.data()
            })
        })

        if(res.length === 0){
        await addDoc(collection(db, 'users'), {
            displayName : user.displayName,
            email: user.email,
            uid: user.uid,
            phoneNumber : user.phoneNumber,
            photoURL : user.photoURL,
            onboarded : false,
        }, { merge: true });
        }
    }
    catch (error) {
      console.error('Error saving user data:', error);
    }
  };