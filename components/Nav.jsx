'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState([]);
    const handleGettingProviders = async () => {
        const response = await getProviders();

        console.log('setting providers');
        console.log(response);
        setProviders(response);
    }
    useEffect(() => {
        handleGettingProviders();
    }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link
            href="/"
            className='flex flex-center gap-2 w-100'
        >
            <Image
                src="/assets/images/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className='object-contain'
            ></Image>
        </Link>
        

        <div className="flex ">
            {session?.user ? (
                <div className='flex gap-x-2'>
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-post" className='black_btn'>
                            Create Post
                        </Link>
                    </div>
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/profile" className='black_btn'>
                            My Profile
                        </Link>
                    </div>
                    <button type="button" className='outline_btn' onClick={signOut}>
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image
                            src={session.user.image}
                            alt="profile"
                            width={37}
                            height={37}
                            className='rounded-lg'
                        ></Image>
                    </Link>
                </div>
            ) : <>
                <p>Guest</p>
                {
                    (providers &&
                        Object.values(providers).map(provider => {
                            console.log('each provider here')
                            return (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn ml-4'
                                    >
                                        Log In with {provider.name}
                                </button>
                            )
                    }))
                }
            </>
            }
        </div>
    </nav>
  )
}

export default Nav