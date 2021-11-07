import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'



const SubNavbar = () => {
    const {user} =useSelector(state=> ({
        
        user: state.auth.user
    }), shallowEqual);

    const history = useHistory()
    return (
        <Navbar bg='light' variant={"light"} >
       
           <Nav className="ms-auto me-5">
            <Nav.Item>
            <p className='h-100 my-0 me-3 mt-1'>Welcome, <span style ={{ fontWeight: 'bold'}} > {user.displayName} </span> </p>
            </Nav.Item>

            <Nav.Item>
            <Button variant ='success' bg='success'  size='sm' onClick={()=> history.push('/admin/dashboard')}> Admin</Button>
            </Nav.Item>

            
           </Nav> 

                
        </Navbar>
    )
}

export default SubNavbar
