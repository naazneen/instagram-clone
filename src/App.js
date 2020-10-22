import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import logo1 from './logo1.jpg';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
   
  ]);
  // post is array
  // post.append() is setPosts 
// useEffect code run on specific condition.

useEffect(() => {
db.collection('posts').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc => doc.data()));
} ) // every single added, add on page.
},[]); // once when app componenet loads
// [post] once when post is added
return (
    <div className="app">
<div className="app__header">
<img 
className="app_headerImage" 
src={logo1} />
</div>
<h1>You got it, Girrl!</h1>
<p>Let's build instagram clone!</p>
      {/* urls from public 
      <Post username="NaazWeb" caption="You're doing great!" imageUrl="/images/postimg.png" />
      <Post username="Faique" caption="Dank!" imageUrl="/images/postimg2.jpg"/> 
      <Post username="Greta" caption="Awesome!"  imageUrl="/images/postimg3.png"/>
      <Post />
      <Post />
*/}
      {
        posts.map(post => (
          <Post username={post.username} caption = {post.caption} imageUrl = {post.imageUrl}/>

        ))
      }
    </div>
  ); 
}

export default App;
