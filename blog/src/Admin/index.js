import React, { useEffect } from 'react'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Dashboard from './Dashboard';
import { loginUser } from '../redux/actionCreators/authActionCreators';
import { toast } from 'react-toastify';


const Admin = () => {
    const {path} = useRouteMatch()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user === null){
                // user is not logged in
                history.push('/admin/login');
                return
            }
            const data  = {
                user: user.providerData[0],
                id: user.uid
            };
            dispatch(loginUser(data))
            history.push('/admin/dashboard');
        })
    },[])
    return (
        <Switch>
        <Route exact path={path} component={()=> <h1>Admin Route</h1>}/>


        <Route path={`${path}/login`} component={Login} />
        
        <Route path={`${path}/dashboard`} component={Dashboard} />
    </Switch>
)
    
}

export default Admin
