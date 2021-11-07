import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Col, Container,Row, Image  } from 'react-bootstrap'
import CommentForm from './CommentForm'
import ReplyForm from './ReplyForm'
import ShowReplies from './ShowReplies'
import { removeComment } from '../../redux/actionCreators/postActionCreators'


const SeePost = () => {

    const { postId } = useParams();
    const {isLoading, posts, isLoggedIn, user_id} =  useSelector((state) => ({ isLoading: state.post.isLoading, posts: state.post.posts, isLoggedIn: state.auth.isLoggedIn, user_id: state.auth.user_id}), shallowEqual)

    const dispatch = useDispatch()
    
    const currentPost = posts.length> 0 && posts.find((pst)=> pst.postId === postId)

    if(isLoading) {
        return(
        <Container>
            <Row>
                <Col>
                <h1 className="text-center my-5 display-2">Loading Posts....</h1>
                </Col>
            </Row>
        </Container>
        );
    }

    if(!isLoading &&  !currentPost){
        return(
        <Container>
            <Row>
                <Col>
                <h1 className="text-center my-5 display-2">No Post Found</h1>
                </Col>
            </Row>
           
        </Container>
         ) }

    return (
        <Container fluid style={{overflowX: 'hidden'}}>
        <Row>
            <Col md={12}>
                <Image
                style={{height:"650px", width:'100%'}}
                 src={currentPost.postData.image} 
                 alt={currentPost.postData.title}/>
            </Col>

        </Row>
        <Row className="align-items-center justify-content-between">
            <Col md={6} className='py-5 px-5'>
        <p className='display-3'>{currentPost.postData.title}</p>
            </Col>

            <Col md={5} className=' d-flex gap-1 align-items-center justify-content-end pr-5'>
            {
                currentPost.postData.category.map((cat, index)=>(
                    <p className='py-1 bg-primary text-white px-2 mr-3' key={index + 55}>{cat}</p>
                ))
            }
        
            </Col>
        </Row>
   
            <div className="d-flex">
<p className='card-text text-wrap overflow-hidden px-3 py-0 w-50 text-justify' style={{wordBreak: 'break-word',wordWrap: 'wrap'}}> {currentPost.postData.description} </p>
<div className='col-md-6'>
<CommentForm currentPost={currentPost} />
<div className='col-md-12 pe-5 mt-5'>
{currentPost.postData.comments.map((comment, index)=>(
    <div key={index * 9999} className='w-100 card my-2 border border-dark px-5 py-3'>
       <div className='w-100 d-flex align-items-center justify-content-between'>
      <div className=' d-flex'>
      <p className='my-0 text-capitalize text-white bg-dark py-2 px-3 rounded-circle me-4'>
           {comment.name[0]}
       </p>
       <div>
          <p className='my-0 card-title'>    {comment.name} </p> 
          <p className='my-0 card-text small'>    {comment.email} </p> 
       </div>
    
      </div>
      <div className='d-flex gap-1 align-items-center justify-content-end'>
          {
             comment.admin && (
              <p className='bg-dark text-white py-1 px-2'>Admin</p> 
             )}

             {
             comment.postOwner && (
              <p className='bg-dark text-white py-1 px-2'>Author</p> 
             )}
      </div>


       
       </div>
       <p className='my-4'>{comment.comment}</p>
       <ShowReplies allReplies={comment.replies}/>
      

       {/* reply form */}

       <ReplyForm comment={comment} currentPost={currentPost} index={index}/>
       {/* Delete comment  button*/}
       {

        isLoggedIn && currentPost.postData.createdBy  === user_id && (
            <button className="btn text-danger my-2 text-end" onClick = {()=> dispatch(removeComment(index, currentPost.postId, currentPost.postData.comments))}>Delete Comment</button>

        )}
        
    </div>
))}
  
</div>
</div>
</div>

           

           
        </Container>
    )
}

export default SeePost
