import React from 'react'
import Link from 'next/link';

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  const postOnChangeHandler = (event) => {
    setPost({
      ...post,
      msg: event.target.value
    })
  }

  const tagOnChangeHandler = (event) => {
    setPost({
      ...post,
      tag: event.target.value
    })
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue-gradient'>
          {type + " "}
        </span>
        <span>
          Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your post with the whole world!
      </p>

      <form onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>Your Post</label>
        <textarea
          value={post.msg}
          onChange={ (e) => {
            postOnChangeHandler(e);
          }}
          required
          className='form_textarea'
          placeholder='Write  your post here...'
          name="" id="" cols="30" rows="10"></textarea>
        
        <label>Your Tag</label>
        <input
          value={post.tag}
          onChange={ (e) => {
            tagOnChangeHandler(e);
          }}
          required
          className='form_input'
          placeholder='#tag'
          ></input>

          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href="/" className='text-gray-500'>
              Cancel
            </Link>

            <button type="submit"
              className="bg-primary-orange px-5 py-1 rounded-full text-white"
              disabled={submitting}
            >
              Submit
            </button>
          </div>
      </form>
      <p>{JSON.stringify(post)}</p>
    </section>
  )
}

export default Form