import { connectToDB } from "@utils/database";
import Post from '@models/post';

export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        const posts = await Post.find({creator: params.id}).populate('creator');

        console.log('posts received');
        console.log(typeof posts)

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