import mongoose from 'mongoose'

export async function dbConnect () {
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log("Connected to mongoDb")
    } catch(error) {
        console.log(error);
        process.exit(1)
    }
}