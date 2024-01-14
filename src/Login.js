import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import "./Login.css"
import { login } from './features/userSlice';
import { auth } from './firebase';

function Login() {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[name, setName] = useState("");
  const[profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();  //dispatch allows us to shoot actions into the data layer

  const loginToApp = (e) => {
      e.preventDefault();    // to not refresh

      auth.signInWithEmailAndPassword(email, password)
      .then(userAuth => {
        dispatch(login({
          email: userAuth.user.email,                // email that comes back from firebase
          uid: userAuth.user.uid,                    // same for userid
          displayName: userAuth.user.displayName,
          photoUrl: userAuth.user.photoURL,                         
        }))
      }).catch((error) => alert(error));
  };
  const register = () => {
      if(!name){
        return alert("Please enter a full name!") //if user has not filled the name and hits enter we get an alert
      }

      auth.createUserWithEmailAndPassword(email, password) // pass in th email and password
      .then((userAuth)=>{                                  // if user is created successfully
        userAuth.user.updateProfile({                      // then go inside user and update their profile
          displayName: name,                               // displayName - firebase keys, name - local name //updates the profile
          photoURL: profilePic,
        })
        .then(()=>{
            dispatch(login({                               // puts the user into the data layer //import login from userSlice
                email: userAuth.user.email,                // email that comes back from firebase
                uid: userAuth.user.uid,                    // same for userid
                displayName: name,                         // name is our state name
                photoUrl: profilePic,
            }))
        })
      })
      .catch((error) => alert(error));           // catch the error at any point of the first then block
  };

  return (
    <div className="login" >
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" 
      alt="" 
      />
      <form>
        <input 
        value={name}
        onChange={(e)=>setName(e.target.value)} // mapping the name
        placeholder="Full name (required if registering)" 
        type="text" />

        <input 
        value={profilePic}
        onChange={(e)=>setProfilePic(e.target.value)}
        placeholder="Profile pic URL (optional)" 
        type="text" />

        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} //mapping the email
        placeholder="Email" 
        type="email" />

        <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)} //mapping the password
        placeholder="Password" 
        type="password" />

        <button type="submit" onClick={loginToApp} >Sign In</button> {/*type="submmit means when we hit enter it will submit" */}
      </form>
      <p>Not a member?{" "}
        <span className="login__register" onClick={register} >Register Now</span>
      </p>
    </div>
  )
}

export default Login