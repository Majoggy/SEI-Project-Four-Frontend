import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SecureRoute from './components/common/SecureRoute'

import NavigationBar from './components/common/NavigationBar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/common/Dashboard'
import PlayerAdd from './components/common/PlayerAdd'
import GameAdd from './components/common/GameAdd'
import GameEdit from './components/common/GameEdit'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <Switch>
        <Route exact path="/">
          <Home /> 
        </Route>
        <SecureRoute path="/addplayer">
          <PlayerAdd />
        </SecureRoute>
        <SecureRoute path="/addgame">
          <GameAdd />
        </SecureRoute>
        <SecureRoute path="/editgame">
          <GameEdit/>
        </SecureRoute>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <SecureRoute path="/dashboard"> 
          <Dashboard/>
        </SecureRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
