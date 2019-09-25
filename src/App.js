import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'

import Home from './pages/Home'
import Event from './pages/Event'
import Login from './pages/Login'
import Destinos from './pages/Destino'
import business from './pages/Business'
import NotFound from './pages/NotFound'
import Logout from './Components/Logut'
import Header from './Components/Header';

// componentes de user
import MyEvents from './Components/MyEvents'
import CreateEvent from './Components/CreateEvent'
import CreateBusines from './Components/CreateBusines'
import MyBusiness from './Components/MyBusiness'
import EditBusines from './Components/EditBusines'
import EditEvent from './Components/EditEvent'

const isLoging= () => {
    const user = localStorage.getItem('myData')
    return (user) ? true : false
}

const verificarLogin = () => {
    return (isLoging()) ? <Redirect to='/' />: <Login/> 
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLoging() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
 

const App = () => (
    <BrowserRouter>
    <Route component={Header} />
    <Switch>
       
        <Route exact path="/Event" component={Event} /> 
        <Route exact path="/Destinos" component={Destinos} />
        <Route exact path="/Comercios" component={business} />
        <Route exact path="/Login" render={ () => verificarLogin(Login) } />
        <Route exact path="/Logout" component={Logout}/>
        <PrivateRoute path='/mis-comercios/:id' component={EditBusines} />
        <PrivateRoute path='/mis-comercios' component={MyBusiness} />
        <PrivateRoute path='/mis-eventos/:id' component={EditEvent} />
        <PrivateRoute path='/mis-eventos' component={MyEvents} />
        <PrivateRoute path='/crear-comercio' component={CreateBusines} />
        <PrivateRoute path='/crear-evento' component={CreateEvent} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound}/> 
    </Switch>
</BrowserRouter>
)

export default App
