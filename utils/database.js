import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongodb is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'shoppie',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('connection to mongodb succeeded! ########');

        isConnected = true;
    } catch (error) {
        console.log('error database.js');
        console.log(error);
    }
}