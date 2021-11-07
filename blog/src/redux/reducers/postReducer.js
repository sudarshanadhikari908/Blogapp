
import * as types from '../types/postTypes' ;
const initialState = {
    isLoading: true,
    posts: [],
    
}

const postReducer = (state=initialState, {type, payload})=>{
switch(type){
    case types.SET_LOADING: 
        state ={...state, isLoading:payload}
        return state;
    case types.ADD_POST:
        state = {...state,posts:[...state.posts, payload]}    
        return state

    case types.SET_POSTS:
        state ={...state,posts:payload}
        return state
    
    case types.RESET_POSTS:
        state = initialState
        return state
    
    case types.ADD_COMMENT: 
        const findPost = state.posts.find((pst) => pst.postId === payload.postId);
        const comments = findPost.postData.comments;
        comments.push(payload.comment)
        findPost.postData.comments = comments;
        state ={ ...state, posts: state.posts.map((pt)=>pt.postId === payload.postId ? findPost : pt),
        
        };
        return state

    case types.DELETE_COMMENT: 
        const currentPost = state.posts.find((pst) => pst.postId === payload.postId);
        const filteredcomments = findPost.postData.comments.filter((cmt, index)=> parseInt(index) !== parseInt(payload.index));
        
        currentPost.postData.comments = filteredcomments;
        state ={ ...state, posts: state.posts.map((pt)=>pt.postId === payload.postId ? findPost : pt),
        
        };
        return state

    case types.ADD_REPLY: 
    const oldPost = state.posts.find((pst) => pst.postId === payload.postId);
    
    oldPost.postData.comments = payload.oldComments;
    
        state ={ ...state, posts: state.posts.map((pt)=>pt.postId === payload.postId ? oldPost : pt),
        
        };
        return state

    case types.UPDATE_POST:
        const updatedPosts = state.posts.map((pst) => pst.postId === payload.postId ? payload.updatedPost : pst);
        state = { ...state, posts: updatedPosts}
        return state;

    case types.DELETE_POST:
        const filteredPosts = state.posts.filter((pst) => pst.postId === payload.postId)
        state ={...state, posts: filteredPosts}
        return state;


    default: 
        return state
}


}

export default postReducer;