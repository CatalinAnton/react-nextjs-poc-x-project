'use client';

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter()

    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const responsePosts = await res.json();
        setPosts(responsePosts);
        console.log('fetching posts...')
      }
    
    useEffect(()=> {
        if (session?.user?.id) {
            fetchPosts();
        }
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-post?id=${post.id}`)
    }

    const handleDelete = async (post) => {
        router.push(`/delete-post?id=${post.id}`)
    }

  return (
    <div>
        <Profile 
            name="My"
            desc="Welcome to your personalized profile page"
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    </div>
  )
}

export default MyProfile