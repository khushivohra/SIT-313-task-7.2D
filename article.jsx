
// export default Article;
import React, { useEffect, useState } from 'react';
import { dbase, storage } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';// universal unique identifier
import './article.css';

function Article() {
  const [imageUpload, setImageUpload] = useState(null);
  const [newTitle, setnewTitle] = useState('');
  const [newAbstract, setNewAbs] = useState('');
  const [Art_text, setArt_Text] = useState('');
  const [setTags, setNewTags] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(dbase, 'Article');

  const uploadImage = () => {
    if (imageUpload == null) return;

    const ImageRef = ref(storage, `images/${imageUpload.name + v4()}`);// helps to append
    uploadBytes(ImageRef, imageUpload).then((snapshot) => {// image data is in snapshot
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const imageUrl = downloadURL;

        const articleData = {
          Title: newTitle,
          Abstract: newAbstract,
          ArticleText: Art_text,
          Tags: setTags,
          ImageUrl: imageUrl,
        };

        addDoc(usersCollectionRef, articleData)
          .then(() => {
            alert('image uploaded successfully');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
    });
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Title: newTitle,
      Abstract: newAbstract,
      ArticleText: Art_text,
      Tags: setTags,
      
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    
    <>
          <div className="data">
            <h3>What do you want to share or ask</h3>
         </div>
         <div>
             <h3>Please elaborate the details in the given box</h3>
         </div>
    
           <div className="t">
             <label htmlFor="t">Title </label>
             <input type="text" placeholder="Enter a descriptive title" onChange={(e) => setnewTitle(e.target.value)} required />
           </div>
           <br />
    
           <div>
          Add an Image:{' '}
          <input className='image'
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>
        <div className='image'>
          <button onClick={uploadImage}>UPLOAD</button>
        </div>
          
    
          <div className="abstract">
            <label htmlFor="abstract">Abstract </label>
            <input type="text" placeholder="Enter a 1-paragraph abstract" onChange={(event)=>{
               setNewAbs(event.target.value)
            }}
            />
          </div>
          <br />
          <div className="article">
            <label htmlFor="article text">Article Text</label>
            <input type="text" placeholder="Enter the article text" onChange={(event)=> {
             setArt_Text(event.target.value); }} />
          </div>
          <br />
    
          <div className="tag">
            <label htmlFor="tag">Tags </label>
            <input type="text" placeholder="Enter tags separated by commas" onChange={(event)=>{
              setNewTags(event.target.value)
            }}
            />
          </div>
          <br />
          <div className="P">
            <button type="button" onClick={createUser}>
              Post
            </button>
          </div>
          <br />
        </>
  );
}
export default Article;