import React, { useEffect } from 'react'
import { Card, Container, Row, Button } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchPosts, removePost } from '../../../redux/actionCreators/postActionCreators'


const AllPosts = () => {

  const { isLoading, posts, userId } = useSelector(
    (state) => ({
      isLoading: state.post.isLoading,
      posts: state.post.posts,
      userId: state.auth.user_id,
    }), shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchPosts())
    }

  }, [isLoading, dispatch])
  const myPosts = posts && posts.filter(pst=>pst.postData.createdBy === userId )
  return (
    <Container>
<Row className='my-5 px-5 gap-2'>
{
  isLoading ? <h1 className="text-center my-5">Loading...</h1>: posts.length<1 || myPosts.length <1 ? <h1 className="text-center my-5"> No Posts Found</h1>:
  myPosts.map((pst,index)=>(
    <Card className="col-md-5 mx-auto px-0" key={index}>
<Card.Img src={pst.postData.image}  alt={pst.postData.title}/>

<Card.Body>
  <Card.Title>
    {pst.postData.title}
  </Card.Title>
  <Card.Subtitle>
    {pst.postData.description.slice(0,100)}...
  </Card.Subtitle>
</Card.Body>
<Card.Footer className='bg-white'>
<div className="d-flex w-100 py-2 align-items-center justify-content-between">
    <p>Likes 0</p>
    <p className='py-1 px-2 bg-dark text-white'>{pst.postData.author}</p>
  </div>
  <Button type='button' variant='primary' bg='primary' className='form-control my-2' onClick ={()=> history.push(`/post/${pst.postId}`)}>
 See Post
  </Button>
  <div className="d-flex w-100 px-5 mb-5 py-2 align-items-center justify-content-end">
  <Button type='button' variant='outline-primary' bg='primary' className='mx-2'  onClick ={()=> history.push(`/admin/dashboard/post/${pst.postId}/edit`)}>
 Edit Post
  </Button>
   <Button type='button' variant='danger' bg='danger' onClick={() => dispatch(removePost(pst.postId, pst.postData.image))}>
 Delete Post
  </Button>
  </div>
</Card.Footer>

  </Card>
  ))
}
  
</Row>
    </Container>
  )
}

export default AllPosts
