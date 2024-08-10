import { db } from '../utils/Firebase';
import {
  query,
  collection,
  getDocs,
  addDoc,
  where
} from 'firebase/firestore';
import { storage } from './Firebase';
import { ref, listAll } from "firebase/storage";


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



export const fetchSavedAlbumFolders = async (emailID) => {
  try {
    const baseDirRef = ref(storage, '/')
    // List all items in the base directory
    const allFolders = await listAll(baseDirRef);
        
    // Create a set to store unique folder names
    const folderSet = new Set();

    // Iterate over the items to extract folder names
    allFolders.prefixes.forEach((itemRef) => {
      const fullPath = itemRef._location.path_;
      const parts = fullPath.split(':');

      // If the path has multiple parts, we can infer folder names
      if (parts.length == 3) {
          folderSet.add(parts[0]);
        }
    });


    // Convert the set to an array and update state
    return(Array.from(folderSet));

    } 
    catch (err) {
      // Handle errors
      console.error('Error fetching folders:', err);
      return [];
    }
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



export const formatDate = (inputDate)  => {
  const date = new Date(inputDate);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month} ${hours}:${minutes}`;
}


export const getAlbumPublishDate = () => {
  const localeDateStr = new Date().toLocaleString("en-US");
  console.log(localeDateStr);
  const date = new Date(localeDateStr);
  console.log(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
