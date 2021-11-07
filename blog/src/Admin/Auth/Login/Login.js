import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../../config/firebase'
import { loginUser } from '../../../redux/actionCreators/authActionCreators'



const Login = () => {
    
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!email || !pass) return toast.info("Please fill in all fields")
        
        
        if(pass.length < 8 ) return toast.info("Password must be of length 8 or greater") 
    
        auth.signInWithEmailAndPassword(email, pass).then(user=>{
            const data = {
                user: user.user.providerData[0],
                id: user.user.uid
            };
            dispatch(loginUser(data))
            toast.success("You are successfully logged in")
            history.push('/admin/dashboard')
        }).catch(err=>{
            toast.error("Invalid email or password")
        })
    }
    return (
        <Container>
        <Row>
        <h1 className="text-dark font-weight-bold text-center py-5">Blogs </h1>
            <Col md={4} sm={12} xm={12} className="mx-auto my-5 p-3">
     <Form onSubmit={handleSubmit}>
    
     <Form.Group controlId={"fullEmailBasicForm"} className="mt-1">
     <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
     </Form.Group>
     <Form.Group controlId={"fullPasswordBasicForm"} className="mt-1">
     <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=> setPass(e.target.value)}/>
     </Form.Group>
    
     <Form.Group controlId={"fullSubmitBasicForm"} className="mt-5">
     <Button  type="submit" variant="dark" bg='dark' className='form-control'>Login</Button>
     </Form.Group>
        
         
        
       



       
     </Form>
            </Col>
        </Row>
     </Container>
    )
      
}

export default Login
