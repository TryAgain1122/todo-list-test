import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }, 
})
const UserModel = mongoose.model("User", userSchame);
export default UserModel