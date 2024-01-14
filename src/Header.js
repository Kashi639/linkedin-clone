import React, { useEffect, useState } from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import AccountModal from './AccountModal';

function Header() {

  const [modalOpen, setModalOpen] = useState(false);
  const user= useSelector(selectUser);

  //Checks for clicks outside and closes the modal
  useEffect(()=>{
    const handleCloseModal = (e) =>{
      if((e.target.closest('.headerProfile')===null && e.target.closest('.accountModal')===null) && modalOpen===true){
        setModalOpen(!modalOpen);
      }
    }

    document.addEventListener('click', handleCloseModal);

    return ()=>{
      document.removeEventListener('click', handleCloseModal)
    }
  });

  const openModal = ()=>{
    if(user){
      setModalOpen(!modalOpen);    
    }
  }

  return (
    <div className='header'>
      <div className="header__left">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" />

        <div className="header__search">
            <SearchIcon className='header__searchIcon'/>
            <input placeholder="Search" type="text" />
            <p>Search</p>
        </div>
      </div>

      <div className="header__right">
            <HeaderOption Icon={HomeIcon} title ='Home' className='headerOption' />
            <HeaderOption Icon ={SupervisorAccountIcon} title='My Network' className='headerOption' />
            <HeaderOption Icon ={BusinessCenterIcon} title='Jobs' className='headerOption' />
            <HeaderOption Icon ={ChatIcon} title='Messaging' className='headerOption' />
            <HeaderOption Icon ={NotificationsIcon} title='Notifications' className='headerOption' />
            {user && <HeaderOption onClick={openModal} title='Me' avatar={true} dropDown={true} className='headerProfile' />}
            {modalOpen && <AccountModal className='accountModal' />}
            <div className='header__rightBusiness'>
              <HeaderOption Icon={MenuIcon} title='For Business' dropDown={true} className='headerOption' />
              <p>Try Sales<br></br>Navigator</p>
            </div>
      </div>
      
    </div>
  )
}

export default Header