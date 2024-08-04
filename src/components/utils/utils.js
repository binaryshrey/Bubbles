import { db } from '../utils/Firebase';
import {
  query,
  collection,
  getDocs,
  addDoc,
  where
} from 'firebase/firestore';

export const imageFileTypes = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'tif',
  'svg',
  'webp',
  'heif',
  'heic',
  'raw',
  'cr2',
  'nef',
  'arw',
  'dng',
  'ico',
  'eps'
];

export const getFileType = (fileName) => {
  if (typeof fileName !== 'string' || !fileName.includes('.')) {
    return 'Unknown';
  }

  const extension = fileName.split('.').pop().toLowerCase();

  const fileTypeMap = {
    'jpg': 'Image',
    'jpeg': 'Image',
    'png': 'Image',
    'gif': 'Image',
    'bmp': 'Image',
    'tiff': 'Image',
    'tif': 'Image',
    'svg': 'Image',
    'webp': 'Image',
    'heif': 'Image',
    'heic': 'Image',
    'raw': 'Image',
    'cr2': 'Image',
    'nef': 'Image',
    'arw': 'Image',
    'dng': 'Image',
    'ico': 'Image',
    'eps': 'Image',
  };

  return fileTypeMap[extension] || 'Unknown';
}




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