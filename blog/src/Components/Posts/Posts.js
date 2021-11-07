import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector, shallowEqual } from 'react-redux'
import PostCard from '../PostCard/PostCard'

const Posts = () => {

    const {postLoading, posts} = useSelector(state => ({
            postLoading: state.post.isLoading,
            posts: state.post.posts
    }), shallowEqual)
    return (
        <Container>
           <Row >
           <Col md={12} className='mt-5 mb-4'>
         
          <p className='py-3 text-center px-3 bg-dark text-white'>All Posts</p>
        
         
           </Col>

             
           </Row>
           <Row  className='mt-2 mb-5'>
               {
                   postLoading ? (
                       <h1 className="text-center my-5"> Loading... </h1>
                   ): (
                       posts.map((pst, index)=>(
                           <Col md={6} key={index}>
                       <PostCard pst={pst}  index={index}/>
                       </Col>
                   ))
                   )}
               
                
               </Row>
        </Container>
    )
}

export default Posts
