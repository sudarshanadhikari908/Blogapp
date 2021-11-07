import React from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../config/firebase'
import { logoutUser } from '../../redux/actionCreators/authActionCreators'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'
import Register from '../Auth/Register/Register'
import { Navbar } from 'react-bootstrap'
import NavbarComponent from './Navbar/NavbarComponent'
import AddPost from './AddPost/AddPost'
import AllPosts from './AllPosts/AllPosts'
import EditPost from './EditPost/EditPost'
import Home from './Home'



const Dashboard = () => {
    

    const dispatch = useDispatch()

    const {path} = useRouteMatch()
   
    const logout =()=>{
        auth.signOut();
        dispatch(logoutUser())
    }
    return (
        <>
        {
            !path.includes("addUser") && <NavbarComponent logout={logout}></NavbarComponent>
        }
        <Switch>
       
        
        <Route exact path={path}>
        <Home/>
        </Route>
     
            
       
       <Route path={`${path}/addPost`} component={AddPost}/>
       <Route path={`${path}/posts`} component={AllPosts}/>
       <Route path={`${path}/addUser`} component={Register}/>
       <Route path={`${path}/post/:postId/edit`} component={EditPost}/>
        
        </Switch>
        </>
    )
}

export default Dashboard
