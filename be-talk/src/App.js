import {useContext, useEffect, useState} from 'react'
import { Redirect, Router } from 'react-router';
import "./App.css"
import Header from './Header'
import LandingPage from './LandingPage'
import SignUp from './SignUp'
import Login from './Login'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import {AuthContextProvider} from './context/AuthContext'
import AuthContext from './context/AuthContext'
// import PrivateRoute from './PrivateRoute'
import Chat from './Chat'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Profile from './Profile';
import {IdContextProvider} from './context/IdContext'
import useLocalStorage from './hooks/useLocalStorage';
import {ContactsContextProvider} from './context/ContactsContext'
import {ConversationsContextProvider} from './context/ConversationsContext'
import {SocketContextProvider} from "./context/SocketContext"
import HowItWorks from './HowItWorks'

axios.defaults.withCredentials = true

function App() {

  const { loggedIn } = useContext(AuthContext)
  const [id, setId] = useLocalStorage('id')

  return (
      <BrowserRouter>
        <div className="App overflow-x-hidden">
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/reset" component={ForgotPassword}/>
            <Route path="/reset/:token" component={ResetPassword}/>
            <Route exact path="/how" component={HowItWorks}/>
            <Route path="/signup">
                {loggedIn === true ? <Redirect to="/chat"/> : <SignUp/>}
            </Route>
            <Route path="/login">
              {loggedIn === true ? <Redirect to="/chat"/> : <Login/>}
            </Route>
            
            <SocketContextProvider id={id}>
              <ContactsContextProvider>
                <ConversationsContextProvider id={id}>
                  <Route path="/chat">
                    {loggedIn === false ? <Redirect to="/login"/> : <Chat id={id}/>}
                  </Route>
                  <Route path="/profile">
                    
                    {loggedIn === false ? <Redirect to="/login"/> : <Profile ID={setId} showID={id}/>}
                  </Route>      
              </ConversationsContextProvider>
            </ContactsContextProvider>
          </SocketContextProvider>
          </Switch>
          </div>      
      </BrowserRouter>
  );
}

export default App;
