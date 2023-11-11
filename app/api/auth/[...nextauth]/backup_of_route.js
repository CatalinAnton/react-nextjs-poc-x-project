import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session}) {
            try {
                console.log('connection to db... (session)');
                await connectToDB();
                const sessionUser = await User.findOne({
                    email: session.user.email
                });
        
                session.user.id = sessionUser?._id?.toString();
            } catch (error) {
                console.log('error trying to get user from db');
                console.log(error);
            }

            return session;
        }
    },
    async signIn({profile}) {
        try {
            console.log('connection to db... (from signin)');
            await connectToDB();
            // check if user already exists
            const userExists = await User.findOne( {
                email: profile.email
            });
            console.log('connected to db!');
            
            // otherwise create
            if (!userExists) {
                console.log('user doesnt exist in db');
                try {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                } catch (error) {
                    console.log('failed to create user, ', error);
                }
                
            }

            return true;
        } catch (error) {
            console.log('error trying to find the user')
            console.log(error);
            return false;
        }
    }
})

export {handler as GET, handler as POST};
