import React, {useState} from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { doReply } from '../../redux/actionCreators/postActionCreators'


const ReplyForm = ({comment, currentPost, index}) => {


    const [openReplyForm, setOpenReplyForm] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [reply,setReply] = useState("")

    const {isLoggedIn, user} =useSelector(state=> ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth,
    }), shallowEqual);

    const dispatch = useDispatch()

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(isLoggedIn){
            if(!reply) return toast.dark("Please add a comment")

            const data ={
                admin: isLoggedIn,
                
                reply, 
                email: user.user.email,
                name: user.user.displayName,
                postOwner: currentPost.postData.createdBy === user.user_id,
                replies: [], 
                userId: user.user_id

            };
            dispatch(
                doReply(data, currentPost.postId , currentPost.postData.comments, index));
                setReply("");
            
        }else{
            if(!reply || !email || !name) return toast.dark("Please fill in all fields");

            const data ={
                admin: isLoggedIn,
                
                reply, 
                email,
                name,
                postOwner: false,
                userId: null,

            };
            dispatch(doReply(data, currentPost.postId , currentPost.postData.comments, index));
            setReply("");
            setName("");
            setEmail("");
        }


    }

    return (
        <>

        {
            openReplyForm ? (
            <form onSubmit = {handleSubmit}>
        {isLoggedIn?( 
            <>
            
            <div className="form-group mb-2">
        <textarea placeholder="Do Reply..." className="form-control" value={reply} onChange={(e)=> setReply(e.target.value)}></textarea>
        </div>
        <div className="form-group mt-4">
                <button type="submit" className="btn text-primary me-3">Reply</button>
                <button type="buton" className="btn text-danger" onClick={()=> setOpenReplyForm(false)}>Cancel</button>
                 </div>
        </>
        ) : (
       <>
        <div className="form-group d-flex mb-2 gap-2">
        <input  type="text" className="form-control" placeholder="Name" value={name} onChange= {e=>setName(e.target.value)}/>
        <input  type="text" className="form-control" placeholder="Email" value={email} onChange= {e=>setEmail(e.target.value)}/>
        </div>


        <div className="form-group mb-2">
        <textarea placeholder="Do Reply..." className="form-control" value={reply} onChange={(e)=> setReply(e.target.value)}></textarea>
        </div>

        <div className="form-group mt-4">
                <button type="submit" className="btn text-primary me-3">Reply</button>
                <button type="buton" className="btn text-danger" onClick={()=> setOpenReplyForm(false)}>Cancel</button>
                 </div>
                 </>

       
        )}
        </form>
    

      
              )  :
             ( <p  onClick={()=> setOpenReplyForm(true)} className='btn text-primary text-start mt-5' style={{cursor: 'pointer'}}>Reply</p>
             )}
            
        </>
    )
}

export default ReplyForm
