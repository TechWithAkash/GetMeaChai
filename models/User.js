// Create a user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        
    },
    coverpic:{
        type: String,
    },
    razorpayid:{
        type:String,
       
       },
       razorpaysecret:{
        type:String,
       },
    createdat:{
        type: Date,
        default: Date.now
    },
    updatedat:{
        type: Date,
        default: Date.now
    }

});



// module.exports = User;
export default mongoose.models.User || mongoose.model('User', userSchema);
