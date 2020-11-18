import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import logo1 from './logo1.jpg';
import './App.css';
import Post from './Post';
import About from './About';
import { auth, db } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
// routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




//style beginss
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


//style ends => material ui - Modal



function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open,setOpen] = useState(false) ;
  const [openSignIn, setOpenSignIn] = useState('');

  const [username,setUsername] = useState('') ;
  const [email,setEmail] = useState('') ;
  const [password,setPassword] = useState('') ;
  // User
  const [user,setUser] = useState(null);
  
useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged((authUser) =>{
  
  if (authUser)
  {
    // logged in
    console.log(authUser);
   
    setUser(authUser);
    if(authUser.displayName){
      // don't update
     
    }
    else{
      // if new user.. // add username as displayname
      console.log("here2",authUser.displayName);
      return authUser.updateProfile({
        displayName:username,
      });
    }
  }
  else{
 // logges out 
 setUser(null);
  }

return () => {
  // perform cleanup
  unsubscribe();
}

})
}, [user,username]);




  // post is array
  // post.append() is setPosts 
// useEffect code run on specific condition.

useEffect(() => {
db.collection('posts').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc =>  (
    {
      id: doc.id,
      post: doc.data()
    })));
} ) // every single added, add on page.
},[]); // once when app componenet loads
// [post] once when post is added

const signUp = (event) => {
  
  event.preventDefault();

  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
    return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error) => alert(error.message))
  setOpen(false); // close modal
}


const signIn = (event) => {
  event.preventDefault();
  
  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message))
   setOpenSignIn(false);
  // close modal
}

return (
    <div className="app"> 
    <Router>
      <h4><Link to="/about">About</Link></h4>
      <Switch>
          <Route path="/about">
            <About />
          </Route>
      </Switch>
    </Router>
      {/* caption input, file picker, post button*/}
      {user?(
        
 <ImageUpload username={user.displayName} />
     
      ): (
        <h3>Login to Upload Image</h3>
      )}
       <Modal
      open={openSignIn}
      onClose={() => setOpenSignIn(false)}>
      <div style={modalStyle} className={classes.paper}>
      <h2></h2>
      <form className="app__signup">
      <center>
      <img 
        className="app_headerImage" 
        src={logo1} />

<Input 
      placeholder="email" 
      type="text" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      
      <Input 
      placeholder="password" 
      type="password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button type="submit" onClick={signIn}>Login</Button>
      </center>
      </form>
    </div>
      </Modal>

   
      <Modal
      open={open}
      onClose={() => setOpen(false)}>
      <div style={modalStyle} className={classes.paper}>
      <h2></h2>
      <form className="app__signup">
      <center>
      <img 
        className="app_headerImage" 
        src={logo1} />

      <Input 
      placeholder="username" 
      type="text" 
      value={username} 
      id="id_username"
      onChange={(e) => setUsername(e.target.value)
       
      }
      /> 
      <br />
      <Input 
      placeholder="email" 
      type="text" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <Input 
      placeholder="password" 
      type="password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button type="submit" onClick={signUp}>Sign Up</Button>
      </center>
      </form>
    </div>
      </Modal>
<div className="app__header">
<img 
className="app_headerImage" 
src={logo1} />
</div>
<h1>You got it, Girrl!</h1>
<p>Let's build instagram clone!</p>
{ user? (
  <Button onClick={() => auth.signOut()}> Logout</Button>
):
<div className="app__loginContainer">
<Button onClick={() => setOpenSignIn(true)}>Log In</Button>
<Button onClick={() => setOpen(true)}>Sign Up</Button>

</div>
}
 
      {/* urls from public 
      <Post username="NaazWeb" caption="You're doing great!" imageUrl="/images/postimg.png" />
      <Post username="Faique" caption="Dank!" imageUrl="/images/postimg2.jpg"/> 
      <Post username="Greta" caption="Awesome!"  imageUrl="/images/postimg3.png"/>
      <Post />
      <Post />
*/}

      {  //id refresh only once
        posts.map(({id,post}) => (
          <Post key={id} username={post.username} caption = {post.caption} imageUrl = {post.imageUrl}/>
        ))
      }
    </div>
  ); 
}

export default App;



