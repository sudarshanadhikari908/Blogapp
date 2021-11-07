
import React, {useState} from 'react'
import { Col, Container, Row, Button, Form, ProgressBar } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doPost } from '../../../redux/actionCreators/postActionCreators';




 const AddPost = () => {

    const {user, userId} = useSelector((state)=>({user: state.auth.user, userId:state.auth.user_id}),shallowEqual)
    const dispatch = useDispatch();

    const [title, setTitle] =useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [progress, setProgress] = useState(0)
    

    const handleSubmit =(e)=>{
        
        e.preventDefault();

        if(!title || ! category || !description ){
            return toast.warning("Please fill in all fields")
        }
        if(!image || image === undefined){
            return toast.warning("Please select an image")
        }
        if(description.length <100){
            return toast.warning("Description should be of atleast 100 characters")

        }
        if(title.trim().split(" ").length<2){
            return toast.info("Title should of atleast 2 words")
        }
        if(image.size > 5242880){
            return toast.info("Image size should be equal to or less than 5 MB ")
        }

        const data = {
            
            title: title,
            author: user.displayName,
            category: category.split(","),
            createdDate: new Date(),
            description: description,
            image:"",
            comments: [],
            createdBy: userId,


        }
        dispatch(doPost(data, image, setProgress))

    }

    return (
        <Container>
        <Row>
          <Col md ={12} style ={{textAlign: 'right'}} className='my-5'>
            <Button as={Link} to="/admin/dashboard" variant='dark' bg='dark' className=" mr-2">
              Go Back
            </Button>
          </Col>
          <Col  md= {12} className=" mb-3">
            <h1 className="display-3 text-dark text-center">Add Post</h1>
         
          
          </Col>
          <Col md={6} className=" mx-auto shadow" >{
              progress  > 0 && progress <100?
               <>
                <h1> Uploading Post {progress}%</h1> 
              <ProgressBar now={progress} max={100}/> 
              </>
              : progress === 100 ?   <>
                <h1> Post uploaded successfully</h1> 
            
              </>:
        
          <Form onSubmit={handleSubmit} className='p-4'>

            <Form.Group controlId='name' className='my-2'> 
            <Form.Control type='text' name='title' placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}>

            </Form.Control>

            </Form.Group>
          
            <Form.Group controlId='categories' className='my-2'>
            <Form.Control type='text' name='categories' placeholder="Categories[followed with commas for multiple]" value={category} onChange={(e)=>setCategory(e.target.value)}>

            </Form.Control>

            </Form.Group>
            <Form.Group controlId='desc' className='my-2'>
            
            <textarea  name ='desc' placeholder='Enter the Description' className='form-control' rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
           

            </Form.Group>

            <Form.Group controlId='file' className='my-2'>
            <Form.Control type='file' name='image'  onChange={(e)=>setImage(e.target.files[0])}>

            </Form.Control>

            </Form.Group>

            <Form.Group controlId='btn' className='my-2'>
           <Button className='form-control' type ="submit" variant='dark' bg='dark'>Add Post</Button>

            </Form.Group>
        </Form>
          }
          </Col>
         
        </Row>
      </Container>
    );
}

export default AddPost
