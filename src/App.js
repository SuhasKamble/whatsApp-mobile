import React, { useState } from 'react'
import Sidebar from './Sidebar'
import './App.css'
import Chat from './Chat'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch] = useStateValue()
  return (
    <div className="app">
      <div className="app__body">
        {user?(
 <BrowserRouter>
<Switch>
 <Route exact path="/">
   
 <Sidebar/>
 </Route>
 <Route exact path="/rooms/:roomId">
<Chat/>
 </Route>
</Switch>
</BrowserRouter>
        ):(
          <Login/>
        )}
       
       
      </div>
    </div>
  )
}

export default App;
