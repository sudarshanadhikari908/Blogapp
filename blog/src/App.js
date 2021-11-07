import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Admin from './Admin';
import Home from './Components/Home/Home';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';
import Posts from './Components/Posts/Posts';
import SeePost from './Components/SeePost/SeePost';
import SubNavbar from './Components/SubNavbar/SubNabvar';
import { auth } from './config/firebase';
import { loginUser } from './redux/actionCreators/authActionCreators';
import { fetchPosts } from './redux/actionCreators/postActionCreators'

function App() {

  
  const dispatch = useDispatch()

const {isLoggedIn,isLoading} =useSelector(state=> ({
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.post.isLoading
    }), shallowEqual);
  useEffect(()=>{
    if(isLoading) {
      dispatch(fetchPosts())
    }

  }, [isLoading, dispatch])

  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      
        const data  = {
            user: user.providerData[0],
            id: user.uid
        };
        dispatch(loginUser(data))
     
    })
},[])
  return (
    <div className="App">
    <ToastContainer/>
     <Switch>
    <Route exact path='/' >
    {isLoggedIn && 
    <SubNavbar/>
    }
  
    <NavbarComponent/>
    <Home/>
    </Route>

    <Route exact path='/posts' >
    {isLoggedIn && 
    <SubNavbar/>
    }
  
    <NavbarComponent/>
    <Posts/>
    </Route>
    <Route path='/post/:postId' component={SeePost}/>
    <Route path ='/admin' component={Admin}/>


     </Switch>
    </div>
  );
}

export default App;
