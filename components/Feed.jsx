'use client';

import { useSession } from 'next-auth/react';

const Feed = () => {
  const {data: session} = useSession();
  return (
    <>
      <div>Feed</div>
      <div className='flex'>
        <p className='break-words flex justify-center'>
        session is 
          { JSON.stringify(session) }
        </p>
        
      </div>
    </>
    
  )
}

export default Feed