import { connectToDB } from "@utils/database";
import Post from '@models/post';

export const POST = async (req, res) => {
    const {userId, msg, tag} = await req.json();
    try {
        await connectToDB();

        const newPrompt = new Post({
            creator: userId,
            msg: msg,
            tag: tag
        });

        try {
            await newPrompt.save();
        } catch (error) {
            console.log('error saving post');
            console.log(error);
        }
        
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        });

    } catch (error) {
        console.log(error);
        return new Response('failed to create post', {
            status: 301
        })
    }
}