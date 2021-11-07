
import { firestore, storage } from '../../config/firebase'
import * as types from '../types/postTypes'
import { toast } from 'react-toastify'



// actions

const setLoading = data =>({
    type: types.SET_LOADING,
    payload: data,
})

const addPost = data =>({
    type: types.ADD_POST,
    payload: data
})


const getPosts =(data) =>({
type: types.SET_POSTS,
payload: data
})

const resetPosts = ()=>({
    type: types.RESET_POSTS,
})

const addComment = (data) =>({
    type: types.ADD_COMMENT,
    payload: data,
});

const addReply = (data) =>({
    type: types.ADD_REPLY,
    payload: data,
});

const deleteComment = (data) =>({
    type: types.DELETE_COMMENT,
    payload: data,
});

const updatePost = (data) =>({
    type: types.UPDATE_POST,
    payload: data,
});

const deletePost = (data) =>({
    type: types.DELETE_POST,
    payload: data,
});




// action creators

export const doPost = (data,image, setProgress)=> dispatch=>{
    firestore.collection("posts").add(data).then(async res=>{
        const document = await res.get()
        const postData = {data: document.data(), id: document.id}
        const uploadRef = storage.ref(`posts/${document.id}`)
        uploadRef.put(image).on("state_change",(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/ snapshot.totalBytes)*100)
            setProgress(progress);

        },(err)=>{
            console.error(err)
        },async ()=>{
            const url = await uploadRef.getDownloadURL();
            firestore.collection("posts").doc(document.id).update({
                image:url
            }).then(()=>{
                postData.data.image = url;
                dispatch(addPost(postData));
                toast.success("Post created successfully")
            }).catch(err=>{
                console.log(err)
            })

        })
    }).catch(err=>{
        console.log(err)
    })
    //    
//     add the post and pass the callback
}

 export const fetchPosts = ()=> dispatch=>{
     dispatch(setLoading(true))
     firestore.collection('posts').get().then((posts)=>{
        const allPosts = [];
        posts.forEach((post)=>{
            const data = {postData: post.data(), postId: post.id};
            allPosts.push(data);
        });
        dispatch(getPosts(allPosts))
        dispatch(setLoading(false))
     }).catch(err=>{
         
        toast.error(err) 
     })
 }


//   update post 

export const updatePostData = (postId, prevPost, data)=> (dispatch)=>{
    const {title, description} = data;
    prevPost.postData.title = title;
    prevPost.postData.description = description;
    
    firestore.collection("posts").doc(postId).update({
        title,description
    }).then(()=>{
        dispatch(updatePost({postId, updatedPost: prevPost}))
        toast.success("Successfully updated the post")
    }).catch((err)=> {
        console.log(err) ;
         toast.error("Something went wrong")
    })

};

// Delete postId

export const removePost =(postId, imgUrl)=> (dispatch)=> {
    //  delete post and image logic
    storage.refFromURL(imgUrl).delete().then(()=>{
        firestore.collection("posts").doc(postId).delete().then(()=>{
            dispatch(deletePost({postId}))
            toast.success("Successfully deleted post!")
        }).catch((err)=> {
            toast.error("Something went wrong");
            console.log(err)
        })
       
    }).catch((err)=> {
        toast.error("Something went wrong");
        console.log(err)
    })
}


//  for comments

export const doComment = (comment, postId, prevComments) => dispatch=>{
//  update the data in firebase 

const oldComments = prevComments;
oldComments.push(comment);

firestore.collection("posts").doc(postId).update({ 
   comments: oldComments,
}).then(() =>{
//  dispatch the data to the redux 
toast.success("Comment added successfully")
dispatch(addComment({comment, postId}));

}).catch(err => toast.error(err))



}

export const removeComment = (index, postId, prevComments) => (dispatch)=>{
    //  update the data in firebase 
    
    const filteredComments = prevComments.filter((cmt, id)=> id !== index);
 
    
    
    firestore.collection("posts").doc(postId).update({ 
       comments: filteredComments, 
    }).then(() =>{
    //  dispatch the data to the redux 
    toast.success("Comment deleted successfully")
    dispatch(deleteComment({index, postId}));
    
    }).catch(err => toast.error(err))
    
    
    
    }


//  do reply 


export const doReply = (reply, postId, prevComments, index) => (dispatch)=>{
    //  update the data in firebase 
    
   const oldComments = prevComments;
   const replies = oldComments[index].replies;
   replies.push(reply);
   oldComments[index].replies = replies;
    
    
    firestore.collection("posts").doc(postId).update({ 
       comments: oldComments,
    }).then(() =>{
    //  dispatch the data to the redux
    toast.success("Reply added successfully") 
    
    dispatch(addReply({oldComments, postId}));
    
    }).catch((err) => toast.error(err))
    
};