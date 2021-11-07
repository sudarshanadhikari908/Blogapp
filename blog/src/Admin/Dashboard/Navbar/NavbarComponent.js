import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'


const NavbarComponent = ({logout}) => {
    const {isLoggedIn, user} =useSelector(state=> ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    }), shallowEqual);
    return (
        <Navbar bg='dark' variant={"dark"} className='navbar-dark'>
        <Navbar.Brand as={Link} style={{marginLeft: '10%'}} to='/admin/dashboard'>
        Admin Panel
        </Navbar.Brand>  
           <Nav>
            <Nav.Item>
                <Nav.Link as={NavLink} exact to='/admin/dashboard'>
                    Home
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={NavLink} exact to='/admin/dashboard/addPost'>
                    Add Post
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={NavLink} exact to='/admin/dashboard/posts'>
                    Posts
                </Nav.Link>
            </Nav.Item>
           </Nav> 

           <div className='col-md-3 d-flex align-itens-center justify-content-end' style={{marginLeft: "auto", marginRight: '5%'}}> 
           {
            isLoggedIn && <>
            <p className='text-white h-100 my-0'>Welcome, <span style ={{ fontWeight: 'bold'}} > {user.displayName} </span> </p>
            &nbsp;&nbsp;
            <Button variant ='success bg-success' size='sm' onClick={()=> logout()}> Logout</Button>
            </>

           }
           </div>      
        </Navbar>
    )
}

export default NavbarComponent
