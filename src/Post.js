import React from 'react';
import postimg from './postimg.png';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Post({username,caption,imageUrl}) {
  return (
   <div className="post">
       <div className="post__header">
       <Avatar
       className="post__avatar"
       alt="Naazneen"
       src="/static/images/avatar/naazweb.png"
       />

        
       <h3>{username}</h3>
       {/* header*/}
       </div>
       <img className="post__image" src={imageUrl} />
       {/*image*/}
       <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
       {/* username, caption*/}
   </div>
  );
}

export default Post;