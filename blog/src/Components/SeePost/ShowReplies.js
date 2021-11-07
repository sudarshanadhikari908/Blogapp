import React, {useState} from 'react'

const ShowReplies = ({allReplies}) => {

    const[replies, setReplies] = useState(false)

    return (
        <>
        <p className="mt-2">Replies</p>

        {allReplies.length > 0 ? (

            replies && (
            <div className="w-100 my-4">
            {allReplies.map((reply, index)=>(
    <div key={index * 45464213} className='w-100 card  my-2  px-5 py-3'>
       <div className='w-100 d-flex align-items-center justify-content-between'>
      <div className=' d-flex'>
      <p className='my-0 text-capitalize text-white bg-dark py-2 px-3 rounded-circle me-4'>
           {reply.name[0]}
       </p>
       <div>
          <p className='my-0 card-title'>    {reply.name} </p> 
          <p className='my-0 card-text small'>    {reply.email} </p> 
       </div>
    
      </div>
      <div className='d-flex gap-1 align-items-center justify-content-end'>
          {
             reply.admin && (
              <p className='bg-dark text-white py-1 px-2'>Admin</p> 
             )}

             {
             reply.postOwner && (
              <p className='bg-dark text-white py-1 px-2'>Author</p> 
             )}
      </div>


       
       </div>
       <p className='my-4'>{reply.reply}</p>
     
        
    </div>
))}
            </div>
            )
             ): (
                <div className="w-100">
                    <p className="text-center my-0">No replies</p>
                </div>
             )}
             { allReplies.length > 0 && (
                <button className="btn tet-primary mt-4 " onClick ={()=> setReplies((prevReplies) => !prevReplies)}>
                {
                    replies ? "Hide" : "View"
                }{allReplies.length}reply(s)
            </button>
              ) }
              
          
        </>
    )
}

export default ShowReplies
