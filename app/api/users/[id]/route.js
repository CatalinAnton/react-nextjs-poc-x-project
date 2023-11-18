import { connectToDB } from "@utils/database";
import User from '@models/user';

export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        console.log('params id is ')
        console.log(params.id);
        const user = await User.findById(params.id);

        console.log('user received');
        console.log(JSON.stringify(user))

        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch (error) {
        console.log('error getting user');
        console.log(error);
        return new Response('error', {
            status: 400
        });
    }

}