import React, { forwardRef } from 'react'
import './Post.css'
import { Avatar } from '@mui/material'
import InputOption from './InputOption'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import SendIcon from '@mui/icons-material/Send';


const Post = forwardRef(({name, description, message, photoUrl}, ref) => {

  return (
    <div ref={ref} className='post'>
      <div className="post__header">
      <Avatar src={photoUrl}>
        {name[0]}
      </Avatar>
      <div className="post__info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      </div>
      
      <div className="post__body">
        <p>{message}</p>
      </div>

      <div className="post__buttons">
        <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" 
        color="gray" />
        <InputOption Icon={InsertCommentOutlinedIcon} title="Comment" 
        color="gray" />
        <InputOption Icon={RepeatIcon} title="Repost" 
        color="gray" />
        <InputOption Icon={SendIcon} title="Send" 
        color="gray" />
      </div>
    </div>
  )
})

export default Post