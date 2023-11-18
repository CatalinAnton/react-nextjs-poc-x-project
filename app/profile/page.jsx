'use client';

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const profileId = searchParams.get('id') || session?.user.id;
    const isMyProfile = profileId === session?.user.id;

    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${profileId}/posts`);
        const responsePosts = await res.json();
        setPosts(responsePosts);
        console.log('fetching posts...')
      }
    
    const fetchProfile = async () => {
        const res = await fetch(`/api/users/${profileId}`);
        const currentProfile = await res.json();

        if (currentProfile) {
            setProfile(currentProfile);
        }
    }
    
    useEffect(()=> {
        if (profileId) {
            fetchPosts();
            fetchProfile();
        }
    }, []);


    // maybe async? idk
    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const res = await fetch(`/api/post/${post._id.toString()}`, {
            method: 'DELETE'
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id );
        setPosts(filteredPosts);

        console.log('deleting post...');
        console.log(res);
    }

  return (
    <div>
        {JSON.stringify(profile)}
        <Profile 
            name={isMyProfile ? 'My' : profile?.username}
            desc="Welcome to your personalized profile page"
            posts={posts}
            isMyProfile={isMyProfile}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    </div>
  )
}

export default ProfilePage