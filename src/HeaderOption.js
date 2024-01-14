import React from 'react';
import './HeaderOption.css';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function HeaderOption({avatar, Icon, title, onClick, dropDown, className}) {
  const user = useSelector(selectUser);
  return (
    <div onClick={onClick} className={className}>
        {Icon && <Icon className='headerOption__icon' />}

        {avatar && <Avatar className ='headerOption__icon' src={user?.photoUrl} sx={{height: 24, width: 24}}> {/* ?. - optional chaining which protects against undefined */}
          {user?.email[0]}
          </Avatar>}
         <div className="headerOption__title">
         <h3 className='headerOption__titleText'>{title}</h3>
         {dropDown && <box><ArrowDropDownIcon sx={{height: 20, width: 20}}/></box>}
         </div>
        
    </div>
  )
}

export default HeaderOption