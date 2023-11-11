'use client';
import PromptCard from '@components/PromptCard';

const Profile = ({name, desc, posts, handleEdit, handleDelete}) => {
  console.log('data is');
  console.log(posts)
  return (
    <>
      <section className='w-full'>
        <h1 className='head_text text-left '>
          <span className='blue_gradient'>{name} </span>
           Profile
        </h1>
        <p className='desc text-left'>{desc}</p>

        <div className='mt-10 prompt_layout'>
          {posts.length && posts.map(post => {
            return <>
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            </>
          })}
        </div>
      </section>
    </>
  )
}

export default Profile