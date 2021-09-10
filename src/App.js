import React from 'react'

import { getAllGames } from './lib/api'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { isAuthenticated } from './lib/auth'

import NavigationBar from './components/common/NavigationBar'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/common/Dashboard'

function App() {

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())

  React.useEffect(() => {
    const getData = async () => {
      const res = await getAllGames()
      console.log(res.data)
    }
    getData()
  })


  return (
    <BrowserRouter>
      <NavigationBar 
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home /> 
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard"> 
          <Dashboard 
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
