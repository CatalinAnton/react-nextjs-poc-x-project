import { connectToDB } from "@utils/database";
import Post from '@models/post';

export const GET = async (request, allStuff) => {

    let query = request.nextUrl.searchParams.get('q')
    console.log('query is');
    console.log(query)

    try {
        
        await connectToDB();
        let posts = null;

        if (query) {
            posts = await Post.find({tag: query}).populate('creator');
        } else {
            posts = await Post.find().populate('creator');
        }

        return new Response(JSON.stringify(posts), {
            status: 200
        });
    } catch (error) {
        console.log('error getting posts');
        console.log(error);
        return new Response('getting error here', {
            status: 400
        });
    }

}