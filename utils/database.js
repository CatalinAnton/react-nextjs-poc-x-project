import mongoose from "mongoose";

let isConnected = false;
// db url https://cloud.mongodb.com/v2/65469bffdfb9ac5e5ea1fc38#/metrics/replicaSet/65469c6bca517b6b7b096ffb/explorer/shoppie/users/find
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