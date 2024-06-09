const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min:3,
        max:20,
    },
    name: {
        type: String,
        required: true,
        min:3,
        max:20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min:7,
        max:50,
    },
    password: {
        type: String,
        required: true,
        min:8,
    },
    isAvatar: {
        type: Boolean,
        default: false,
    },
    avatarImg:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&s",
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;