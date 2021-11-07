import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doComment } from '../../redux/actionCreators/postActionCreators';


const CommentForm = ({currentPost}) => {


    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [comment, setComment] =useState('')


    const {isLoggedIn, user} =useSelector(state=> ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth,
    }), shallowEqual);

    const dispatch = useDispatch()

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(isLoggedIn){
            if(!comment) return toast.dark("Please add a comment")

            const data ={
                admin: isLoggedIn,
                
                comment, 
                email: user.user.email,
                name: user.user.displayName,
                postOwner: currentPost.postData.createdBy === user.user_id,
                replies: [], 
                userId: user.user_id

            };
            dispatch(
                doComment(data, currentPost.postId , currentPost.postData.comments));
                setComment("");
            
        }else{
            if(!comment || !email || !name) return toast.dark("Please fill in all fields");

            const data ={
                admin: isLoggedIn,
                
                comment, 
                email,
                name,
                postOwner: false,
                userId: null,

            };
            dispatch(doComment(data, currentPost.postId , currentPost.postData.comments));
            setComment("");
            setName("");
            setEmail("");
        }


    }

    return (
        <Form className="w-100 pe-5" onSubmit={handleSubmit}>
    {
        isLoggedIn?( <div className="form-group mb-2">
        <textarea className="form-control" placeholder="Comments.." value={comment} onChange= {e=>setComment(e.target.value)}>

        </textarea>
        </div>):(<>
        <div className="form-group d-flex mb-2 gap-2">
        <input  type="text" className="form-control" placeholder="Name" value={name} onChange= {e=>setName(e.target.value)}/>
        <input  type="text" className="form-control" placeholder="Email" value={email} onChange= {e=>setEmail(e.target.value)}/>
        </div>


        <div className="form-group mb-2">
        <textarea className="form-control" placeholder="Comments.." value={comment} onChange= {e=>setComment(e.target.value)}>

        </textarea>
        </div>

        </>
        )
    }

    <div className="form-group d-flex mb-2 gap-2">
        <input  type="submit" className="form-control btn btn-primary" value="Add Comment"/>
       
        </div>
        </Form>
    )
}

export default CommentForm
