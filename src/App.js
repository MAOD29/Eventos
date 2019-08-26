import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import Event from './pages/Event'
import Login from './pages/Login'
import NotFound from './pages/NotFound'


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Event" component={Event} />
            <Route exact path="/Login" component={Login} />
            <Route component={NotFound}/> 
        </Switch>
    </BrowserRouter>
)

export default App
