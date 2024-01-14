import React from 'react'
import "./Widgets.css";
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

function Widgets() {
  const newsArticle = (heading, time, readers) => ( //function that returns news articles
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordOutlinedIcon sx={{height: 10, width: 10}} />
      </div>

      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{time}<span> &#183; </span>{readers}</p>
      </div>
    </div>
  ) 
    

  return (
    <div className='widgets'>
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon sx={{height: 20, width: 20}} />
      </div>

      {newsArticle("US visas galore for Indian students", "9m ago","13,630 readers")}
      {newsArticle("Rising stars of startup investment", "1d ago",'454 readers')}
      {newsArticle("Engineering jobs wired for growth", "3d ago",'719 readers')}
      {newsArticle("Why fintechs want to diversify", "1d ago",'393 readers')}
      {newsArticle("Indian healthcare's report card", "2d ago",'124 readers')}
    </div>
  )
}

export default Widgets