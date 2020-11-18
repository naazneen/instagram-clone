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

function About() {
  return (
   <div className="post">
       <div className="post__header">
      

        
       <h3>I am About</h3>
      </div>
    </div>
   
   
  );
}

export default About;