import { connectToDB } from "@utils/database";
import Post from '@models/post';

// GET (read)

export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        const post = await Post.findById(params.id).populate('creator');

        if (!post) {
            return new Response('post not found', {
                status: 404
            });
        }
        console.log('post received');
        console.log(post)

        return new Response(JSON.stringify(post), {
            status: 200
        });
    } catch (error) {
        console.log('error getting post by id');
        console.log(error);
        return new Response('error', {
            status: 400
        });
    }

}
//PATCH (update)

export const PATCH = async (request, {params}) => {
    const {msg, tag} = await request.json();

    try {
        await connectToDB();

        const post = await Post.findById(params.id);

        if (!post) {
            return new Response('post not found', {
                status: 404
            });
        }
        post.msg = msg;
        post.tag = tag;

        await post.save();

        return new Response(JSON.stringify(post), {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return new Response('failed to update post', {
            status: 404
        });
    }
}

//DELETE (delete)

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        await Post.findByIdAndRemove(params.id);

        return new Response(JSON.stringify(post), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response('failed to delete post', {
            status: 500
        });
    }
}