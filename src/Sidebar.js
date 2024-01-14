import React, { useState } from 'react'
import './Sidebar.css'
import { Avatar } from '@mui/material'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function Sidebar() {
  const [recentOpen, setRecentOpen] = useState(false);
  const [hashtagOpen, setHashtagOpen] = useState(false);
  const user = useSelector(selectUser); // this gets us the user from the redux store
  //useSelector is a hook 

  const toggleRecent = () =>{
    setRecentOpen(!recentOpen);
  }
  const toggleHashtag =()=>{
    setHashtagOpen(!hashtagOpen);
  }

  const recentItem = (topic) =>(
    <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
      </div>
  );
  
  return (
    <div className='sidebar'>
      <div className="sidebar__top">
        <img src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="" />
        <Avatar src={user.photoUrl} className='sidebar__avatar' sx={{ width: 72, height: 72}}>
          {user.email[0]} {/* Uses the first character as the avatar */}
        </Avatar>
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Profile viewers</p>
          <p className='sidebar__statNumber'>5</p>
        </div>
        <div className="sidebar__stat">
          <p>Connections</p>
          <p className='sidebar__statNumber'>65</p>
        </div>
        <div className="sidebar__grow">
          <p>Grow your network</p>
        </div>
      </div>

      <div className="sidebar__tools">
        <div className="sidebar__toolOne">
        <p>Access exclusive tools &amp; insights</p>
        </div>
        <div className="sidebar__toolTwo">
          <WorkspacePremiumIcon  className="sidebar__toolPremium" sx={{height: 24}} />
          <p>Try Premium for &#8377;0</p>
        </div>  
      </div>

      <div className="sidebar__items">
        <BookmarkIcon className='sidebar__itemBookmark' sx={{height: 24}}/>
        <p>My items</p>
      </div>

      <div className="sidebar__recent">
        <div className="sidebar__recentDropdown">
        <p>Recent</p>
        <button onClick={toggleRecent}>
         {!recentOpen && <KeyboardArrowDownIcon className='sidebar__recentArrow'/>} 
         {recentOpen && <KeyboardArrowUpIcon className='sidebar__recentArrow'/>}
        </button>
        </div>
        {recentOpen && recentItem('future')}
        {recentOpen && recentItem('careers')}
        {recentOpen && recentItem('economy')}
        {recentOpen && recentItem('markets')}
        {recentOpen && recentItem('branding')}
      </div>

      <div className="sidebar__groupEventhashtag">
        <div className="sidebar__groups">Groups</div>
        <div className="sidebar__events">
          <p>Events</p>
          <button>
            <AddIcon className="sidebar__addIcon" />
          </button>
        </div>
        <div className="sidebar__hashtags">
          <p>Followed Hashtags</p>
          <button onClick={toggleHashtag}>
          {!hashtagOpen && <KeyboardArrowDownIcon className='sidebar__recentArrow'/>} 
          {hashtagOpen && <KeyboardArrowUpIcon className='sidebar__recentArrow'/>}
          </button>
        </div>
        {hashtagOpen && recentItem('future')}
        {hashtagOpen && recentItem('careers')}
        {hashtagOpen && recentItem('economy')}
      </div>
      <div className="sidebar__discover">
        <div>Disocver more</div>
      </div>

    </div>
  )
}

export default Sidebar