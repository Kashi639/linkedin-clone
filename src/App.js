import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import Widgets from './Widgets';

function App() {
  const user = useSelector(selectUser)  //pull the user from the datastore, useSelector is a hook from react-redux.
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged(userAuth => {  //onAuthStateChanged - listener that listens to any authentication change
      if(userAuth){
        //user is logged in
        dispatch(login({
          email: userAuth.email,                // setiing the email,uid,.. in our redux store to the userAuth.email,uid that comes back
          uid: userAuth.uid,                    
          displayName: userAuth.displayName,                         
          photoUrl: userAuth.photoURL,
        }))
      } else{
        //user is logged out
        dispatch(logout());
      }
    })
  }, []) //[]- means empty dependency, meaning it only runs once

  return (
    <div className="app">
      <Header />

      {/*If user is not there, go to login page otherwise load the rest of the page */}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
      )}
     </div>
  );
}

export default App;
