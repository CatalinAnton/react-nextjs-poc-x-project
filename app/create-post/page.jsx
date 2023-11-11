'use client';

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import Form from '@components/Form';

const CreatePost = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        msg: '',
        tag: '',
    });
    

    const createPost = async (e) => {
        console.log('creating post...');
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/post/new', {
                method: 'POST',
                body: JSON.stringify({
                    msg: post.msg,
                    userId: session?.user?.id,
                    tag: post.tag,
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log('error saving post');
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <>
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
        />
    </>
  )
}

export default CreatePost