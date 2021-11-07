import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'


const NavbarComponent = () => {
  
    return (
        <Navbar bg='dark' variant={"dark"} className='shadow-lg'>
        <Navbar.Brand as={Link} style={{marginLeft: '10%'}} to='/admin/dashboard'>
       Simple Blog App
        </Navbar.Brand>  
           <Nav className="ms-auto me-5">
            <Nav.Item>
                <Nav.Link as={NavLink} exact to='/'>
                    Home
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={NavLink} exact to='/posts'>
                 Posts
                </Nav.Link>
            </Nav.Item>

            
           </Nav> 

           
        </Navbar>
    )
}

export default NavbarComponent
