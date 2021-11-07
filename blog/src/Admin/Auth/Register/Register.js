import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { auth } from '../../../config/firebase'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux/actionCreators/authActionCreators'
import { useHistory } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const dispatch = useDispatch()
   
    const history = useHistory()

 

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!email || !pass || !fullName || !confirmPass) return toast.info("Please fill in all fields")
        
        if(pass.length < 8 ) return toast.info("Password must be of length 8 or greater") 

        if(pass !== confirmPass) return toast.info("Passwords do not match!")
//  Register the users
auth.createUserWithEmailAndPassword(email,pass).then(()=>{
    
    auth.currentUser.updateProfile({
        displayName: fullName
    }).then(()=>{
        const user = auth.currentUser
        
         //  add data to redux
        const data = {
            user: user.providerData[0],
            id: user.uid
        };
        dispatch(loginUser(data))
        toast.success("You have registered and logged in successfully")
        history.push('/admin/dashboard')
    }).catch(err => console.log(err))
   

}).catch(err => console.log(err))
   
    }

    return (
        <Container>
           <Row>
           <h1 className="text-dark font-weight-bold text-center py-5">Blogs </h1>
               <Col md={4} sm={12} xm={12} className="mx-auto my-5 p-3">
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId={"fullNameBasicForm"}>
        <Form.Control type="text" placeholder="Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId={"fullEmailBasicForm"} className="mt-1">
        <Form.Control type="email" placeholder="Email" value ={email} onChange={(e)=>setEmail(e.target.value)}/> 
        </Form.Group>
        <Form.Group controlId={"fullPasswordBasicForm"} className="mt-1">
        <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=> setPass(e.target.value)} />
        </Form.Group>
        <Form.Group controlId={"fullConfirmPassBasicForm"} className="mt-1">
        <Form.Control type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e)=> setConfirmPass(e.target.value)} />
        </Form.Group>
        <Form.Group controlId={"fullSubmitBasicForm"} className="mt-5">
        <Button  type="submit" variant="dark" bg='dark' className='form-control'>Register</Button>
        </Form.Group>
           
            
           
          

 

          
        </Form>
               </Col>
           </Row>
        </Container>
    )
}

export default Register
