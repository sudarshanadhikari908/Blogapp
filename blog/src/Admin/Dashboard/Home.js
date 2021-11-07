import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { shallowEqual,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Home = () => {
    const {posts, user_id} = useSelector((state)=> ({posts:state.post.posts, user_id: state.auth.user_id}), shallowEqual)
    const currentUserPosts =posts.filter(pst => pst.postData.createdBy === user_id )
    return (
        <Container>
        
            <Row className='flex-column mt-5'>
            <Col md={3} className='ms-auto mb-5'>
            <Link to='/' className='ms-2 btn btn-outline-primary'>Home</Link>
            <Link to='/admin/dashboard/addUser' className='ms-2 btn btn-dark'>Add User</Link>
                </Col>
                <Col md={8} className='d-flex gap-2 mt-5 mx-auto'>
                <Card className='mx-auto p-4 border text-center col-md-4'>
                    <Card.Body>
                        <Card.Title>
                            Total Posts
                        </Card.Title>
                        <h1 className='display-1'>{posts.length}</h1>
                    </Card.Body>
                </Card>

                <Card className='mx-auto p-4 border text-center col-md-4'>
                    <Card.Body>
                        <Card.Title>
                            My Posts
                        </Card.Title>
                        <h1 className='display-1'>{currentUserPosts.length}</h1>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
