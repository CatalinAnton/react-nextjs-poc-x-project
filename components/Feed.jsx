'use client';

import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PromptCard from './PromptCard';

const PromptCardList = ({posts, handleTagClick, handleProfileClick}) => {
  console.log(posts);
  return <>
    <div className='mt-16 prompt_layout'>
      {posts.map(post => {
        return <>
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleProfileClick={() => handleProfileClick(post.creator._id)}
          />
        </>
      })}
    </div>
  </>
}

const Feed = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (event => {
    let searchQuery = event.target.value;
    setSearchText(searchQuery);
    console.log('setting search text..');

    fetchPosts(searchQuery || null);
  });

  const handleTagClick = (tag) => {
    console.log('setting tag as search...')
    setSearchText(tag);
  }

  const handleProfileClick = (id) => {
    console.log('id is');
    console.log(id);
    router.push(`/profile?id=${id}`);
  }

  const fetchPosts = async (queryString) => {
    let res;

    if (queryString) {
      res = await fetch(`/api/posts?q=${queryString}`);
    } else {
      res = await fetch('/api/post');
    }

    const responsePosts = await res.json();
    setPosts(responsePosts);
    console.log('fetching posts...')
  }

  useEffect(()=> {
    fetchPosts();
  }, []);

  return (
    <>
      <div>Feed</div>
      <div className='flex flex-col'>
        {/* <div>
          <p className='break-words flex justify-center'>
            <span>
              session is 
            </span>
            <span>
              { session?.user?.name }
            </span>
          </p>
        </div> */}

        {/* <section>
              <p> posts here: {JSON.stringify(posts)}</p>
        </section> */}
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
            handleTagClick={handleTagClick}
            handleProfileClick={handleProfileClick}
          />
        </section>
        
        
      </div>
    </>
    
  )
}

export default Feed