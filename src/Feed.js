import React, {useEffect, useState} from 'react'
import './Feed.css'
import InputOption from './InputOption';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Post from './Post';
import {db} from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
import { Avatar } from '@mui/material';


function Feed() {

  const user = useSelector(selectUser);
  const [input, setInput] = useState(''); //empty string
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    db.collection("posts")
    .orderBy("timestamp", "desc")  //orders the posts by timestamps in descending order
    .onSnapshot(snapshot => (
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ))
  }, []) //renders once whenever the feed goes off

  const sendPost = e => {  // e - short for event
    e.preventDefault();    //when we hit enter on the input it prevents it from refreshing

    db.collection('posts').add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //works for different timestamps, uses server timestamp instead
    })
    setInput("");  //will clear the text after we hit enter
  }

  return (
    <div className='feed'>
      <div className="feed__inputContainer">
        <div className="feed__inputProfile">
        <Avatar src={user.photoUrl} className='feed__inputAvatar' sx={{height: 50, width: 50}}>
          {user.email[0]}
        </Avatar>
        <div className="feed__input">
          <form>
            <input value = {input} onChange ={e => setInput(e.target.value)} type='text' placeholder='Start a post' />
            {/*everytime the user types in, it fires an event, sets input to e.target.value */}
            <button onClick={sendPost} type='submit'>Send</button>
          </form>
        </div>
        </div>
        <div className="feed__inputOptions">
            <InputOption Icon={ImageOutlinedIcon} title="Media" 
            color="#70B5F9" />
            <InputOption Icon={CalendarMonthIcon} title="Event" 
            color="#e7a33e" />
            <InputOption Icon={ArticleOutlinedIcon} title="Write article" 
            color="#e06847" />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
      {posts.map(({id, data: {name, description, message, photoUrl}}) => (
        <Post 
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl} />
      ))}
      </FlipMove>
    </div>
  )
}

export default Feed;