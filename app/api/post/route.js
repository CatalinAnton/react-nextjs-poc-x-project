import { connectToDB } from "@utils/database";
import Post from '@models/post';

export const GET = async (request) => {

    try {
        await connectToDB();

        const posts = await Post.find({}).populate('creator');

        return new Response(JSON.stringify(posts), {
            status: 200
        });
    } catch (error) {
        console.log('error getting posts');
        console.log(error);
        return new Response('error', {
            status: 400
        });
    }

}