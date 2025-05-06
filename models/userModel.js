const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 12,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

// hashing password before saving it into database
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
});
// compare password for login user
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;