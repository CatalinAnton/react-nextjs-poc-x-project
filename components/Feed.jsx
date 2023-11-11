'use client';

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import PromptCard from './PromptCard';

const PromptCardList = ({posts, handleTagClick}) => {
  console.log(posts);
  return <>
    <div className='mt-16 prompt_layout'>
      {posts.map(post => {
        return <>
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        </>
      })}
    </div>
  </>
}

const Feed = () => {
  const {data: session} = useSession();
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (event => {
    setSearchText(event.target.value);
    console.log('setting search text..')
  });

  const fetchPosts = async () => {
    const res = await fetch('/api/post');
    const responsePosts = await res.json();
    setPosts(responsePosts);
    console.log('fetching posts...')
  }

  useEffect(()=> {
    fetchPosts();
  }, [searchText]);

  return (
    <>
      <div>Feed</div>
      <div className='flex flex-col'>
        <div>
          <p className='break-words flex justify-center'>
            <span>
              session is 
            </span>
            <span>
              { session?.user?.name }
            </span>
          </p>
        </div>
        

        <section>
              <p> posts here: {JSON.stringify(posts)}</p>
        </section>
        <section
          className='feed'
        >
          <form className='relative w-full flex-center flex-col'>
            <input type="text" 
              placeholder='search...'
              onChange={handleSearchChange}
              required
              value={searchText}
              className='search_input peer'
            />
            <p>{searchText}</p>
          </form>

          <PromptCardList
            posts={posts}
            handleTagClick={()=>{}}
          />
        </section>
        
        
      </div>
    </>
    
  )
}

export default Feed