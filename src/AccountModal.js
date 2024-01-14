import React from 'react'
import './AccountModal.css';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { auth } from './firebase';

function AccountModal({className}) {
  const dispatch = useDispatch();
  const user= useSelector(selectUser);

  const logoutOfApp = () => {
    dispatch(logout()) // tells redux user is logged out, and UI on frontend will change
    auth.signOut();    // signs the user out
  }

  const Options = (list) => (
    <div className='accountModal__list' >{list}</div>
  );
  
  return (
    user && <div className='accountOverlay'>
    <div className={className}>
      <div className="accountModal__top">
        <div className="accountModal__topInfo">
          <Avatar src={user?.photoUrl} sx={{height: 60, width: 60}} className='accountModal__avatar' ></Avatar>
          <p>{user?.displayName}<br></br><span>{user?.email}</span></p>
        </div>
        <button>View Profile</button>
      </div>

      <div className="accountModal__account">
        <h4>Account</h4>
        <div className="accountModal__accountPremium">
          <WorkspacePremiumIcon className='accountModal_premiumIcon' />
          <p>Try Premium for &#8377;0</p>
        </div>
        {Options('Settings & Privacy')}
        {Options('Help')}
        {Options('Language')}
        </div>
        <div className="accountModal__manage">
          <h4>Manage</h4>
          {Options('Posts & Activity')}
          {Options('Job Posting Account')}
        </div>
        <div className="accountModal__signOut">
          <div className='accountModal__list' onClick={logoutOfApp} >Sign Out</div>
        </div>
    </div>
    </div>
  )
}

export default AccountModal