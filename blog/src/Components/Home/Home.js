import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector, shallowEqual } from 'react-redux'
import PostCard from '../PostCard/PostCard'

const Home = () => {

    const {postLoading, posts} = useSelector(state => ({
            postLoading: state.post.isLoading,
            posts: state.post.posts
    }), shallowEqual)
    return (
        <Container>
           <Row className='gap-2'>
           <Col md={6} className='mt-5 mb-4 border-bottom'>
          <Col md={4}> 
          <p className='py-3 text-center px-3 bg-dark text-white'>Latest Posts</p>
          </Col>
         
           </Col>

               <Col md={6} className='mt-2 mb-5'>
               {
                   postLoading ? (
                       <h1 className="text-center my-5"> Loading... </h1>
                   ): (
                       posts.slice(0,5).map((pst, index)=>(
                       <PostCard pst={pst} key={index} index={index}/>
                   ))
                   )}
               
                
               </Col>
           </Row>
        </Container>
    )
}

export default Home
