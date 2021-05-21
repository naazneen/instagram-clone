import { Button } from '@material-ui/core'
import React,  {useState} from 'react'
import {storage, db} from "./firebase";
import firebase from "firebase";
import './ImageUpload.css';
function ImageUpload({username})
{
    const [caption, setCaption] = useState('');
    /* const [url,setUrl] = useState('');*/
    const [progress, setProgress] = useState(0);
    const [image,setImage] = useState(null);
    const handleChange = (e)=> {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        console.log("username with:",username);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress
                const progres = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
                );
                setProgress(progress);
            },
            (error) => {
                //error
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post inside db
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username:username
                    });
                    // set to empty
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );
    };
    return (
        <div className="imageupload">
            
               {/* caption input, file picker, post button*/}
            <input type="text" placeholder="Enter a caption" value={caption} onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}
export default ImageUpload