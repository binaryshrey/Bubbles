import React, { useState, useEffect } from 'react';
import { storage } from '../../utils/Firebase';
import { ref, getDownloadURL, uploadBytesResumable, listAll } from 'firebase/storage';

function Favorites() {
  const [imgUrls, setImgUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progressPercent, setProgressPercent] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch all files from the 'images' folder
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const imagesRef = ref(storage, 'new-images/');
      const result = await listAll(imagesRef);
      const urls = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        }),
      );
      setImgUrls(urls);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  // Upload selected files
  const handleUpload = (e) => {
    e.preventDefault();
    const maxFiles = 3; // Maximum number of files
    const maxSize = 2 * 1024 * 1024; // Maximum file size in bytes (2 MB)

    let errorMsg = '';

    // Check file count
    if (selectedFiles.length > maxFiles) {
      errorMsg = `You can only upload a maximum of ${maxFiles} files.`;
      console.log(errorMsg);
      return;
    }

    // Check file sizes
    for (let file of selectedFiles) {
      if (file.size > maxSize) {
        errorMsg = `File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)} MB.`;
        console.log(errorMsg);

        return;
      }
    }

    if (selectedFiles.length === 0) return;

    // Object to store progress for each file
    const progress = {};

    // Create a promise for each file upload
    const uploadPromises = selectedFiles.map((file) => {
      // Create a metadata object
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uploadedBy: 'user123',
          description: 'This is a sample image upload',
        },
      };

      // Create a reference to the new folder 'images'
      const storageRef = ref(storage, `imadedededwdddeges/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Track progress for each file
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const fileProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          progress[file.name] = fileProgress;
          setProgressPercent({ ...progress });
        },
        (error) => {
          alert(error.message);
        },
        () => {
          // Handle successful uploads
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrls((prevUrls) => [...prevUrls, { name: file.name, url: downloadURL }]);
          });
        },
      );

      return uploadTask;
    });

    // Optionally: Wait for all uploads to complete
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  const removeSelectedFile = (fileName) => {
    return () => {
      setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when component mounts
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleUpload} className="form">
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {selectedFiles.length > 0 &&
        selectedFiles.map((file) => {
          return (
            <div className="flex" key={file.name}>
              <p>{file.name}</p>
              <p onClick={removeSelectedFile(file.name)}>Remove</p>
            </div>
          );
        })}
      {/* {Object.keys(progressPercent).length > 0 && (
        <div className="outerbar">
          {Object.entries(progressPercent).map(([fileName, percent]) => (
            <div key={fileName} className="progress-bar">
              <div className="outerbar">
                <div className="innerbar" style={{ width: `${percent}%` }}>
                  {percent}%
                </div>
              </div>
              <span>{fileName}</span>
            </div>
          ))}
        </div>
      )} */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        imgUrls.length > 0 && (
          <div className="gallery">
            {imgUrls.map(({ name, url }) => (
              <div key={name} className="image-item">
                <img src={url} alt={name} height={200} />
                <p>{name}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Favorites;
