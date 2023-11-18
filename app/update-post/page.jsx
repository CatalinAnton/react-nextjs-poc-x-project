'use client';
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePost = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        msg: '',
        tag: '',
    });
    const searchparams = useSearchParams();
    const postId = searchparams.get('id');

    useEffect(()=> {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`);
            const resJson = await response.json();

            setPost({
                ...post,
                msg: resJson.msg,
                tag: resJson.tag
            })
        }

        if (postId) {
            getPostDetails();
        }
    }, [postId])
    

    const updatePost = async (e) => {
        console.log('updating post...');
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    msg: post.msg,
                    tag: post.tag,
                })
            });

            if (response.ok) {
                router.push('/profile');
            }
        } catch (error) {
            console.log('error updating post');
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <>
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePost}
        />
    </>
  )
}

export default UpdatePost;